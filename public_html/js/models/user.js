define([
	'backbone',
],
function(
    Backbone
){

    var signUser = function(url) {
        var signFunction = function(callbackDict) {
            $.ajax(url, {
		        type: "POST",
			    data: this.toJSON(),
			    success: function(response) {
				    return callbackDict.success(response); 
			    },
			    error: function(xhr, status, error) {
				    return callbackDict.error(xhr); 
			    }
	         });                
         }
         return signFunction.bind(this);
    };
    
	var UserModel = Backbone.Model.extend({
		defaults: {
			name: '',
			email: '',
			password: '',
			isSignedIn: false,
			score: 0
		},

		url: 'api/v1/auth/curruser',
		loginUrl: 'api/v1/auth/signin',
		signupUrl: 'api/v1/auth/signup',
        logoutUrl: 'api/v1/auth/logout',
        		
		logOut: function(callback) {
			var that = this;
			$.ajax(that.logoutUrl, {
				type: "GET",
				complete: function() {
				    callback();
				}
			});		    
		},
		
		initialize: function() {
		    this.logIn = signUser.call(this, this.loginUrl);
		    this.signUp = signUser.call(this, this.signupUrl);
		}
	});

    return UserModel;
});
