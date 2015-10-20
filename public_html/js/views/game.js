define([
    'backbone',
    'tmpl/game',
    'models/microphone'
], function(
    Backbone,
    game,
    MicrophoneModel
){
    var GameView = Backbone.View.extend({

        template: game(),
        model: MicrophoneModel,

        render: function () {
            this.$el.html(this.template);
        },
         
        events: {
            'click a': 'hide',
            'click .start': 'start'
        },

        start: function(){
            this.model.openMic();
        },

        show: function () {
            this.render();            
        },

        hide: function () {
            this.$el.empty();
        }

    });

    return new GameView({
        el: $('.b-inner-main-window'),
    });;
});
