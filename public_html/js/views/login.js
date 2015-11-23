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
            "click .b-main-login-form__submit-login-button": "submitLogin",
        },

        headerText: 'Login',

        submitLogin: function(event) {

            //console.log('submitLogin: id(' + this.model.get("current_user_id") + ')');

            event.preventDefault();
            $(formClass).validate(validationInfo);
            if ($(formClass).valid()) {
                $(errorMessageElement).empty();
                this.model.set(getUserInfo(inputClassPrefix));
                var showResponse = new ShowResponse(errorMessageElement);
                this.model.logIn({
                    error: function(model, response) { 
                        showResponse.showErrorMessage(response); 
                    },
                    success: function(response) {
                        Backbone.history.navigate('main', true);
                    } 
                });
            }
        }
    });

    return new LoginView({
        mainElement: '.b-login-page',
        model: User
    });
});