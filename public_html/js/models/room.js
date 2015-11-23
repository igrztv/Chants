define(
['backbone',
 'models/user'],
function(
    Backbone,
    User
){
    var currUser = User;
    var timer;
    
    var RoomModel = Backbone.Model.extend({		
		inviteUrl: 'api/v1/auth/invite',
		gameStatusUrl: 'api/v1/auth/game_status',
		findRivalUrl: 'api/v1/auth/find_rival',
		
		getCurrRoom: function(callbackDict) {
		    this.fetch({url: this.gameStatusUrl,
				        success: function(response) {
				            this.set({room_id: response.get("room_id")});
                            return callbackDict.success(response);
				        }.bind(this),
				        error: function(xhr, status, error) {
					        return callbackDict.error(xhr); 
				        }
		    });		    
		},
				
		inviteUser: function(name, successFunction, errorFunction) {
		    this.fetch({url: this.inviteUrl,
		                data: {user: name},
				        success: function(response) {;
                            return successFunction(response);
				        },
				        error: function(xhr, status, error) {
					        return errorFunction(xhr); 
				        }
		    });		    
		},
		
		registerOnGame: function() {
		    this.save({}, {url: this.findRivalUrl});
		},
		
		getGameStatus: function() {
		    this.fetch({url: this.findRivalUrl,
		                data: {is_game: 1},
		                success: this.parseGameStart.bind(this)});	    
		},
		
		parseGameStart: function(response) {                        
            if (response.get("game_status") == 1) {
                this.trigger('gamestarted');
                timer = undefined;
            }
            else {
                this.initTimer();
            }
		},
		
		initTimer: function() {
		    timer = setTimeout(this.getGameStatus.bind(this), 2000);
		},
		
		startRoomWaiting: function(successFunction) {
		    if (!(timer)) {
		        this.initTimer();   
		    }		    	    
		},
		
		stopRoomWaiting: function() {
		    if (timer) {
		        clearTimeout(timer);
		        timer = undefined;
		    }
		}
		 
    });
    return RoomModel;
});