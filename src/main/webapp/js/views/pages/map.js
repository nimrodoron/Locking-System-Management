/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/map.html",
        "CustomOlMap",
        "AcpCrudService",
        "TablePageView",
        "AcpCollection"
    ], function ($, _, Backbone, MapPageTemplate, CustomOlMap, AcpCrudService, TablePageView, AcpCollection) {
        var dashboardView = Backbone.View.extend({
            acps: null,
            el: ".page-wrapper",
            events: {
            },
            tableView: null,

            initialize: function () {
                this.AcpCrudService = AcpCrudService.getService();
                this.acps = new AcpCollection();
            },
            initMap: function(){
                this.map = new CustomOlMap({
                    target: 'map',
                    view:  {
                        center: [34.829038, 32.066437],
                        zoom: 14,
                        radius: 50
                    },
                    events: {
                        click: this.handleAcpChange.bind(this)
                    }
                });

                this.updateMapWithAcp();


            },
            handleAcpChange: function(oAcp) {
                this.tableView.clearView();
                this.tableView.addItems(oAcp);
            },

            updateMapWithAcp: function(){
                this.AcpCrudService.getAllAcps()
                    .done(function(acpsArray){
                        this.acps.add(acpsArray);
                        this.map.createMarkers(this.acps);
                    }.bind(this))
                    .fail(function(err){
                        console.log(err);
                    });
            },
            render: function () {
                var template = _.template(MapPageTemplate);
                this.$el.html(template());
                MyGlobal.cssUtils.injectCss("mapView.css");
                MyGlobal.cssUtils.injectCss("ol.css");
                this.initMap();
                this.tableView = new TablePageView({el:".table-container", fetchData: false});
            }
        });
        return dashboardView;
    });