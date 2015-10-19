define([
    'backbone',
    'views/game',
    'views/login',
    'views/main',
    'views/scoreboard',
    'views/auth',
    'views/viewmanager'
], function(
    Backbone,
    GameView,
    LoginView,
    MainView,
    ScoreboardView,
    AuthView,
    ViewManager
){
    
    /*var views = {
        main: MainView,
        scoreboard: ScoreboardView,
        game: GameView,
        login: LoginView,
        auth: AuthView
        };*/
    var views = [MainView, ScoreboardView, GameView, LoginView, AuthView];
                 
    var viewManager = new ViewManager(views);
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'auth' : 'authAction',
            '*default': 'defaultActions'
        },

        defaultActions: function () {
            MainView.show();
        },
        scoreboardAction: function () {     
            ScoreboardView.show();
        },
        gameAction: function () {   
            GameView.show();
        },
            
        loginAction: function () {            
            LoginView.show();
        },
        
        authAction: function() {
            AuthView.show();
        }
    });

    return new Router();
});
