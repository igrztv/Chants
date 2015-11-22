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

        headerText: 'Champions',
        
        initialize : function(options) {
            this.collection.bind('reset', this.render, this);
            BaseView.prototype.initialize.call(this, options);
        },
        
        render: function () {
            //this.collection.add({
            //    name: 'Новый игрок',
            //    score : Math.floor(Math.random() * (5000))
            //});
            var players  = this.collection.toJSON();
            var isVisible = $(this.mainElement).is(':visible');        
            this.$el.append(this.template(players));
            if (isVisible) {
                $(this.mainElement).show();
            }
        }

    });
     
    var scoreBoardView = new ScoreBoardView({
        collection: ScoresCollection,
        mainElement: '.b-scoreboard-page'
    });

    return scoreBoardView;
});
