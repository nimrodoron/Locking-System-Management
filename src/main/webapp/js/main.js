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
       olMap: 'libs/ol',
       Spinner: 'libs/spin',

       //views
       NavView: 'views/nav',
       DashboardPageView: 'views/pages/dashboard',
       LockPageView: 'views/pages/lock',
       MapPageView: 'views/pages/map',
       TablePageView: 'views/pages/table',

       //collections
       AcpCollection: 'collections/Acp',
       //routers
       MainRouter: 'router',

       //Model
       AcpModel: 'model/Acp',
       CustomOlMap: 'model/CustomOlMap',

       //utils
       cssUtils: 'cssUtils',
       AcpCrudService: 'services/AcpCrudService'
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
        },
        'CustomOlMap':{
            deps: ['olMap']
        }

    }


});

//TODO - get API key from config var

require([
    'MainRouter',
    'cssUtils'

], function(MainRouter,cssUtils){
    MyGlobal.routers = {};
    MyGlobal.routers.mainRouter = new MainRouter();
    MyGlobal.cssUtils.setPath('css/');
});