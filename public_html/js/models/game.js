define(
['backbone'],
function(
    Backbone
){
    var timer;
    
    var GameModel = Backbone.Model.extend({		
		url: 'api/v1/auth/game',
		socketURL: 'api/v1/auth/game/socket',
		connection: false,

		socket: function () {

			this.connection = new WebSocket('ws://127.0.0.1:8080/'+this.socketURL);

			this.connection.onopen = function () {
				// first we want users to enter their names
				console.log('opened');
			};

			this.connection.onerror = function (error) {
				// just in there were some problems with conenction...
				console.log('error socket');
			};

			// most important part - incoming messages
			this.connection.onmessage = function (message) {
				console.log(message.data);
			};
		},

		sendSample: function (data) {
			//send sample via web socket
			console.log('send sample');
			//connection.send(data);
		},
		
		pushButton: function() {
		    this.fetch({data: {push: true}});		   
		},
		
        parseGameStatus: function(result) {
		    var responseObj = result;//JSON.parse(result);
            if (responseObj.is_game_progress == false) {
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
			this.fetch({data: {is_game_progress: true},
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
		},	
		
		sync: function(method, model, options) {
			options || (options = {});

			switch (method) {
			    case 'read': {
                   options.data.room_id = this.get("room_id");
			       Backbone.sync.call(this, method, model, options);       
			    }; break;
				default:{
					Backbone.sync.call(this, method, model, options);
				}
			}
		},	
    });
    return GameModel;
});
