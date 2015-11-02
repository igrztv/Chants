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
    var winnerNameEl = '.b-game-page__winner__winner-name';
    var winnerBlock = '.b-game-page__winner';
    var gameplayBlock = '.b-game-page__gameplay';
    
    var GameView = BaseView.extend({
        template: game,
        //model: user,

        start: function(){
            mic.requireMicrophone();
        },

        requestAnimFrame: function(callback) {
            return window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.oRequestAnimationFrame
                || window.msRequestAnimationFrame
                || function(callback) {
                    window.setTimeout(callback, 1000 / 60)
                };
        },

        events: {
            'click .b-game-page__start-button': 'pushButton'
        },
        
        pushButton: function() {
            this.model.pushButton();
        },
        
        update: function() {
            //rafID = requestAnimationFrame(this.update.bind(this));
            if(mic.updatePitch() != false){
                console.log('listening');
            }
            //animate(bubbles, forces, bubblesCanvas);

            //do something
            var that = this;
            this.requestAnimFrame(function() {
                that.update();
            });
        },

        show: function() {
            this.room = new Room();
            var that = this;
            this.room.getCurrRoom({
                success: function(success) {
                    console.log('this.room.getCurrRoom success');
                    BaseView.prototype.show.call(that);
                    console.log(that.room.get('id'));
                    console.log("room_id");
                    that.model.set({room_id: that.room.get('room_id')});
                    that.model.startGameResWaiting();  
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
        },
        
        rec: function() {
            
        },

        pause: function() {

        },
        
        initialize: function(options) {
            BaseView.prototype.initialize.call(this, options);
            this.model.on('gamefinished', this.showWinner);
            this.model.on('gamesuspended', this.leaveGame);
        }
    });

    return new GameView({
        mainElement: '.b-game-page',
        model: new Game()
    });
});
