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
        var cachedAcps = null;

        var init = function(){

            return {

                getAllAcps:  function(disabledCache) {

                    var oDeferred = new $.Deferred();
                    if (disabledCache !== true && cachedAcps != null) {
                        oDeferred.resolve(cachedAcps);
                        return oDeferred.promise();
                    }
                    var promise = $.ajax({
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        url: "/getAllAcps",
                        data: { CSRF: $('#csrf-token').val()},
                        success: function(response) {
                            cachedAcps =  response;
                            oDeferred.resolve(cachedAcps);

                        }});
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