define([
    'backbone',
], function(
    Backbone
){

    var Base = Backbone.View.extend({
        initialize: function() {
            this.render();
            this.hide();
        },
        
        render: function () {
            this.$el.html(this.template());
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();           
        },

        hide: function () {
            this.$el.hide();
        },
        
    });    

    return Base;
});
