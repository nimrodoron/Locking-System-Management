/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/map.html",
        "CustomOlMap",
        "AcpCrudService"
    ], function ($, _, Backbone, MapPageTemplate, CustomOlMap, AcpCrudService) {
        var dashboardView = Backbone.View.extend({
            el: ".page-wrapper",
            events: {
                'click .submit': 'formSubmitted'
            },
            initialize: function () {
                this.AcpCrudService = AcpCrudService.getService();
            },
            initMap: function(){
                this.map = new CustomOlMap({
                    target: 'map',
                    view:  {
                        center: [34.830892,32.080463],
                        zoom: 15,
                        radius: 50
                    }
                });

                this.updateMapWithAcp();

            },
            updateMapWithAcp: function(){
                this.AcpCrudService.getAllAcps()
                    .done(function(AcpCollection){
                        this.map.createMarkers(AcpCollection);
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

            }
        });
        return dashboardView;
    });