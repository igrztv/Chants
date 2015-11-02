define([
    'backbone',
    'tmpl/game',
    'utils/microphone',
    'views/base',
    'models/room',
    'models/user'
], function(
    Backbone,
    game,
    mic,
    BaseView,
    Room,
    user
){
    var GameView = BaseView.extend({
        template: game,
        model: user,

        events: {
            "click .start": "start"
        }, 

        start: function(){
            mic.record(true);
        },

        requestAnimFrame: function(callback) {
            console.log('requestAnimFrame:');
            console.log(callback);
            var ret =  window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.oRequestAnimationFrame
                || window.msRequestAnimationFrame
                || function(callback) {
                    window.setTimeout(callback, 1000 / 60)
                };
            console.log(ret);
            return ret;
        },

        update: function() {
            console.log('updatePitch()');
            mic.updatePitch();
            var that = this;
            this.requestAnimFrame(function(){
                that.update().bind(that);
            });
        },

        show: function() {
            var room = new Room();
            var that = this;
            var res = room.getCurrRoom({
                success: function(success) {
                    BaseView.prototype.show.call(that);
                    console.log('mic.requireMicrophone()');
                    mic.requireMicrophone();
                    that.update();
                },
                error: function(error) {
                    Backbone.history.navigate('main', true);
                }
            });

        },
        
        rec: function() {
            this.update();
        },

        pause: function() {

        }
    });

    return new GameView({
        mainElement: '.b-game-page'
    });
});
