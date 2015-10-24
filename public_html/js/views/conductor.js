define([
    'backbone'
], function(
    Backbone
){   
    
    var ViewManager = Backbone.View.extend({
        initialize: function(views){
            console.log(views);
            /*views.forEach(function(item, i, arr) {
                views.listenTo(views, 'show', this.hideViews);
            });*/
            this.views = views;
            var that = this;
            console.log(that);
            /*views.forEach(function(item, index, arr) {
                 that.listenTo(item, 'show', that.hideViews);
            });*/
        },
        hideViews: function(){
            views.forEach(function(item, i, arr) {
                alert(item + 'hidden');
            });
        }
    });

    return ViewManager;
});