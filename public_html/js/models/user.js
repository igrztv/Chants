define([
	'backbone',
],
function(
    Backbone
){
  
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
        
		logIn: function(callbackDict) {
			var that = this;
			$.ajax(that.loginUrl, {
				type: "POST",
				data: that.toJSON(),
				success: function(response) {
					return callbackDict.success(response); 
				},
				error: function(xhr, status, error) {
					return callbackDict.error(xhr); 
				}
			});
		},

		signUp: function(callbackDict) {
			var that = this;
			$.ajax(that.signupUrl, {
				type: "POST",
				data: that.toJSON(),
				success: function(response) {
					return callbackDict.success(response); 
				},
				error: function(xhr, status, error) {
					return callbackDict.error(xhr); 
				}
			});
		},
		
		logOut: function(callback) {
			var that = this;
			$.ajax(that.logoutUrl, {
				type: "GET",
				complete: function() {
				    callback();
				}
			});		    
		}
	});

    return UserModel;
});
