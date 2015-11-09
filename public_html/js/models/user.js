define([
	'backbone',
],
function(
    Backbone
){

    var signUser = function(url) {
        var signFunction = function(callbackDict) {
        	var that = this;
        	console.log('signFunction');
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
			current_user_id: 0,
			isSignedIn: false,
			score: 0
		},

		current_user_id: 0,

		url: 'api/v1/auth/curruser',
		loginUrl: 'api/v1/auth/signin',
		signupUrl: 'api/v1/auth/signup',
        logoutUrl: 'api/v1/auth/logout',

        initialize: function() {
		    this.logIn = signUser.call(this, this.loginUrl);
		    this.signUp = signUser.call(this, this.signupUrl);
		},
        		
		logOut: function(callback) {
			var that = this;
			$.ajax(that.logoutUrl, {
				type: "GET",
				complete: function() {
					that.set({isSignedIn : false});
				    callback();
				}
			});		    
		},
		
	});

    return new UserModel();
});
