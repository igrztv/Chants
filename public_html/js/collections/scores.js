define([
    'backbone',
    'models/score'
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
		{name:'Albert', score: 1010}
	];

    var ScoresCollection = Backbone.Collection.extend({
        model: ScoreModel,

        comparator : function(playerA, playerB) {
			if (playerA.get('score') > playerB.get('score')) return -1; // before
			return 1;
		}

    });
    
    return new ScoresCollection(players);
});
