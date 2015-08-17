require.config({
   paths: {
       jquery: '../js/libs/jquery-1.11.2',
       underscore: 'js/libs/underscore',
       backbone: 'js/libs/backbone',
       bootstrap: 'js/libs/bootstrap.min.js',
       text: 'libs/text',
       async: 'js/libs/requirejs-plugins/src/async',

       //views
       MainIndexView: 'views/main',

       //routers
       MainRouter: 'router'
    	   
   },

    shim:{
        'backbone':{
            deps:['underscore','jquery'],
            exports: 'Backbone'
        },
        'underscore':{
            exports: '_'
        },
        'bootstrap':{
            deps:['jquery']
        }

    }


});

//TODO - get API key from config var

require([
    'router'

], function(MainRouter){
    MyGlobal.routers = {};
    MyGlobal.routers.mainRouter = new MainRouter();
});