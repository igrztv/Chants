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
            timer = setTimeout(this.fetch.bind(this), 1000);
        },
        
        stopRivalsTimer: function() {
            clearTimeout(timer);
            timer = undefined;
        },
       
        initialize: function() {
            if (!(timer)) {
                this.setRivalsTimer();
            }
        },
        
        sync: function(method, model, options) {
              options || (options = {});
              switch (method) {
                  case 'read':
                  $.ajax({
                     url: this.url,
                     method: 'GET',
                     success: this.onSuccessfullyGetRivals.bind(this)
                  }); 
                  break;
                  
                  default:
                  Backbone.sync.call(this, method, model, options);
                  break;
             }
        },
        
        onSuccessfullyGetRivals: function(data) {
            var rivals = JSON.parse(data);
            this.reset(rivals.users);
            this.setRivalsTimer(); 
        },
    });
    
    return new PossibleRivalsCollection();
     
});
