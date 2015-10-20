define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    scoreboard,
    ScoresCollection
){

    var ScoreBoardView = Backbone.View.extend({
        template: scoreboard,

        render: function () {
            //tmp checking add() function with comparator
            this.collection.add({
                name: 'Новый игрок',
                score : Math.floor(Math.random() * (5000))
            });
            var players  = this.collection.toJSON();
            this.$el.html(this.template(players));
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
        collection: ScoresCollection,
        el: $('.b-inner-main-window'),
    });

    return scoreBoardView;
});
