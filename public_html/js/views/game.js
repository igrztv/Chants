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
        recording : false,
        printing : 0,

        events: {
            "click .start": "start"
        }, 

        update: function() {
            var res = mic.updatePitch(Math.random() * 100);
            if(this.printing++ > 100){
                this.printing = 0;
                console.log(res);
            }
            this.updateFrame(this.update);
        },

        start: function(){
            mic.record(!this.recording);
            this.update();
            console.log('start_done');
        },

        updateFrame: function(callback) {
            var that = this;
            console.log();
            setTimeout(alert('timer'), 1000);
            //return window.requestAnimationFrame || window.webkitRequestAnimationFrame(that.update);
            /*return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback){
                setTimeout(callback, 1000/60);
                console.log('requestAnimFrame');
            };*/
        },

        show: function() {
            var room = new Room();
            var that = this;
            var res = room.getCurrRoom({
                success: function(success) {
                    BaseView.prototype.show.call(that);
                    console.log('mic.requireMicrophone()');
                    mic.requireMicrophone();
                    //that.update();
                },
                error: function(error) {
                    Backbone.history.navigate('main', true);
                }
            });

        },
        
        /*rec: function() {
            this.update();
        },*/

        pause: function() {

        }
    });

    return new GameView({
        mainElement: '.b-game-page'
    });
});
