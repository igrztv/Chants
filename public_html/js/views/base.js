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
        },

        render: function () {
            $(this.mainElement).remove();
            this.$el.append(this.template());
        },

        show: function () {
            this.trigger('show', this);

            this._updateHeader();
            $(this.mainElement).show();
        },

        _updateHeader: function () {},

        hide: function () {
            $(this.mainElement).hide();
        },

    });

    return Base;
});
