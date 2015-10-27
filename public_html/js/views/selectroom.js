define([
    'backbone',
    'tmpl/selectroom',
    'collections/rivals',
    'models/room',
    'views/base',
], function(
    Backbone,
    selectroom, 
    Rivals,
    Room,
    BaseView
){
    var SelectRoomView = BaseView.extend({

        template: selectroom,

        render: function () {
            var rivals  = this.collection.toJSON();
            console.log(rivals);
            this.$el.append(this.template(rivals));
        },
        
        events: {
            'click .b-rivals-list__select-rival-btn': 'selectRival'
        },
        
        selectRival: function(event) {
            event.preventDefault();
            var rivalUserId = $(e.currentTarget).data("id");
            var rivalUser = this.collection.get(id);
            var rivalUserDBId = item.get("id");
            var room = new Room({rivalUser: rivalUserDBId});
            room.save();
            Backbone.history.navigate('gameRoom', true);
        }
        
    });
     
    var selectRoomView = new SelectRoomView({
        collection: Rivals,
        mainElement: '.b-selectroom-page'
    });
    //console.log(selectRoomView);
    return selectRoomView;
});
