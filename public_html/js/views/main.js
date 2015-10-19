define([
    'backbone',
    'views/base',
    'tmpl/main'
], function(
    Backbone,
    Base,
    main
){
 
    var MainView = Base.extend({
        template: main
    });

    return new MainView({el: $('.b-main')});
});
