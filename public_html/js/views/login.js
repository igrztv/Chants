define([
    'backbone',
    'views/base',
    'tmpl/login',
    'models/user',
    'validation_dicts/signin',
    'utils/custom_ajax_parser',
    'utils/create_user',
    'jqueryValidation'
], function(
    Backbone,
    Base,
    login,
    User,
    validationInfo,
    Parser,
    getUserInfo
){
    var errorMessageElement = '.b-main-login-form__error-message';
    var inputClassPrefix = '.b-main-login-form__input_type_';
    var formClass = '.b-form__type_login';  

    var LoginView = Base.extend({

        template: login,
        
        events: {
            "click .b-main-login-form__submit-login-button": "submitLogin"
            //"click a": "hide"
        },
        
        submitLogin: function(event) {
            event.preventDefault();
            $(formClass).validate(validationInfo);
            if ($(formClass).valid()) {
                $(errorMessageElement).empty();
                var newUser = new User(getUserInfo());
                var parser = new Parser(errorMessageElement);
                var that = this;
                newUser.logIn({
                    error: function(response) {
                        parser.parseServerResponse(response); 
                    },
                    success: function(response) {
                        if (parser.parseServerResponse(response)) { 
                            that.hide();
                            Backbone.history.navigate('main', true);
                        }
                    } 
                });
            }
        }

    });

    return new LoginView({el: $('.b-login')});
});
