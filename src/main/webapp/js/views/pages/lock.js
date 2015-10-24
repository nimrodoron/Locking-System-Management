/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/lock.html",
    ], function ($, _, Backbone, LockPageTemplate, sbadmin) {
        var dashboardView = Backbone.View.extend({
            el: ".page-wrapper",
            events: {
                'click .submit': 'formSubmitted'
            },
            initialize: function () {
            },
            render: function () {
                var template = _.template(LockPageTemplate);
                this.$outer_el.html(template());
            }
        })
        return dashboardView;
    });