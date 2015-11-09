define([
	'backbone',
	'models/rival'
], function(
	Backbone,
	RivalModel
){

	var timer;
	var PossibleRivalsCollection = Backbone.Collection.extend({
		model: RivalModel,

		defaults: {
			id: -1,
			name: 'Anon'
		},

		url: 'api/v1/auth/get_users',

		setRivalsTimer: function() {
			timer = setTimeout(this.fetch.bind(this), 2000);
		},

		stopRivalsTimer: function() {
			clearTimeout(timer);
			timer = undefined;
		},

		initialize: function() {
			console.log('PossibleRivalsCollection:');
			console.log(this.length);
			if (!(timer)) {
				this.setRivalsTimer();
			}
		},

		sync: function(method, model, options) {
			options || (options = {});

			switch (method) {
				case 'read':{
					$.ajax({
						url: this.url,
						method: 'GET',
						success: this.onSuccessfullyGetRivals.bind(this),
						error: this.setRivalsTimer.bind(this)
					});
				}; break;

				default:{
					Backbone.sync.call(this, method, model, options);
				}
			}
		},
		onSuccessfullyGetRivals: function(rivals) {
			this.reset(rivals);
			this.setRivalsTimer(); 
		},
	});

	return new PossibleRivalsCollection();

});
