define([
    'backbone',
    'models/microphone'
], function(
    Backbone,
    MicrophoneModel
){
 
    var MicrophoneView = Backbone.View.extend({
      
        //template: main,
        model: MicrophoneModel,

        initialize: function () {},

        render: function () {
            var user = {user : false};
            this.$el.html(this.template(user));
        },

        events: {
            "click a": "hide"
        },

        show: function () {
            this.render();            
        },

        hide: function () {
            this.$el.empty();
        }


    });

    return new MainView({el: $('.b-inner-main-window')});
});
