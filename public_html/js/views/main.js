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

        render: function () {
            $(this.mainElement).remove();
            var user = new User();
            var jqXHRUser = user.fetch();
            var that = this;
            jqXHRUser.always(function(data) {
                that.$el.append(that.template(user));
            });
            
        }
        
    });

    return new MainView({
        mainElement: '.b-main-page'
        });
});
