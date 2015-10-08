define([
    'backbone',
    'models/score'
], function(
    Backbone,
    PlayerModel
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

    var PlayerCollection = Backbone.Collection.extend({
        model: PlayerModel,

        comparator : function(player) {
			return player.get('score');
		}

    });
    
    return new PlayerCollection(players);
});
