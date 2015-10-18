/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/table.html",
        "AcpCrudService",
        "libs/spin",
        "AcpCollection"
    ], function ($, _, Backbone, TablePageTemplate, AcpCrudService, Spinner, AcpCollection) {
        return Backbone.View.extend({

            spinner : null,
            acps: null,
            el: ".page-wrapper",
            events: {
                'click .openButton' : 'onOpenButtonClick',
                'click .closeButton' : 'onCloseButtonClick'
            },

            initialize: function (options) {
                this.initModel();
                if (options && options.el) {
                    this.el = options.el;
                }
                if (typeof(options) ==='undefined' || options.fetchData !== false) {
                    this.render();
                }
                this.renderTable();
            },

            initModel: function() {
                var that = this;
                this.acps = new AcpCollection();
                this.acps.bind("add", function(){
                    that.renderTable();
                });
                this.acps.bind("remove", function(){
                    that.renderTable();
                });
            },

            clearView: function() {
                this.acps.reset();
            },

            render: function () {

                    AcpCrudService.getService().getAllAcps().done(function(acpCollection){
                        this.addItems(acpCollection);
                    }.bind(this));

            },
            addItems: function (acpCollection) {
                this.acps.add(acpCollection)
            },

            renderTable: function() {
                var template = _.template(TablePageTemplate);
                $(this.el).html(template({"connectedAcps": this.acps.toJSON()}));
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
                };
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

