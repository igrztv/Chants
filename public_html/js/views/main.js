define([
    'backbone',
    'tmpl/main',
    'views/base',
    'models/user'
], function(
    Backbone,
    main,
    BaseView,
    User
){
 
    var MainView = BaseView.extend({

        template: main,
        viewName: 'main',

        headerText: 'Main menu',
        hideBackBtn: true,

        events: {
            "click .b-main-form__link_type_signout": "submitLogOUT",
        },

		initialize: function (options) {        	
            this.listenTo(this.model, 'change:isSignedIn', this.render);
			BaseView.prototype.initialize.call(this, options); 
		},

        render: function () {
            $(this.mainElement).remove();
            var that = this;
			var jqXHRUser = this.model.fetch({
				success: function() {
					//этим должна заниматься модель
					that.model.set({isSignedIn: true});
				},
				error: function(){
				}
			});
			this.$el.append(this.template({user: this.model.get("isSignedIn")}));
        },

        submitLogOUT: function() {
            this.model.logOut(function() {
                Backbone.history.navigate('main', true);
            });
        }

    });

    return new MainView({
        mainElement: '.b-main-page',
        model: User
    });
});
