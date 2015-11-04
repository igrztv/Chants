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
        pageTitle: '.b-page-title',

        initialize: function () {
            console.log('initialize HeaderView');
            this.$el.append(this.template());
        },

        showBackButton: function () {
            $(this.backButton).show();
        },

        hideBackButton: function () {
            $(this.backButton).hide();
        },

        changePageTitle: function (title) {
            $(this.pageTitle).text(title);
        },

        show: function () {
            $(this.mainElement).show();
        },

        hide: function () {
            console.log('HIDE');
            $(this.mainElement).hide();
        },

    });
     
    var headerView = new HeaderView({
        mainElement: '.b-header'
    });

    return headerView;
});