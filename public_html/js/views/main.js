define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    main
){
 
    var MainView = Backbone.View.extend({
      
        template: main(),
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
