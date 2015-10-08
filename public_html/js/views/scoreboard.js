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

        mainTemplate: scoreboard,

        initialize: function () {},

        render: function () {
            var players = this.collection.toJSON();
            this.collection.add({
                name: 'Новый игрок',
                score : Math.floor(Math.random() * (5000))
            });
            this.$el.html(this.mainTemplate(players));
        },

        events: {
            'click a': 'hide'
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
