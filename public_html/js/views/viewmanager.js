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
    	views: {
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

        hideViews: function(obj) {

        	var that = this;
        	var pageIndex = -1;
            this.viewsArr.forEach(function(val, index, arr) {
                if (obj.cid != val.cid) {
                    val.hide();
                }else{
                	pageIndex = index;
					headerView.changePageTitle(that.namesArr[index]);
                }
            });

			if(obj.mainElement != '.b-main-page'){
				headerView.showBackButton();
			}else{
				headerView.hideBackButton();
			}

			if(this.namesArr[pageIndex] != 'Leader board'){
				headerView.show();
			}else{
				headerView.hide();
			}

        },
        
        render: function(viewName) {
            this.pages[viewName].render();  
        },
        
        initialize: function(pages) {

            this.viewsArr = Object.keys(pages.views).map(function (key) {
                return pages.views[key];
            });
            this.namesArr = Object.keys(pages.names).map(function (key) {
                return pages.names[key];
            });

            this.pages = pages.views;

            var that = this;
            this.viewsArr.forEach(function(val, index, arr) {
                 that.listenTo(val, 'show', that.hideViews);
                 that.listenTo(val, 'render', that.render);
            });
        }
    });

    return new ViewManager(pages);
});
