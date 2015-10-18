define([
    'backbone',
    'tmpl/auth',
    'models/user',
    'validation_dicts/auth',
    'utils/custom_ajax_parser',
    'utils/create_user',
    'jqueryValidation'
], function(
    Backbone,
    auth,
    User,
    validationInfo,
    Parser,
    getUserInfo
){
    var errorMessageElement = '.b-main-signup-form__error-message';
    var inputClassPrefix = '.b-main-signup-form__input_type_';
    var formClass = '.b-form__type_signup';
    
    var AuthView = Backbone.View.extend({

        template: auth,

        render: function () {
            this.$el.html(this.template());
        },

        events: {
            "click .b-main-signup-form__submit-login-button": "submitAuth",
            "click a": "hide"
        },


        show: function () {
            this.render();            
        },

        hide: function () {
            this.$el.empty();
        },
     
        submitAuth: function(event) {
            event.preventDefault();
            var that = this;
            $(formClass).validate(validationInfo);
            if ($(formClass).valid()) {               
                $(errorMessageElement).empty();
                var newUser = new User(getUserInfo(inputClassPrefix));
                var parser = new Parser(errorMessageElement);
                newUser.signUp({
                    error: function(model, response) {
                        parser.parseServerResponse(response); 
                    },
                    success: function(model, response) {
                        if (parser.parseServerResponse(response)) { 
                            that.hide();
                            Backbone.history.navigate('main', true);
                        }
                    } 
                });
            }
        }
    });

    return new AuthView({el: $('.b-inner-main-window')});
});
