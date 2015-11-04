define([
    'backbone',
    'views/base',
    'tmpl/login',
    'models/user',
    'validation_dicts/signin',
    'utils/show_ajax_response',
    'utils/create_user',
    'jqueryValidation'
], function(
    Backbone,
    Base,
    login,
    User,
    validationInfo,
    ShowResponse,
    getUserInfo
){
    var errorMessageElement = '.b-main-login-form__error-message';
    var inputClassPrefix = '.b-main-login-form__input_type_';
    var formClass = '.b-form__type_login';

    var LoginView = Base.extend({

        template: login,

        events: {
            "click .b-main-login-form__submit-login-button": "submitLogin"
        },

        submitLogin: function(event) {
            event.preventDefault();
            $(formClass).validate(validationInfo);
            if ($(formClass).valid()) {
                $(errorMessageElement).empty();
                var newUser = new User(getUserInfo(inputClassPrefix));
                var showResponse = new ShowResponse(errorMessageElement);
                var that = this;
                newUser.logIn({
                    error: function(response) { 
                        showResponse.parseServerResponse(response); 
                    },
                    success: function(response) {
                        if (showResponse.parseServerResponse(response)) { 
                            that.trigger('render', 'main');
                            Backbone.history.navigate('main', true);
                        }
                        else {
                            console.log("false");
                        }
                    } 
                });
            }
        }
    });

    return new LoginView({
        mainElement: '.b-login-page'
        });
});
