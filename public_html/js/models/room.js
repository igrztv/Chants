define(
['backbone',
 'models/user'],
function(
    Backbone,
    User
){
    var currUser = new User();
    
    var RoomModel = Backbone.Model.extend({
        /*initialize: function() {
            var that = this;
            currUser.fetch({
                success: function(currUserResponse) {
                    that.set({currentUser: currUser.id});
                },
            });
        },*/
        
		//defaults: {
		//	currentUser: undefined,
		//	rivalUser: undefined
		//},
		
		inviteUrl: '/api/v1/auth/invite/',
		gameStatusUrl: '/api/v1/auth/game_status/',
		findRivalUrl: '/api/v1/auth/find_rival/',
		
		inviteUser: function(name, successFunction, errorFunction) {
			var that = this;
			$.ajax(that.inviteUrl, {
				type: "POST",
				data: {name: name},
				success: function(response) {
                    return successFunction(response)
				},
				error: function(xhr, status, error) {
					return errorFunction(xhr); 
				}
			});
		},
		
		registerOnGame: function() {
		    $.ajax(this.findRivalUrl, 
		           {type: "POST"});    
		},
		
		getGameStatus: function(successFunction, errorFunction) {
		    var that = this;
		    return function() {
			    $.ajax(that.gameStatusUrl, {
				    type: "GET",
				    success: function(response) {
                        return successFunction(response)
				    },
				    error: function(xhr, status, error) {
					    return errorFunction(xhr);
				    }
			    });
			};		    
		},
		
		startRivalWaiting: function(callback, timeInterval) {
		    this.timer = setInterval(callback.bind(this), timeInerval);
		},
		
		stopRivalWaiting: function() {
		    if (this.timer) {
		        clearTimer(this.timer);
		    }
		}
		
		
		//post user name. if ok true, if false show info
		//test if / 
    });

    return RoomModel;
});
