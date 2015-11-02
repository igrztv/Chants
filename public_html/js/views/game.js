define([
    'backbone',
    'tmpl/game',
    'utils/microphone',
    'views/base',
    'models/room',
<<<<<<< HEAD
    'models/user'
=======
    'models/game'
>>>>>>> 25c6ec7d7efa8ec6552815acf434c851a4c9fbc4
], function(
    Backbone,
    game,
    mic,
    BaseView,
    Room,
<<<<<<< HEAD
    user
=======
    Game
>>>>>>> 25c6ec7d7efa8ec6552815acf434c851a4c9fbc4
){
    var winnerNameEl = '.b-game-page__winner__winner-name';
    var winnerBlock = '.b-game-page__winner';
    var gameplayBlock = '.b-game-page__gameplay';
    
    var GameView = BaseView.extend({
        template: game,
        model: user,

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
                    BaseView.prototype.show.call(that);
                    that.model.set({room_id: that.room.get('id')});    
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
             BaseView.prototype.hide.call(this);
        },
                
        leaveGame: function() {
            Backbone.history.navigate('main', true);
        },
        
        rec: function() {
            
        },

        pause: function() {
<<<<<<< HEAD

=======
        },
        
        initialize: function(options) {
            BaseView.prototype.initialize.call(this, options);
            this.model.on('gamefinished', this.showWinner);
            this.model.on('gamesuspended', this.leaveGame);
>>>>>>> 25c6ec7d7efa8ec6552815acf434c851a4c9fbc4
        }
    });

    return new GameView({
        mainElement: '.b-game-page',
        model: new Game()
    });
});
