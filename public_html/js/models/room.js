define(
['backbone',
 'models/user'],
function(
    Backbone,
    User
){
    var currUser = new User();
    
    var RoomModel = Backbone.Model.extend({
        initialize: function() {
            currUser.fetch({
                success: function(currUserResponse) {
                    this.set({currentUser: currUser.id});
                },
            });
        },
        
		defaults: {
			currentUser: -1,
			rivalUser: -1
		},
		
		url: '/test/'
    });

    return RoomModel;
});
