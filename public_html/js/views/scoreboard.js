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
        mainTemplate: scoreboard(),

        initialize: function () {
            //this.collection.bind("change reset add remove", this.render, this);
            $.ajax({url: "utils/players-score.html",
                    context: this,
                    success: function(response) {
                        this.playerTemplate = response;
                        this.renderPlayerTemplate();
                        }
                    });
        },

        render: function () {
            this.$el.html(this.mainTemplate);
            if (this.playerTemplate) {
                this.renderPlayerTemplate(); 
            }
        },

        renderPlayerTemplate: function() {
            var players  = this.collection.toJSON();
            var playersHtml = _.template(this.playerTemplate, {players: players});
            $('.b-players__inner-list').html(playersHtml); 
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
        //playerListClass: '.b-players__inner-list',
    });

    return scoreBoardView;
});
