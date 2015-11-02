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
				data: {push: true}
			});			   
		},
		
        parseGameStatus: function(result) {
		    var responseObj = result;//JSON.parse(result);
            if (responseObj.is_game_progress == "false") {
                if (responseObj.winers) {
                    this.trigger('gamefinished', responseObj.winers[0]);
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
		    console.log("game status");
		    console.log(this.get("room_id"));
		    $.ajax(this.url, {
		        type: "GET",
				data: {is_game_progress: true},
				success: this.parseGameStatus.bind(this)
			});			    
        },
        
		initTimer: function() {
		    timer = setTimeout(this.getGameStatus.bind(this), 1000);
		},
		
		startGameResWaiting: function() {
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
