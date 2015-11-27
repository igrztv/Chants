define([
	'backbone'
], function(
	Backbone
){

	window.WebSocket = window.WebSocket || window.MozWebSocket;

	var connection = false;

	var wsWatcher = Backbone.View.extend({

		initialize: function(options) {
			if(!connection){
				connection = new WebSocket('ws://'+location.hostname+':'+location.port+'/api/v1/auth/gameplay');
			}
			connection.addEventListener('open', this.socketOpened);
			connection.addEventListener('message', this.socketMessage.bind(this));
			connection.addEventListener('error', this.socketError);
		},

		socketOpened: function () {
			console.log('socketOpened');
		},

		socketMessage: function (message) {
			//var content = JSON.parse(message.data);
			var content = $.parseJSON(message.data);

			//проверять принадлежат ли данные данной модели. 
			for (var key in content) {
				this.model.set(content);
				//console.log(this.model.attributes);
			}
			//console.dir(this.model);
		},

		socketError: function () {
			console.log('socketError');
		},

		sendSample: function (data) {
			connection.send(JSON.stringify(data));
		},


	});

	return wsWatcher;
});

//function
//send 
//on

//транспо