define([
    'backbone',
    'models/rival'
], function(
    Backbone,
    RivalModel
){

    var PossibleRivalsCollection = Backbone.Collection.extend({
        model: RivalModel,
        defaults: {
            id: -1,
            name: 'Anon'
        },
        url: 'api/v1/auth/get_users',
        initialize: function() {
            setInterval(function(){
                 var that = this;
                 $.ajax({
                     url: that.url,
                     method: 'GET',
                     success: function(data) {
                         console.log(data);
                         var rivals = JSON.parse(data);
                         console.log(rivals.users);
                         that.reset(rivals.users);
                     }
                 });
            }.bind(this), 10000);
        }
    });
    
    return new PossibleRivalsCollection();
     
});
