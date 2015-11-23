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
				connection = new WebSocket('ws://localhost:8080/api/v1/auth/gameplay');
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
			// console.log('socketRecieved:');
			// console.log(content);
			for (var key in content) {
				this.model.set(content);
			}
			//console.dir(this.model);
		},

		socketError: function () {
			console.log('socketError');
		},

		sendSample: function (data) {			
			// console.log('sendSample:');
			// console.log(toSend);
			connection.send(JSON.stringify(data));
		},


	});

	return wsWatcher;
});