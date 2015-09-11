/**
 * Created by Amir on 04/09/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/table.html",
        "AcpModel",
        "AcpCollection"
    ], function ($, _, Backbone, TablePageTemplate, AcpModel, AcpCollection) {

        var cache;

        var init = function(){

            return {

                getAllAcps:  function() {
                    var oDeferred = new $.Deferred();

                    var responsePayload =   {
                        registeredAcps : [
                            {"id":1,"name":"Tel Aviv", "disabled":"false", "lat":"32.086936", "long":"34.879804", "macAddr":"00:0a:95:9d:68:16"},
                            {"id":2,"name":"Pethach Tikva", "disabled":"false", "lat":"32.073264", "long":"32.157652", "macAddr":"00:0a:95:9d:68:17"},
                            {"id":3,"name":"Herzeliya", "disabled":"true", "lat":"32.157652", "long":"34.845082", "macAddr":"00:0a:95:9d:68:18"},
                            {"id":4,"name":"Rishon Le Zion", "disabled":"true", "lat":"31.967948", "long":"34.793579", "macAddr":"00:0a:95:9d:68:19"}
                        ],
                        connectedAcps: [
                            {"id":1, "port1":"on", "port2":"off", "port3":"off", "port4":"on", "port5":"on"},
                            {"id":2, "port1":"off", "port2":"off", "port3":"off", "port4":"on", "port5":"off"},
                        ]

                    };


                    var registeredAcps = responsePayload.registeredAcps;
                    var connectedAcps = responsePayload.connectedAcps;
                    var acpsArr = [];

                    registeredAcps.forEach(function (acpEntry) {
                        (function () {
                            connectedAcps.forEach(function (connectedAcpEntry) {
                                if (acpEntry.id === connectedAcpEntry.id) {
                                    acpEntry.currentlyActive = true;
                                    acpEntry.ports = connectedAcpEntry;
                                    delete acpEntry.ports.id;
                                    return;
                                }
                            });
                        }());
                        acpsArr.push(new AcpModel(acpEntry));
                    });
                    oDeferred.resolve(new AcpCollection(acpsArr));

                    return oDeferred.promise();
                }

            }

        };

        return {

            getService: function () {
                if (cache) {
                    return cache;
                }
                else {
                    cache = init();
                }
                return cache;
            }


        }



    });