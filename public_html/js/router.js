define(function (require) {

    var Backbone = require('backbone'),
        gameView = require('views/game'),
        loginView = require('views/login'),
        mainView = require('views/main'),
        scoreboardView = require('views/scoreboard'),
        authView = require('views/auth'),
        selectroomView = require('views/selectroom'),
        headerView = require('views/header'),
        ViewManager = require('views/viewmanager');

    var Router = Backbone.Router.extend({

        routes: {
            'scoreboard': scoreboardView.show,
            'game': gameView.show,
            'login': loginView.show,
            'auth' : authView.show,
            'signout' : authView.show,
            'gameRoom' : selectroomView.show,
            '*default': mainView.show
        },

        initialize: function () {
            new ViewManager({
                pages: [gameView, loginView, mainView, scoreboardView, authView, selectroomView],
                header: headerView
            });
        }
    });

    return new Router();
});
