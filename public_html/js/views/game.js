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

	var winnerNameEl = '.b-game-page__winner__winner-name';
	var winnerBlock = '.b-game-page__winner';
	var gameplayBlock = '.b-game-page__gameplay';
	var toggleButtonClass = '.audio__toggle-recording';
	var trackCanvas = '.audio__wave-canvas';
	
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var channels = 1;
	var frameCount = 1024;//audioCtx.sampleRate * 2.0;
	var myArrayBuffer = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);
	//var source = audioCtx.createBufferSource(); // creates a sound source

	var GameView = BaseView.extend({
		template: game,
		recording : false,
		toggleButton : false,
		herzIndicator : false,
		socket: false,

		events: {
			"click .audio__toggle-recording": "toggleRecording",
			'click .b-game-page__start-button': 'pushButton'
		},

		initialize: function(options) {
			BaseView.prototype.initialize.call(this, options);
			this.model.on('gamefinished', this.showWinner);
			this.model.on('gamesuspended', this.leaveGame);
			this.model.on('change:sample', this.sampleUpdate);
		},

		sampleUpdate: function () {
			var buffer = this.get("sample");
			//console.log(buffer);
			//console.log(myArrayBuffer.getChannelData(0));
			var nowBuffering = myArrayBuffer.getChannelData(0);
			for (var i = 0; i < frameCount; i++) {
				nowBuffering[i] = buffer[i];
			}
			//myArrayBuffer.getChannelData(0).set(buffer);
			var source = audioCtx.createBufferSource();
			source.buffer = myArrayBuffer;
			source.connect(audioCtx.destination);
			source.start();

		},

		update: function() {

			this.trackCanvas.width = window.innerWidth - 5;
			this.trackCanvas.height = window.innerHeight - 50;
			
			var res = mic.updatePitch();
			if(res.noteStrings){
				this.herzIndicator.text(res.noteStrings);
				var maxLength = phisics.track(res.pitch, res.meanPower);
				if(maxLength > window.innerWidth / 2){
					phisics.bullet(res.pitch, res.meanPower);
				}
			}

			var data = mic.getSample();
			this.socket.sendSample({status: 'audio', sample: data});

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
				//console.log(data);
				//this.socket.sendSample({status: 'audio', sample: data});	
			}
		},

		setTimer: function() {
			setTimeout(this.update.bind(this), 1000 / 60);		  
		},

		show: function() {
			this.toggleButton = $('.audio__toggle-recording');
			this.herzIndicator = $('.audio__herz-indicator');
			this.trackCanvas = document.getElementById('track');
			var room = new Room();
			var that = this;
			room.getCurrRoom({
				success: function(success) {
					//console.log('this.room.getCurrRoom success');
					BaseView.prototype.show.call(that);
					//console.log(room.get('id'));
					//console.log("room_id");
					that.model.set({room_id: room.get('room_id')});
					that.model.startGameResWaiting();  
					mic.requireMicrophone();
					that.socket = new Socket({
						model: that.model
					});
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
