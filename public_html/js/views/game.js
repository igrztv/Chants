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
            var room = new Room();
            var that = this;
            var res = room.getCurrRoom({
                success: function(success) {
                    BaseView.prototype.show.call(that);
                },
                error: function(error) {
                    Backbone.history.navigate('main', true);
                }
            });

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
