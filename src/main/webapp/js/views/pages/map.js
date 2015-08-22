/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/map.html",
    ], function ($, _, Backbone, MapPageTemplate, sbadmin) {
        var dashboardView = Backbone.View.extend({
            el: ".page-wrapper",
            events: {
                'click .submit': 'formSubmitted'
            },
            initialize: function () {
            },
            render: function () {
                var template = _.template(MapPageTemplate);
                this.$el.html(template());
            }
        })
        return dashboardView;
    });