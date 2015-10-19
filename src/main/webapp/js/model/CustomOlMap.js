/**
 * Created by Amir on 11/10/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "olMap"
    ], function ($, _, Backbone, ol) {
        var baseLayer = new ol.layer.Tile({source: new ol.source.OSM()});


        var MapUtils = {}; MapUtils.Style = {};

        MapUtils.Style.PICKED = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 4
            }),
            fill: new ol.style.Fill({
                color: 'rgba(117, 205, 4, 0.4)'
            })
        });


        MapUtils.Style.NOT_PICKED = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 4
            }),
            fill: new ol.style.Fill({
                color: 'rgba(117, 205, 4, 0.4)'
            })
        });



        var MapWrapper = function(oSettings){
            this.oSettings = oSettings;
            this.map = new ol.Map({
                target: oSettings.target,
                layers: [
                    baseLayer
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat(oSettings.view.center),
                    zoom: oSettings.view.zoom
                })
            });
            this.map.on('singleclick', function(oEvent){

                this.map.forEachFeatureAtPixel(oEvent.pixel, function(oFeature, oLayer) {
                    oFeature.setStyle(MapUtils.Style.PICKED);
                    console.log(oFeature + oLayer);
                });

            }.bind(this));

            this.oFeatureSource = new ol.source.Vector({
                projection: 'EPSG:3857'
            });

            this.oVectorLayer = new ol.layer.Vector({
                source: this.oFeatureSource
            });


            this.map.addLayer(this.oVectorLayer);


        };

        MapWrapper.prototype._drawCircleInMeter = function(lonLatCords) {
            var view = this.map.getView();
            var projection = view.getProjection();

            var circle = new ol.geom.Circle(ol.proj.fromLonLat(lonLatCords), 40);
            var circleFeature = new ol.Feature({
                geometry: circle
            });
            circleFeature.setStyle(MapUtils.Style.NOT_PICKED);

            this.oFeatureSource.addFeature(circleFeature);


        };

        MapWrapper.prototype.createMarkers = function(oAcpArr, sHtmlTemplate){
            this.oAcpArr = oAcpArr;
            oAcpArr.forEach(function(oAcp){
                this._drawCircleInMeter([oAcp.get('lon'),oAcp.get('lat')]);
            }.bind(this));

        };

        MapWrapper.prototype.createPopup = function(){
            console.log('selected');
        };

        MapWrapper.prototype.destroyPopup = function(){
            console.log('unselected');
        };

        return MapWrapper;
    });