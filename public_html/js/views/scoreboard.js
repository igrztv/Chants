define([
    'backbone',
    'views/base',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    Base,
    scoreboard,
    playerCollection
){

    var ScoreBoardView = Base.extend({
        template: scoreboard,

        render: function () {
            this.collection.add({
                name: 'Новый игрок',
                score : Math.floor(Math.random() * (5000))
            });
            var players  = this.collection.toJSON();
            this.$el.html(this.template(players));
        },

    });
     
    var scoreBoardView = new ScoreBoardView({
        collection: playerCollection,
        el: $('.b-scoreboard'),
    });

    return scoreBoardView;
});
