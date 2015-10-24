define(['backbone'],
function(
    Backbone
){
  
    var ScoreModel = Backbone.Model.extend({
		defaults: {
			name: 'Harry',
			score: 0
		},
    });

    return ScoreModel;
});