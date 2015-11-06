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

        //переписать название на initialize с вызовом initialize родителя
        init: function () {
        	this.listenTo(this.model, 'change:isSignedIn', this.render);
        },

        render: function () {
            $(this.mainElement).remove();
            var that = this;
            var jqXHRUser = this.model.fetch({
                success: function() {
                    that.$el.append(that.template({user: true}));
                },
                error: function(){
                    that.$el.append(that.template({user: false}));
                }
            });
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
