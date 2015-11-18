define([
    'backbone',
    'tmpl/game',
    'utils/microphone',
    'utils/phisics',
    'views/base',
    'models/room',
    'models/game'
], function(
    Backbone,
    game,
    mic,
    phisics,
    BaseView,
    Room,
    Game
    //Socket,
){

    var timer;

    var winnerNameEl = '.b-game-page__winner__winner-name';
    var winnerBlock = '.b-game-page__winner';
    var gameplayBlock = '.b-game-page__gameplay';
    var toggleButtonClass = '.audio__toggle-recording';
    var trackCanvas = '.audio__wave-canvas';
    //var socket = new Socket();
    
    var GameView = BaseView.extend({
        template: game,
        recording : false,
        toggleButton : false,
        herzIndicator : false,

        events: {
            "click .audio__toggle-recording": "toggleRecording",
            'click .b-game-page__start-button': 'pushButton'
        },

		initialize: function(options) {
			BaseView.prototype.initialize.call(this, options);
			this.model.on('gamefinished', this.showWinner);
			this.model.on('gamesuspended', this.leaveGame);
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

			var sample = mic.getSample();
			//socket.sendBinary(sample);
			debugger;
			//this.model.socket().sendSample();

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
					console.log('this.room.getCurrRoom success');
					BaseView.prototype.show.call(that);
					console.log(room.get('id'));
					console.log("room_id");
					that.model.set({room_id: room.get('room_id')});
					that.model.startGameResWaiting();  
					mic.requireMicrophone();
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
