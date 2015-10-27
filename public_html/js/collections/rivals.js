define([
    'backbone',
    'models/rival'
], function(
    Backbone,
    RivalModel
){

    var PossibleRivalsCollection = Backbone.Collection.extend({
        model: RivalModel,
        url: 'test/url'
    });
    
    return new PossibleRivalsCollection();
     
});
