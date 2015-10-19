define([
    'backbone',
], function(
    Backbone
){

    var ViewManager = Backbone.View.extend({
        hideViews: function(obj) {
            this.views.forEach(function(val, index, arr) {
                if (obj.cid != val.cid) {
                    val.hide();
                }
            });
        },
        
        initialize: function(views) {
            this.views = views;
            var that = this;
            this.views.forEach(function(val, index, arr) {
                 that.listenTo(val, 'show', that.hideViews);
            });
        }
        
    });    

    return ViewManager;
});
