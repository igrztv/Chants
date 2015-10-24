define([
    'backbone',
    'views/game',
    'views/login',
    'views/main',
    'views/scoreboard',
    'views/auth',
    'views/conductor'
], function(
    Backbone,
    gameView,
    loginView,
    mainView,
    scoreboardView,
    authView,
    ViewManager
){

    var views = [mainView, scoreboardView, gameView, loginView, authView];
                 
    var viewManager = new ViewManager(views);
    
    var Router = Backbone.Router.extend({

        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'auth' : 'authAction',
            'signout' : 'signoutAction',
            '*default': 'defaultActions'
        },

        defaultActions: function () {
            mainView.render();
        },

        scoreboardAction: function () {
            scoreboardView.render();
        },

        gameAction: function () {
            gameView.render();
        },
            
        loginAction: function () {
            loginView.render();
        },
        
        authAction: function() {
            authView.render();
        },

        signoutAction: function() {
            authView.render();
        }
    });

    return new Router();
});
