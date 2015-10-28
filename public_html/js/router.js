define([
    'backbone',
    'views/game',
    'views/login',
    'views/main',
    'views/scoreboard',
    'views/auth',
    'views/selectroom',
    'views/viewmanager'
], function(
    Backbone,
    gameView,
    loginView,
    mainView,
    scoreboardView,
    authView,
    selectroomView,
    ViewManager
){
    console.log(selectroomView);
    var views = {'main': mainView, 
                 'scoreboard': scoreboardView, 
                 'game': gameView, 
                 'login': loginView, 
                 'auth': authView, 
                 'selectroom': selectroomView};
                 
    var viewManager = new ViewManager(views);
    
    var Router = Backbone.Router.extend({

        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'auth' : 'authAction',
            'signout' : 'signoutAction',
            'gameRoom' : 'gameRoomAction',
            '*default': 'defaultActions'
        },

        defaultActions: function () {
            mainView.show();
        },

        scoreboardAction: function () {
            scoreboardView.show();
        },

        gameAction: function () {
            gameView.show();
        },
        
        gameRoomAction: function () {
            selectroomView.show();
        },  
                  
        loginAction: function () {
            loginView.show();
        },
        
        authAction: function() {
            authView.show();
        },

        signoutAction: function() {
            authView.show();
        }
    });

    return new Router();
});
