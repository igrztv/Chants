define([
    'backbone',
    'tmpl/selectroom',
    'collections/rivals',
    'models/room',
    'views/base',
    'utils/custom_ajax_parser'
], function(
    Backbone,
    selectroom, 
    rivals,
    Room,
    BaseView,
    Parser
){
    var errorMessageElement = '.b-rivals-list__error-message';
    var enterGame = function(room) {
         room.stopRivalWaiting();
         Backbone.history.navigate('game', true); 
    }
    var SelectRoomView = BaseView.extend({
        //ask if we were selected
        // game_status: 0 - not selected
        // game_status: 1 - selected
        // find_rival 
        //when show -> registr on post
        initialize: function(options) {
            BaseView.prototype.initialize.call(this, options);
            this.collection.on('reset', this.onCollectionReset, this);
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
            var rivals  = this.collection.toJSON();
            this.$el.append(this.template(rivals));
        },
        
        events: {
            'click .b-rivals-list__select-rival-btn': 'selectRival'
        },
         
        show: function() {
            BaseView.prototype.show.call(this);
            this.model.registerOnGame();
            var that = this;
            this.model.startRivalWaiting(this.model.getGameStatus(
                function(response) {
                    var responseObj = JSON.parse(response);
                    console.log(responseObj.game_status);
                    if (responseObj.game_status == 1) {
                        enterGame(that.model);
                    }          
                },
                function(errorResponse) { //for debug;
                    console.log('game status error'); 
                }
            ),
            1000);
        },
        
        hide: function() {
            this.model.stopRivalWaiting();
            BaseView.prototype.hide.call(this);
        },
        
        selectRival: function(event) {
            event.preventDefault();
            var rivalUserName = $(event.currentTarget).data("id");
            var that = this;
            var parser = new Parser(errorMessageElement);
            this.model.inviteUser(rivalUserName,
                            function(response) {
                                if (parser.parseServerResponse(response)) { 
                                    enterGame(that.model);  
                                }
                            },
                            function(response) { 
                                parser.parseServerResponse(response); 
                            }
            );
        }
        
    });
     
    var selectRoomView = new SelectRoomView({
        collection: rivals,
        model: new Room(),
        mainElement: '.b-selectroom-page'
    });
    //console.log(selectRoomView);
    return selectRoomView;
});
