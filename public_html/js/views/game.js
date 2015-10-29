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
            var that = this;
            var res = room.getCurrRoom({
                success: function(success) {
                    console.log(success);
                    BaseView.prototype.show.call(that);
                },
                error: function(error) {
                    console.log(error);
                    Backbone.history.navigate('main', true);
                }
                /*complete: function(result) {
                    console.log(result);
                    if (result.game_status) {
                        BaseView.prototype.show.call(this);  
                    }
                    else {
                        Backbone.history.navigate('main', true);
                    }
                }*/
            });

        },
        
        rec: function() {
        },

        pause: function() {
        }
        //game_status {name}
        // 
    });

    return new GameView({
        mainElement: '.b-game-page'
    });
});
