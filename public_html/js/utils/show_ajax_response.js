define(
function() {

    var Parser = function(errorMessageElement) {
        this.errorMessageElement = errorMessageElement;
    }
 
    Parser.prototype.showErrorMessage = function(errorMessage, errorInput) {
        $(this.errorMessageElement).text(errorMessage);
        $(this.errorMessageElement).show();
        if (errorInput) {
            $(errorInput).focus();
        }
    }

    return Parser;       
});
