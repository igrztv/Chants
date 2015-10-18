define(
function() {

    var Parser = function(errorMessageElement) {
        this.errorMessageElement = errorMessageElement;
    }
 
    Parser.prototype.showErrorMessage = function(errorMessage, errorInput) {
        $(this.errorMessageElement).html(errorMessage);
        if (errorInput) {
            $(errorInput).focus();
        }
    }

    Parser.prototype.parseServerResponse = function(result) {
        if (result) {
            try {
                responseObj = $.parseJSON(result);
                if (responseObj.login_status === false) {
                    this.showErrorMessage("error occured");
                    return false
                }
                return true;
            } catch (err) {
                if (result.responseText) {
                    result = result.responseText;
                }
                this.showErrorMessage(result);
                return false;  
            }
        }
    }

    return Parser;       
});
