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
                urlRoot : '/get_all_acp',
                defaults: {
                    id: '',
                    name: '',
                    disabled: '',
                    lat: '',
                    long: '',
                    macAddr: '',
                    currentlyActive: false,
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


