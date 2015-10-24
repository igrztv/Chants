define([
    'backbone',
    'tmpl/main',
    'views/base'
], function(
    Backbone,
    main,
    BaseView
){
 
    var MainView = BaseView.extend({
      
        template: main,

        render: function () {
            var user = {user : false};
            this.$el.append(this.template(user));
        }
        
    });

    return new MainView({
        mainElement: '.b-main-page'
        });
});
