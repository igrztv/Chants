define([
    'backbone',
    'views/game',
    'views/login',
    'views/main',
    'views/scoreboard',
    'views/auth',
], function(
    Backbone,
    GameView,
    LoginView,
    MainView,
    ScoreboardView,
    AuthView
){
    
    var Views = {
        main: MainView,
        scoreboard: ScoreboardView,
        game: GameView,
        login: LoginView,
        auth: AuthView
        };
                 
    
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'auth' : 'authAction',
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
        },
        
        authAction: function() {
            Views.auth.render();
        }
    });

    return new Router();
});
