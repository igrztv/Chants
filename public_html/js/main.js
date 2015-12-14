require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        backbone: "lib/backbone",
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        jqueryValidation: "lib/jquery.validate"        
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define([
    'backbone',
    'router'
], function( 
    Backbone,
    router
){
    Backbone.history.start();
});
