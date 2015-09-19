define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var LoginView = Backbone.View.extend({

        template: loginTmpl(),

        render: function () {
            this.$el.html(this.template);
        },

        events: {
            "click .b-main-form__submit-login-button": "submitLogin",
            "click a": "hide"
        },


        show: function () {
            this.render();            
        },

        hide: function () {
            this.$el.empty();
        },
     
        submitLogin: function(event) {
            event.preventDefault();
            $.ajax({
                url: '/api/v1/auth/signin',
                success: function(data) {
                    this.hide();
                    Backbone.history.navigate('main', true);
                }
            });
        }

    });

    return new LoginView({el: $('.b-inner-main-window')});
});
