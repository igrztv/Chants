define(['backbone'],
function(
    Backbone
){
  
    var UserModel = Backbone.Model.extend({
		defaults: {
			name: 'Anonymous',
			score: 0
		},
    });

    return UserModel;
});
