define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'views/base'
], function(
    Backbone,
    scoreboard,
    ScoresCollection,
    BaseView
){

    var ScoreBoardView = BaseView.extend({
        template: scoreboard,

        render: function () {
            this.collection.add({
                name: 'Новый игрок',
                score : Math.floor(Math.random() * (5000))
            });
            var players  = this.collection.toJSON();
            this.$el.append(this.template(players));
        }

    });
     
    var scoreBoardView = new ScoreBoardView({
        collection: ScoresCollection,
        mainElement: '.b-scoreboard-page'
    });

    return scoreBoardView;
});
