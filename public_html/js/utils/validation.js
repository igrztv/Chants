define(['backbone'],
function(
    Backbone
){
    var Validator = function(controls, inputClassPrefix, errorMessageElement, customValidateFunction) {
        this.controls = controls;
        this.inputClassPrefix = inputClassPrefix;
        this.customValidateFunction = customValidateFunction;
        this.errorMessageElement = errorMessageElement;
    }
  
    Validator.prototype.validateAuthForm = function() {
        var validatedUser = {
            isValid: true
            };
        for (var controlIndex in this.controls) {
            var control = this.controls[controlIndex];
            var inputElement = $(this.inputClassPrefix + control);
            var controlValue = inputElement.val();
            if (!(controlValue)) {
                return {
                    isValid: false,
                    errorMessage: 'All fields are required',
                    firstIncorrectInput: this.inputClassPrefix + control
                    };
            }
            else if (inputElement.get()[0].validity && !(inputElement.get()[0].validity.valid)) {
                return {
                    isValid: false,
                    errorMessage: 'Please enter valid ' + control,
                    firstIncorrectInput: this.inputClassPrefix + control
                    };
            }
            else {
                validatedUser[control] = controlValue;
            }
        }

        if (this.customValidateFunction) {
            return this.customValidateFunction(validatedUser);
        }
        else {
            return validatedUser;
        }
        
    }

    Validator.prototype.showErrorMessage = function(errorMessage, errorInput) {
        $(this.errorMessageElement).html(errorMessage);
        if (errorInput) {
            $(errorInput).focus();
        }
    }

    Validator.prototype.parseServerResponse = function(result) {
        if (result) {
            try {
                responseObj = $.parseJSON(result);
                this.showErrorMessage(responseObj.login); 
            } catch (err) {
                if (result.responseText) {
                    result = result.responseText;
                }
                this.showErrorMessage(result);  
            }
        }
    }

    return Validator;       
});
