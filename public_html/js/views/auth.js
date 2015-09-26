define([
    'backbone',
    'tmpl/auth',
    'models/user',
    'utils/validation'
], function(
    Backbone,
    tmpl,
    User,
    Validator
){
    var errorMessageElement = '.b-main-signup-form__error-message';
    var inputClassPrefix = '.b-main-signup-form__input_type_';
  
    var checkPasswordsEquality = function(objForValidation) {
        if (objForValidation.password == objForValidation['repeated-password']) {
            delete objForValidation['repeated-password'];
            return objForValidation;
        }
        return {
            errorMessage: 'Пароли не совпадают',
            firstIncorrectInput: this.inputClassPrefix + 'password'
            };
    }


    var validator = new Validator(['name', 'email', 'password', 'repeated-password'],
                                  inputClassPrefix, errorMessageElement, checkPasswordsEquality);

    var AuthView = Backbone.View.extend({

        template: authTmpl(),

        render: function () {
            this.$el.html(this.template);
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
            var validatedData = validator.validateAuthForm();
            if (validatedData.isValid) {
                $(errorMessageElement).empty();
                var newUser = new User(validatedData);
                newUser.save({}, {
                    error: function(model, response) {
                        if (response) {
                            try {
                                responseObj = $.parseJSON(response.responseText);
                                validator.showErrorMessage(responseObj.errorMessage, responseObj.firstIncorrectInput); 
                            } catch (err) {
                                validator.showErrorMessage(response.responseText);  
                            }
                        }
                    },

                    success: function(model, response) {
                        this.hide();
                        Backbone.history.navigate('main', true);
                    } 
                });
                /*$.ajax({
                    url: '/api/v1/auth/signin',
                    success: function(data) {
                        this.hide();
                        Backbone.history.navigate('main', true);
                    }
                });*/
            }
            else {
                validator.showErrorMessage(validatedData.errorMessage, validatedData.firstIncorrectInput);
            }
        }

    });

    return new AuthView({el: $('.b-inner-main-window')});
});
