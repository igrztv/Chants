define(function (require) {

    var Backbone = require('backbone'),
        gameView = require('views/game'),
        loginView = require('views/login'),
        mainView = require('views/main'),
        scoreboardView = require('views/scoreboard'),
        authView = require('views/auth'),
        selectroomView = require('views/selectroom'),
        headerView = require('views/header'),
        ViewManager =require('views/viewmanager');

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

        initialize: function () {
            new ViewManager({
                pages: [gameView, loginView, mainView, scoreboardView, authView, selectroomView],
                header: headerView
            });
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
