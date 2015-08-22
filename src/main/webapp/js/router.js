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
    'TablePageView'
], function($, _, Backbone, NavView, DashboardPageView, LockPageView, MapPageView, TablePageView){
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
            Backbone.history.start();
        },
        renderMap: function(){
            this.renderView(MapPageView,"map");
        },
        renderTable: function(){
            this.renderView(TablePageView,"dashboard");
        },
        renderDashboard: function(){
            this.renderView(DashboardPageView,"table");
        },
        renderView: function(view,name){
            if (this.pageViews[name]){
                this.pageViews[name].render();
            } else {
                this.pageViews[name] = new view();
            }
            this.currPageView = this.pageViews[name];
            this.currPageView.render();
        }
    });
    return AppRouter;
});