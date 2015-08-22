/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/landing-page-template.html",
        "metisMenu"
    ], function ($, _, Backbone, LandingPageTemplate) {
        var MainIndexView = Backbone.View.extend({
            el: ".nav-wrapper",
            events: {
                'click .submit': 'formSubmitted'
            },
            initialize: function () {
                MyGlobal.cssUtils.injectCss("bootstrap.min.css");
                MyGlobal.cssUtils.injectCss("sb-admin-2.css");
                MyGlobal.cssUtils.injectCss("metisMenu.min.css");
                MyGlobal.cssUtils.injectCss("font-awesome.css");

                this.render();
                this.$el.find(".sidebar-nav").metisMenu();

            },
            render: function () {
                var template = _.template(LandingPageTemplate);
                this.$el.html(template());
            }
        })
        return MainIndexView;
    });