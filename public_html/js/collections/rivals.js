define([
    'backbone',
    'models/rival'
], function(
    Backbone,
    RivalModel
){

    var PossibleRivalsCollection = Backbone.Collection.extend({
        model: RivalModel,
        url: '/api/v1/auth/get_users',
        initialize: function() {
            setInterval(function(){
                 this.fetch();
            }.bind(this), 10000);
        }
    });
    
    return new PossibleRivalsCollection();
     
});
