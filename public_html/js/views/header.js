define([
    'backbone',
    'tmpl/header'
], function(
    Backbone,
    header
){

    var HeaderView = Backbone.View.extend({
        template: header,
        el: '.header',
        backButton: '.title__backbutton',
        mainElement: '.b-header',
        pageTitle: '.b-page-title',

        initialize: function () {
            console.log('initialize HeaderView');
            this.$el.append(this.template());

            this.$backBtn = this.$(this.backButton);

            // TODO: eventBase implement
            // eventBase.on('header:update', this.update, this);
        },

        showBackButton: function () {
            this.$backBtn.show();
        },

        hideBackButton: function () {
            this.$backBtn.hide();
        },

        changePageTitle: function (title) {
            this.$(this.pageTitle).text(title);
        },

        show: function () {
            this.$(this.mainElement).show();
        },

        hide: function () {
            console.log('HIDE');
            this.$(this.mainElement).hide();
        },

    });

    var headerView = new HeaderView({});

    return headerView;
});