/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/table.html",
        "AcpCrudService"
    ], function ($, _, Backbone, TablePageTemplate, AcpCrudService) {
        return Backbone.View.extend({
            acps: null,
            el: ".page-wrapper",
            events: {
                'click .submit': 'formSubmitted'
            },
            initialize: function (options) {


                this.render();
            },
            render: function () {
                var template = _.template(TablePageTemplate);
                AcpCrudService.getService().getAllAcps().done(function(acpCollection){
                    this.acps = acpCollection;
                    this.$el.html(template({"connectedAcps": this.acps.toJSON()}));

                }.bind(this));

            }

    });
    });