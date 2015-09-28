/**
 * Created by Amir on 22/08/2015.
 */

define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/dashboard.html",
        "sbadmin"
    ], function ($, _, Backbone, DashboardPageTemplate) {
            var AcpModel = Backbone.Model.extend({
                urlRoot : '/getAllAcps',
                defaults: {
                    id: '',
                    name: '',
                    enabled: '',
                    lat: '',
                    lon: '',
                    mac: '',
                    ip_addr: '',
                    acpclientstatus: '',
                    ports:{
                        port1: '',
                        port2: '',
                        port3: '',
                        port4: '',
                        port5: ''
                    }
                }
            });
            return AcpModel;
});


