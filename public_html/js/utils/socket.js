define(function() {

	// if user is running mozilla then use it's built-in WebSocket
	// window.WebSocket = window.WebSocket || window.MozWebSocket;

	// // open connection
	// var connection;

	// function createSocket() {
	// 	connection = new WebSocket('ws://127.0.0.1:8080/api/v1/auth/game/socket');
	// };

	// connection.onopen = function () {
	// 	// first we want users to enter their names
	// 	console.log('opened');
	// };

	// connection.onerror = function (error) {
	// 	// just in there were some problems with conenction...
	// 	console.log('error socket');
	// };

	// // most important part - incoming messages
	// connection.onmessage = function (message) {
	// 	console.log(message.data);
	// };

	// function sendSample(data)
	// {
	// 	//send sample via web socket
	// 	connection.send(data);
	// }

	// return {
	// 	createSocket: createSocket,
	// };

});