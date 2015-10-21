require.config({
   paths: {
       //libs
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

       //custom libs
       Tile: 'project-libs/custom-dashboard/Tile',
       TileView: 'project-libs/custom-dashboard/TileView',

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
       CustomOlMap: 'project-libs/custom-ol-map',

       //utils
       cssUtils: 'cssUtils',
       AcpCrudService: 'services/acp-crud-service'
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