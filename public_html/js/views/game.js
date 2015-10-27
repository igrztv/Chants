define([
    'backbone',
    'tmpl/game',
    'utils/microphone',
    'views/base',
    'models/room'
], function(
    Backbone,
    game,
    mic,
    BaseView,
    Room
){
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

        update: function() {
            rafID = requestAnimationFrame(this.update.bind(this));
            mic.updatePitch();
        },

        show: function() {
            var room = new Room();
            if (room.fetch()) {
                BaseView.prototype.show.call(this);    
            }
            else {
                Backbone.history.navigate('game', true);    
            }   
        },
        
        rec: function() {
        },

        pause: function() {
        }
    });

    return new GameView({
        mainElement: '.b-game-page'
    });
});
