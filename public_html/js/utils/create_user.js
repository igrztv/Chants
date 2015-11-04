define(
function() {
    var getUserInfo = function(inputClassPrefix) {
        result = {};
        ['name', 'email', 'password'].forEach(function(key, index, arr) {
            value = $(inputClassPrefix + key).val();
            if (value) {
                result[key] = value;
            }
        });
        return result;
    }
    return getUserInfo;
});
