define([
    'backbone',
    'views/game',
    'views/login',
    'views/main',
    'views/scoreboard',
    'views/auth',
    'views/selectroom',
    'views/header'
], function(
    Backbone,
    gameView,
    loginView,
    mainView,
    scoreboardView,
    authView,
    selectroomView,
    headerView
){

    var pages = {
    	names : {
    		'main': 'Main menu',
    		'scoreboard': 'Leader board',
			'game': 'CHANT!',
			'login': 'Login',
			'auth': 'Sign up',
			'selectroom': 'Choose the opponent',
    	},
    	views:{
			'main': mainView,
			'scoreboard': scoreboardView,
			'game': gameView,
			'login': loginView,
			'auth': authView,
			'selectroom': selectroomView
		}
    };

    var ViewManager = Backbone.View.extend({

    	viewsArr: false,
    	namesArr: false,

        initialize: function(views) {
            this.pages = views.pages;
            this.header = views.header;

            _.each(this.pages, function (page) {
                 this.listenTo(page, 'show', this.hidePage);
             }.bind(this));
        },

        hidePage: function(currentPage) {

            _.each(this.pages, function (page) {
                if (page !== currentPage) {
                    page.hide();
                }
            });

        }
    });

    return ViewManager;
});
