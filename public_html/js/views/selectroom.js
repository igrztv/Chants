define([
    'backbone',
    'tmpl/selectroom',
    'collections/rivals',
    'models/room',
    'views/base',
    'utils/show_ajax_response'
], function(
    Backbone,
    selectroom, 
    rivals,
    Room,
    BaseView,
    ShowResponse
){
    var errorMessageElement = '.b-rivals-list__error-message';

    var SelectRoomView = BaseView.extend({

        headerText: 'Choose opponent',

        initialize: function(options) {
            BaseView.prototype.initialize.call(this, options);
            this.collection.on('reset', this.onCollectionReset, this);
            this.model.on('gamestarted', this.enterGame);
        },
        
        onCollectionReset: function() {
             var isVisible = $(this.mainElement).is(':visible');
             this.render();  
             if (isVisible) {
                 this.show();
             } 
        },
        
        template: selectroom,
        
        render: function () {
            $(this.mainElement).remove();
            var rivalList  = this.collection.toJSON();
            console.log(this.collection.length);
            this.$el.append(this.template(rivalList));
        },
        
        events: {
            'click .b-rivals-list__select-rival-btn': 'selectRival'
        },
         
        show: function() {
            BaseView.prototype.show.call(this);
            this.model.registerOnGame();
            var that = this;
            this.model.startRoomWaiting();
        },
        
        hide: function() {
            this.model.stopRoomWaiting();
            BaseView.prototype.hide.call(this);
        },
        
        selectRival: function(event) {
            event.preventDefault();
            var rivalUserName = $(event.currentTarget).data("id");
            var that = this;
            var showResponse = new ShowResponse(errorMessageElement);
            this.model.inviteUser(rivalUserName,
                            function(response) {
                                if (showResponse.parseServerResponse(response)) { 
                                    that.enterGame();  
                                }
                            },
                            function(response) { 
                                showResponse.parseServerResponse(response); 
                            }
            );
        },
        
        enterGame: function() {
             //this.model.stopRoomWaiting();
             console.log('navigate to game');
             Backbone.history.navigate('game', true);
         } 
        
    });
     
    var selectRoomView = new SelectRoomView({
        collection: rivals,
        model: new Room(),
        mainElement: '.b-selectroom-page'
    });

    return selectRoomView;
});
