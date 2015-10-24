/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/landing-page-template.html",
        "AcpCrudService",
        "AcpCollection",
        "metisMenu",
    ], function ($, _, Backbone, LandingPageTemplate, AcpCrudService, AcpCollection) {
        var MainIndexView = Backbone.View.extend({
            el: ".nav-wrapper",
            events: {
                'click .collapsable': 'onCollapsableClicked'
            },
            initialize: function () {
                MyGlobal.cssUtils.injectCss("bootstrap.min.css");
                MyGlobal.cssUtils.injectCss("sb-admin-2.css");
                MyGlobal.cssUtils.injectCss("metisMenu.min.css");
                MyGlobal.cssUtils.injectCss("font-awesome.css");

                this.render();
                this.$outer_el.find(".sidebar-nav").metisMenu();

            },
            render: function () {
                var AcpCrudRef = AcpCrudService.getService();
                AcpCrudRef.getAllAcps().done(function(aAcps){
                    var aAcpCollection = new AcpCollection(aAcps);
                    var template = _.template(LandingPageTemplate);
                    this.$outer_el.html(template({AcpCollection: aAcpCollection.toJSON()}));
                }.bind(this));
            },

            onCollapsableClicked: function(oEvent){
                $($(oEvent.target).parent().parent().children()[1]).toggle()            }
        });
        return MainIndexView;
    });