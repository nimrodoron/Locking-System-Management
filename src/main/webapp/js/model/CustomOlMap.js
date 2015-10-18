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

        };
        MapWrapper.prototype._drawCircleInMeter = function(lonLatCords) {
            var view = this.map.getView();
            var projection = view.getProjection();

            var circle = new ol.geom.Circle(ol.proj.fromLonLat(lonLatCords), 40);
            var circleFeature = new ol.Feature(circle);

            // Source and vector layer
            var vectorSource = new ol.source.Vector({
                projection: 'EPSG:3857'
            });
            vectorSource.addFeature(circleFeature);
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'blue',
                        width: 3
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(117, 205, 4, 0.4)'
                    })
                })
            });

            this.map.addLayer(vectorLayer);
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