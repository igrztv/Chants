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
            var that = this;p
            currUser.fetch({
                success: function(currUserResponse) {
                    that.set({currentUser: currUser.id});
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
