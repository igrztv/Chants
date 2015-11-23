define([
    'backbone',
    'models/rival'
], function(
    Backbone,
    ScoreModel
){

	var players = [
		{name:'William', score: 1000},
		{name:'Jane', score: 340},
		{name:'Virginia', score: 4000},
		{name:'George', score: 560},
		{name:'Charlotte', score: 900},
		{name:'Emily', score: 3400},
		{name:'Immanuel', score: 2050},
		{name:'Friedrich', score: 2000},
		{name:'Jean-Paul', score: 4060},
		{name:'Albert', score: 1010},
		{}
	];

    var ScoresCollection = Backbone.Collection.extend({
        model: ScoreModel,
        url: '/url/doesnt/exsist/', //for tests only!
        comparator : function(playerA, playerB) {
			if (playerA.get('score') > playerB.get('score')) return -1; // before
			return 1;
		},
    
		sync: function(method, model, options) {
			options || (options = {});

			switch (method) {
				case 'read': {
				   var LOCALSTORAGE_KEY = 'scores';
				   var customSuccess = options.success;
				   
				   options.success = function(response) {
				       window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(response));
				       if (customSuccess) {
				           customSuccess(response);
				       }
				   };
				   var customError = options.error;
				   options.error = function(model, xhr, options) {
				       console.log("Got error");
				       var scores = window.localStorage[LOCALSTORAGE_KEY];
				       if (!scores) {
				            if (customError) {
				                return customError(model, xhr, options);
				            }
				            return;
				       }
				       var scoresObj = JSON.parse(scores);
				       
				       this.reset(scoresObj);
				   }.bind(this);
				   Backbone.sync.call(this, method, model, options);	   
				}; break;
				default:{
					Backbone.sync.call(this, method, model, options);
				}
			}
		},
    });
    /* FOR TEST ONLY */
    window.localStorage.setItem('scores', JSON.stringify(players));
    var collection = new ScoresCollection();
    collection.fetch();
    /* ---- */
    return collection;
});
