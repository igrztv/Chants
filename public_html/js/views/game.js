define([
    'backbone',
    'views/base',
    'tmpl/game'
], function(
    Backbone,
    Base,
    game
){
    var GameView = Base.extend({
        template: game
    });

    return new GameView({el: $('.b-game')});
});
