define([
    'backbone',
], function(
    Backbone
){

    var ViewManager = Backbone.View.extend({
        hideViews: function(obj) {
            this.viewsArr.forEach(function(val, index, arr) {
                if (obj.cid != val.cid) {
                    val.hide();
                }
            });
        },
        
        render: function(viewName) {
            this.views[viewName].render();  
        },
        
        initialize: function(views) {
            this.viewsArr = Object.keys(views).map(function (key) {
                return views[key];
            });
            this.views = views;
            var that = this;
            this.viewsArr.forEach(function(val, index, arr) {
                 that.listenTo(val, 'show', that.hideViews);
                 that.listenTo(val, 'render', that.render);
            });
        }
    });

    return ViewManager;
});
