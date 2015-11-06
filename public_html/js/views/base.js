define([
    'backbone',
    'modules/eventBase'
], function(
    Backbone,
    eventBase
){

    var Base = Backbone.View.extend({
        el: '.b-inner-main-window',

        initialize: function(options) {
            if (options.mainElement) {
                this.mainElement = options.mainElement;
            }
            //For pretty router
            this.show = this.show.bind(this);
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

        _updateHeader: function () {
            eventBase.trigger('header:update', {
                state: !!this.headerText,
                title: this.headerText,
                back: !this.hideBackBtn
            })
        },

        hide: function () {
            $(this.mainElement).hide();
        },

    });

    return Base;
});
