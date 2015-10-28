define([
    'backbone',
], function(
    Backbone
){

    var Base = Backbone.View.extend({
        el: '.b-inner-main-window',
        
        initialize: function(options) {
            if  (options.mainElement) {
                this.mainElement = options.mainElement;
            }
            this.render();
            //this.hide();
        },
        
        render: function () {
            $(this.mainElement).remove();
            this.$el.append(this.template());
        },

        show: function () {
            this.trigger('show', this);
            $(this.mainElement).show();           
        },

        hide: function () {
            $(this.mainElement).hide();
        },
        
    });    

    return Base;
});
