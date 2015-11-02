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

    var timer;

    var GameView = BaseView.extend({
        template: game,
        recording : false,
        printing : 0,
        toggleButton : false,

        events: {
            "click .audio__toggle-recording": "toggleRecording"
        }, 

        update: function() {
            var res = mic.updatePitch();
            this.setTimer();
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
            var room = new Room();
            var that = this;
            var res = room.getCurrRoom({
                success: function(success) {
                    BaseView.prototype.show.call(that);
                    mic.requireMicrophone();
                },
                error: function(error) {
                    Backbone.history.navigate('main', true);
                }
            });

        },

    });

    return new GameView({
        mainElement: '.b-game-page',
        toggleButtonClass: '.audio__toggle-recording',
    });
});
