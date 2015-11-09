define([
    'backbone',
    'tmpl/game',
    'utils/microphone',
    'views/base',
    'models/room',
    'models/game'
], function(
    Backbone,
    game,
    mic,
    BaseView,
    Room,
    Game
){

    var timer;

    var winnerNameEl = '.b-game-page__winner__winner-name';
    var winnerBlock = '.b-game-page__winner';
    var gameplayBlock = '.b-game-page__gameplay';
    var toggleButtonClass = '.audio__toggle-recording';
    
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
		    var res = mic.updatePitch();
		    if(res.noteStrings){
		        this.herzIndicator.text(res.noteStrings);
		    }
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
			console.log('game show()');
			this.toggleButton = $('.audio__toggle-recording');
			this.herzIndicator = $('.audio__herz-indicator');
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
