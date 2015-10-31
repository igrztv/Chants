define([
    'backbone',
    'models/rival'
], function(
    Backbone,
    RivalModel
){

    var timer;
    var PossibleRivalsCollection = Backbone.Collection.extend({
        model: RivalModel,
        
        defaults: {
            id: -1,
            name: 'Anon'
        },
        
        url: 'api/v1/auth/get_users',
        
        setRivalsTimer: function() {
            timer = setTimeout(this.getRivals.bind(this), 1000);
        },
        
        getRivals: function() {
            $.ajax({
                 url: this.url,
                 method: 'GET',
                 success: this.onSuccessfullyGetRivals.bind(this)
            });            
        },
        
        onSuccessfullyGetRivals: function(data) {
            var rivals = JSON.parse(data);
            this.reset(rivals.users);
            this.setRivalsTimer(); 
        },
        
        stopRivalsTimer: function() {
            clearTimeout(timer);
            timer = undefined;
        },
       
        initialize: function() {
            if (!(timer)) {
                this.setRivalsTimer();
            }
        }
    });
    
    return new PossibleRivalsCollection();
     
});
