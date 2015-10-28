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
            
        events: {
            "click .b-main-form__link_type_signout": "submitLogOUT"
        }, 
        
        submitLogOUT: function() {
            var that = this;
            var navigateToMain = function() {
                that.trigger('render', 'main');
                Backbone.history.navigate('main', true);
            };
            this.model.logOut(navigateToMain);
        }      
            /*var that = this;
            jqXHRUser.always(function(data) {
                that.$el.append(that.template(user));
            });*/

        
    });

    return new MainView({
        mainElement: '.b-main-page',
        model: new User
        });
});
