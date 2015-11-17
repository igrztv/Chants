define([
	'backbone',
],
function(
    Backbone
){

    var signUser = function(url, successFunc) {
        var signFunction = function(options) {
             options.url = url;
             if (successFunc) {
                 var viewSuccess = options.success;
                 options.success = function(response) {
                      successFunc();
                      viewSuccess(response); 
                 }
             }
             this.save({}, options);             
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

		url: 'api/v1/auth/curruser',
		loginUrl: 'api/v1/auth/signin',
		signupUrl: 'api/v1/auth/signup',
        logoutUrl: 'api/v1/auth/logout',

        initialize: function() {
            var loginSuccess = function() {
                console.log(this);
                this.set({isSignedIn: true});
            };
		    this.logIn = signUser.call(this, this.loginUrl, loginSuccess.bind(this));
		    this.signUp = signUser.call(this, this.signupUrl);
		},
        		
		logOut: function(callback) {
		    var logoutCallback = function() {
		        this.set({isSignedIn : false});
		        this.set({id : this.get("current_user_id")});
		        callback();
		    };
		    this.destroy({
		        url: this.logoutUrl,
		        success: logoutCallback.bind(this) 
		    });	    
		},

		sync: function(method, model, options) {
			options || (options = {});

			switch (method) {
			    case 'create': {
			       $.ajax({
			           type: 'POST',
			           url: options.url || this.url,
			           data: options.data || this.toJSON(),
			           success: function(response) {
			               try {
			                   var responseObj = JSON.parse(response);
			               } catch (err) {
			                   var responseObj = response;
			               }
			               if (responseObj.login_status == false) {
			                   options.error(responseObj.error_massage);   
			               }
			               else {
			                   options.success(response);
			               }
			           },
			           error: function(xhr, status, error) {
			               options.error(error);
			           }
			       });
			    }; break;
			    case 'update': {
			        this.sync.call(this, 'create', model, options);  
			    }; break;
			    case 'delete': {
			       console.log('destroy');
			       options.type = 'GET';
			       Backbone.sync.call(this, method, model, options);       
			    }; break;
				default:{
					Backbone.sync.call(this, method, model, options);
				}
			}
		},		
	});

    return new UserModel();
});
