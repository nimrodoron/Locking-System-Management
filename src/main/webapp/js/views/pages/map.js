/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/map.html",
        "olMap"
    ], function ($, _, Backbone, MapPageTemplate, olMap, sbadmin) {
        var dashboardView = Backbone.View.extend({
            el: ".page-wrapper",
            events: {
                'click .submit': 'formSubmitted'
            },
            initialize: function () {

            },
            initMap: function(){
                this.map = new olMap.Map({
                    target: 'map',
                    layers: [
                        new olMap.layer.Tile({
                            source: new olMap.OSM()
                        })
                    ],
                    view: new olMap.View({
                        center: olMap.proj.transform([34.830892,32.080463], 'EPSG:4326', 'EPSG:3857'),
                        zoom: 6
                    })
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