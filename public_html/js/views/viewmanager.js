define([
	'backbone'
], function(
	Backbone
){

	return Backbone.View.extend({

		initialize: function(views) {
			this.pages = views.pages;
			this.header = views.header;

			_.each(this.pages, function (page) {
				//во вьюхах переписать название на initialize с вызовом initialize родителя
				if(page.init){
					page.init();
				}
				this.listenTo(page, 'show', this.hidePage);
				this.listenTo(page, 'render', this.render);
			}.bind(this));
		},

		render: function (currentPage) {
			// перерендериваем view по ее имени viewName
			_.each(this.pages, function (page) {
				if (page.viewName === currentPage) {
					page.render();
				}
			});
		},

		hidePage: function(currentPage) {
			/**
			 * Закрываем все view, кроме текущей
			 */
			_.each(this.pages, function (page) {
				if (page !== currentPage) {
					page.hide();
				}
			});

		}
	});
});
