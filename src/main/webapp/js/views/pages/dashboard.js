/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/dashboard.html",
        "sbadmin"
    ], function ($, _, Backbone, DashboardPageTemplate) {
        var dashboardView = Backbone.View.extend({
            el: ".page-wrapper",
            events: {
                'click .submit': 'formSubmitted'
            },
            initialize: function () {
            },
            render: function () {
                var template = _.template(DashboardPageTemplate);
                this.$el.html(template());
            }
        });
        return dashboardView;
    });