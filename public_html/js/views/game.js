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

        start: function(){
            mic.requireMicrophone().done(function(){
                console.log('.done()');
                this.update();
                
            }.bind(this)).fail(function(){
                console.log('.fail()');
            }); 
        },

        events: {
            'click .b-game-page__start-button': 'pushButton'
        },
        
        pushButton: function() {
            this.model.pushButton();
        },
        
        update: function() {
            rafID = requestAnimationFrame(this.update.bind(this));
            mic.updatePitch();
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
                    BaseView.prototype.show.call(that);
                    //Backbone.history.navigate('main', true);
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
