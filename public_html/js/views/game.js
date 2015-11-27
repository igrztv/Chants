define([
	'backbone',
	'tmpl/game',
	'utils/microphone',
	'utils/phisics',
	'views/base',
	'models/room',
	'models/game',
	'utils/socket'
], function(
	Backbone,
	game,
	mic,
	phisics,
	BaseView,
	Room,
	Game,
	Socket
){

	var timer;

	var winnerNameEl = '.b-game-page__winner_winner-name';
	var winnerBlock = '.b-game-page__winner';
	var gameplayBlock = '.b-game-page__gameplay';
	var toggleButtonClass = '.audio__toggle-recording';
	var trackCanvas = '.audio__wave-canvas';

	var sources = [
		{name: 'boot', src: 'img/boot.png'},
		{name: 'ball', src: 'img/ball.png'},
		{name: 'cup', src: 'img/cup.png'},
		{name: 'horn', src: 'img/horn.png'}
	];

	var GameView = BaseView.extend({
		template: game,
		recording : false,
		playback : true,
		toggleButton : false,
		herzIndicator : false,
		socket: false,

		events: {
			'click .audio__toggle-recording': 'toggleRecording',
			'click .audio__toggle-playback': 'togglePlayback',
			'click .b-game-page__start-button': 'pushButton'
		},

		initialize: function(options) {
			BaseView.prototype.initialize.call(this, options);
			this.model.on('gamefinished', this.showWinner);
			this.model.on('gamesuspended', this.leaveGame);
			this.model.on('change:sample', this.sampleUpdate.bind(this));
		},

		sampleUpdate: function () {
			if(this.playback === true){
				var buffer = this.model.get("sample");
				mic.playSample(buffer);
			}
		},

		update: function() {

			this.trackCanvas.width = window.innerWidth - 5;
			this.trackCanvas.height = window.innerHeight - 50;
			
			var res = mic.updatePitch();
			if(res.noteStrings){
				this.herzIndicator.text(res.noteStrings);
				var maxLength = phisics.createTrack(res.pitch, res.meanPower);
				if(maxLength > window.innerWidth / 2){
					phisics.createBullet(res.pitch, res.meanPower);
				}
			}

			if(res < 0){
			}else{
				var data = mic.getSample();
				this.socket.sendSample({status: 'audio', sample: data});
			}

			phisics.animate(this.trackCanvas);

			this.setTimer();
		},

		pushButton: function() {
			this.model.pushButton();
		},

		toggleRecording: function(){
			this.recording = mic.record(!this.recording);
			if(this.recording){
				this.toggleButton.text("Stop");
				this.setTimer();
			}else{				
				this.toggleButton.text("Rec");
				var data = mic.getSample();
			}
		},

		togglePlayback: function () {
			this.playback = !this.playback;
		},

		setTimer: function() {
			setTimeout(this.update.bind(this), 1000 / 43);		  
		},

		show: function() {
			this.toggleButton = $('.audio__toggle-recording');
			this.herzIndicator = $('.audio__herz-indicator');
			this.trackCanvas = document.getElementById('track');
			var room = new Room();
			var that = this;
			room.getCurrRoom({
				success: function(success) {
					BaseView.prototype.show.call(that);
					that.model.set({room_id: room.get('room_id')});
					that.model.startGameResWaiting();  
					mic.requireMicrophone();
					that.socket = new Socket({
						model: that.model
					});
					phisics.initialize(sources);
				},
				error: function(error) {
					Backbone.history.navigate('main', true);
				}
			});
		},

		showWinner: function(winner) {
			$(winnerNameEl).text(winner);
			$(gameplayBlock).hide();
			$(winnerBlock).show();
			this.headerText = 'Game finished!'
			BaseView.prototype._updateHeader.call(this);
		},		

		hide: function() {
			$(gameplayBlock).show();
			$(winnerBlock).hide();
			this.model.stopGameResWaiting();
			BaseView.prototype.hide.call(this);
		},
				
		leaveGame: function() {
			Backbone.history.navigate('main', true);
		}
		
	});

	return new GameView({
		mainElement: '.b-game-page',
		model: new Game()
	});
});
