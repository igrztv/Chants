define(
['backbone',
 'models/user'],
function(
    Backbone,
    User
){
    var currUser = new User();
    var timer;
    
    var RoomModel = Backbone.Model.extend({		
		inviteUrl: 'api/v1/auth/invite',
		gameStatusUrl: 'api/v1/auth/game_status',
		findRivalUrl: 'api/v1/auth/find_rival',
		
		getCurrRoom: function(callbackDict) {
		    var that = this;
			$.ajax(this.gameStatusUrl, {
				type: "GET",
				success: function(response) {
				    console.log(response);
				    //var responseObj = JSON.parse(response);
				    //that.set({id: responseObj.room_id});
                    return callbackDict.success(response);
				},
				error: function(xhr, status, error) {
				    console.log(err);
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
		
		getGameStatus: function() {
		    $.ajax(this.findRivalUrl, {
		        type: "GET",
				data: {is_game: 1},
				success: this.parseGameStart.bind(this)
			});		    
		},
		
		parseGameStart: function(response) {                        
		    var responseObj = JSON.parse(response);
            if (responseObj.game_status == 1) {
                this.trigger('gamestarted');
                timer = undefined;
            }
            else {
                this.initTimer();
            }
		},
		
		initTimer: function() {
		    timer = setTimeout(this.getGameStatus.bind(this), 1000);
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
