define([
    'underscore',
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    _,
    Backbone,
    scoreboard,
    playerCollection
){

    var ScoreBoardView = Backbone.View.extend({
        template: scoreboard,

        render: function () {
            var players  = this.collection.toJSON();
            this.$el.html(this.template(players));
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
     
    var scoreBoardView = new ScoreBoardView({
        collection: playerCollection,
        el: $('.b-inner-main-window'),
    });

    return scoreBoardView;
});
