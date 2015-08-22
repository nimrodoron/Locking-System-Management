require.config({
   paths: {
       jquery: 'libs/jquery-1.11.2',
       underscore: 'libs/underscore',
       backbone: 'libs/backbone',
       bootstrap: 'libs/bootstrap.min',
       text: 'libs/text',
       async: 'libs/requirejs-plugins/src/async',
       metisMenu: 'libs/metisMenu',
       sbadmin: 'libs/sb-admin-2',

       //views
       NavView: 'views/nav',
       DashboardPageView: 'views/pages/dashboard',
       LockPageView: 'views/pages/lock',
       MapPageView: 'views/pages/map',
       TablePageView: 'views/pages/table',

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
        },
        'metisMenu':{
            deps:['jquery','bootstrap']
        },
        'sbadmin':{
            deps:['jquery','bootstrap','metisMenu']
        }

    }


});

//TODO - get API key from config var

require([
    'MainRouter'

], function(MainRouter){
    MyGlobal.routers = {};
    MyGlobal.routers.mainRouter = new MainRouter();
});