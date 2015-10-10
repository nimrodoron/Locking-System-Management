/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/table.html",
        "AcpCrudService",
        "libs/spin"
    ], function ($, _, Backbone, TablePageTemplate, AcpCrudService, Spinner) {
        return Backbone.View.extend({

            spinner : null,

            acps: null,
            el: ".page-wrapper",
            events: {
                'click .submit': 'formSubmitted',
                'click .openButton' : 'onOpenButtonClick',
                'click .closeButton' : 'onCloseButtonClick'
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

            },
            createSpinner :function() {
                var opts = {
                    lines: 13 // The number of lines to draw
                    , length: 28 // The length of each line
                    , width: 14 // The line thickness
                    , radius: 42 // The radius of the inner circle
                    , scale: 1 // Scales overall size of the spinner
                    , corners: 1 // Corner roundness (0..1)
                    , color: '#000' // #rgb or #rrggbb or array of colors
                    , opacity: 0 // Opacity of the lines
                    , rotate: 0 // The rotation offset
                    , direction: 1 // 1: clockwise, -1: counterclockwise
                    , speed: 1 // Rounds per second
                    , trail: 60 // Afterglow percentage
                    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                    , zIndex: 2e9 // The z-index (defaults to 2000000000)
                    , className: 'spinner' // The CSS class to assign to the spinner
                    , top: '50%' // Top position relative to parent
                    , left: '50%' // Left position relative to parent
                    , shadow: false // Whether to render a shadow
                    , hwaccel: false // Whether to use hardware acceleration
                    , position: 'absolute' // Element positioning
                }
                var target = document.getElementById("locksTable");
                spinner = new Spinner(opts).spin(target);

            },
            onOpenButtonClick : function(args) {

                this.handleWating();
                var data = JSON.parse(args.currentTarget.childNodes[1].innerHTML)
                $.ajax({
                    url: "http://localhost:8080/acpAction",
                    data: {
                        "acpId" : data.id,
                        "port" : data.port,
                        "portStatus" : "OPEN"

                    }
                }).then(function(data) {
                });
            },
            onCloseButtonClick : function(args) {

                this.handleWating();
                var data = JSON.parse(args.currentTarget.childNodes[1].innerHTML)
                $.ajax({
                    url: "http://localhost:8080/acpAction",
                    data: {
                        "acpId" : data.id,
                        "port" : data.port,
                        "portStatus" : "CLOSE"

                    }
                }).then(function(data) {
                });
            },
            handleWating : function() {
                this.createSpinner();
                this.handleDisable(true);
                setTimeout(this.timeoutHandle, 3000, this);

            },
            timeoutHandle : function(context) {
                spinner.stop();
                context.render();
            }.bind(this),

            handleDisable : function(enable) {
                var nodes = document.getElementById("locksTable").getElementsByTagName('*');
                for(var i = 0; i < nodes.length; i++) {
                    nodes[i].disabled = enable;
                }
            }

        });
    });

