define([
    'backbone',
    'views/game',
    'views/login',
    'views/main',
    'views/scoreboard'
], function(
    Backbone,
    GameView,
    LoginView,
    MainView,
    ScoreboardView
){
    
    var Views = {main: MainView,
                 scoreboard: ScoreboardView,
                 game: GameView,
                 login: LoginView};
                 
    
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultActions'
        },

        defaultActions: function () {
         
            Views.main.render();
        },
        scoreboardAction: function () {
            
            Views.scoreboard.render();
        },
        gameAction: function () {
            
            Views.game.render();
        },
            
        loginAction: function () {
            
            Views.login.render();
        }
    });

    return new Router();
});
