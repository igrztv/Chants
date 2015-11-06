define([
    'backbone',
    'views/base',
    'tmpl/auth',
    'models/user',
    'validation_dicts/auth',
    'utils/show_ajax_response',
    'utils/create_user',
    'jqueryValidation'
], function(
    Backbone,
    Base,
    auth,
    User,
    validationInfo,
    ShowResponse,
    getUserInfo
){
    var errorMessageElement = '.b-main-signup-form__error-message';
    var inputClassPrefix = '.b-main-signup-form__input_type_';
    var formClass = '.b-form__type_signup';
    
    var AuthView = Base.extend({

        template: auth,

        events: {
            "click .b-main-signup-form__submit-login-button": "submitAuth"
        },

        headerText: 'Sign Up',
     
        submitAuth: function(event) {
            event.preventDefault();
            var that = this;
            $(formClass).validate(validationInfo);
            if ($(formClass).valid()) {               
                $(errorMessageElement).empty();
                //var newUser = new User(getUserInfo(inputClassPrefix));
                this.model.set(getUserInfo(inputClassPrefix));
                var showResponse = new ShowResponse(errorMessageElement);
                //newUser.signUp({
                this.model.signUp({
                    error: function(response) {
                        showResponse.parseServerResponse(response); 
                    },
                    success: function(response) {
                        if (showResponse.parseServerResponse(response)) {
                            Backbone.history.navigate('main', true);
                        }
                    } 
                });
            }
        }
    });

    return new AuthView({
        mainElement: '.b-signup-page',
        model: User
    });
});
