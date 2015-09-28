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

                    var promise = $.ajax({
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        url: "/getAllAcps",
                        data: { CSRF: $('#csrf-token').val()},
                        success: function(response) {
                            oDeferred.resolve(new AcpCollection(response));

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