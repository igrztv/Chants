define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    game
){
    var GameView = Backbone.View.extend({


        template: gameTmpl(),

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

    return new GameView({el: $('.b-inner-main-window')});
});
