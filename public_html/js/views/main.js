define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){
 
    var MainView = Backbone.View.extend({
      
        template: mainTmpl(),
        initialize: function () {},
        render: function () {
            this.$el.html(this.template);
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
