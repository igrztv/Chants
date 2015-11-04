define([
    'backbone',
    'tmpl/header',
    'modules/eventBase'
], function(
    Backbone,
    header,
    eventBase
){

    var HeaderView = Backbone.View.extend({
        template: header,
        el: '.header',
        backButton: '.title__backbutton',
        pageTitle: '.title__page-title',

        initialize: function () {
            console.log('initialize HeaderView');
            this.$el.append(this.template());

            this.$backBtn = this.$(this.backButton);

            eventBase.on('header:update', this.update, this);
        },

        //rewrite to render()
        update: function (event) {
            this.toggle(event.state);
            this.changePageTitle(event.title);
            this.toggleBackButton(event.back);
        },

        toggleBackButton: function (state) {
            this.$backBtn.toggle(state);
        },

        changePageTitle: function (title) {
            this.$(this.pageTitle).text(title);
        },

        toggle: function (state) {
            this.$el.toggle(state);
        },

    });

    var headerView = new HeaderView({});

    return headerView;
});