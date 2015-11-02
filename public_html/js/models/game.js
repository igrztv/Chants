define(
['backbone'],
function(
    Backbone
){
    var timer;
    
    var GameModel = Backbone.Model.extend({		
		url: 'api/v1/auth/game',
		
		pushButton: function() {
		    var that = this;
		    $.ajax(that.url, {
		        type: "GET",
				data: {push: true,
				       room_id: this.get("room_id")}
			});			    
		},
		
        parseGameStatus: function(result) {
		    var responseObj = JSON.parse(response);
            if (responseObj.is_game_progress == false) {
                if (reponseObj.winner) {
                    this.trigger('gamefinished', reponseObj.winner);
                }
                else {
                    this.trigger('gamesuspended');
                }
                timer = undefined;
            }
            else {
                this.initTimer();
            }        
        },
        		
		getGameStatus: function() {
		    $.ajax(that.url, {
		        type: "GET",
				data: {is_game_progress: true,
						room_id: this.get("room_id")},
				success: this.parseGameStatus.bind(this)
			});			    
        },
        
		initTimer: function() {
			console.log('initTimer');
		    timer = setTimeout(this.getGameStatus.bind(this), 1000);
		},
		
		startGameResWaiting: function(successFunction) {
		    if (!(timer)) {
		        this.initTimer();   
		    }		    	    
		},
		
		stopGameResWaiting: function() {
		    if (timer) {
		        clearTimeout(timer);
		        timer = undefined;
		    }
		}		

    });
    return GameModel;
});
