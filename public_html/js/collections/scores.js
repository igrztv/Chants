define([
    'backbone',
    'models/score'
], function(
    Backbone,
    PlayerModel
){

    var players = [
                   new PlayerModel({name:'William', score: 1000}),
                   new PlayerModel({name:'Jane', score: 340}),
                   new PlayerModel({name:'Virginia', score: 4000}),
                   new PlayerModel({name:'George', score: 560}),
                   new PlayerModel({name:'Charlotte', score: 900}),
                   new PlayerModel({name:'Emily', score: 3400}),
                   new PlayerModel({name:'Immanuel', score: 2050}),
                   new PlayerModel({name:'Friedrich', score: 2000}),
                   new PlayerModel({name:'Jean-Paul', score: 4060}),
                   new PlayerModel({name:'Albert', score: 1010})
                  ];

    var PlayerCollection = Backbone.Collection.extend({
        model: PlayerModel,
        comparator: function (playerA, playerB) {
            var scoreDiff = playerB.get('score') - playerA.get('score');
            if (scoreDiff === 0) {
                 return playerA.get('name') < playerB.get('name') ? -1 : 1;
            }
            return scoreDiff;
        }
    });

    testPlayerCollection = new PlayerCollection(players);
    
    return testPlayerCollection;
});
