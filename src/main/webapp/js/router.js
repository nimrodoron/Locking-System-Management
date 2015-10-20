/**
 * Created by I313712 on 13/01/2015.
 */
// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'NavView',
    'DashboardPageView',
    'LockPageView',
    'MapPageView',
    'TablePageView',
    'AcpCrudService'
], function($, _, Backbone, NavView, DashboardPageView, LockPageView, MapPageView, TablePageView, AcpCrudService){
    var AppRouter = Backbone.Router.extend({
        routes: {
            "dashboard": "renderDashboard",
            "map": "renderMap",
            "table": "renderTable",
            "*actions": "renderDashboard"
        },
        initialize: function (options){
            this.NavView = new NavView();
            this.pageViews = {};
            this.Collections = {};
            Backbone.history.start();

        },
        renderMap: function(){
            this.renderView(MapPageView,"map");
        },
        renderTable: function(){
            this.renderView(TablePageView,"table");

        },
        renderDashboard: function(){
            this.renderView(DashboardPageView,"dashboard");
        },
        renderView: function(view,name){
            if (!this.pageViews[name]){
                this.pageViews[name] = new view();
            }
            this.currPageView = this.pageViews[name];
            this.currPageView.render();
        }
    });
    return AppRouter;
});