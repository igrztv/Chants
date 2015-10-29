define(
['backbone',
 'models/user'],
function(
    Backbone,
    User
){
    var currUser = new User();
    
    var RoomModel = Backbone.Model.extend({		
		inviteUrl: 'api/v1/auth/invite',
		gameStatusUrl: 'api/v1/auth/game_status',
		findRivalUrl: 'api/v1/auth/find_rival',
		
		getCurrRoom: function(callbackDict) {
			$.ajax(this.gameStatusUrl, {
				type: "GET",
				success: function(response) {
                    return callbackDict.success(response);
				},
				error: function(xhr, status, error) {
					return callbackDict.error(xhr); 
				}
			});
		},
				
		inviteUser: function(name, successFunction, errorFunction) {
			var that = this;
			var data = {user: name};
			$.ajax(that.inviteUrl, {
				type: "GET",
				data: data,
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
		
		getGameStatus: function(successFunction) {
		    var that = this;
		    return function() {
			    $.ajax(that.findRivalUrl, {
				    type: "GET",
				    data: {is_game: 1},
				    success: function(response) {
                        return successFunction(response)
				    }
			    });
			};		    
		},
		
		startRivalWaiting: function(callback, timeInterval) {
		    this.timer = setInterval(callback.bind(this), timeInterval);
		},
		
		stopRivalWaiting: function() {
		    if (this.timer) {
		        clearTimeout(this.timer);
		    }
		}
    });

    return RoomModel;
});
