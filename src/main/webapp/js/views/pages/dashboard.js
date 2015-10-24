/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/dashboard.html",
        "Chart",
        "sbadmin",
        "Tile",
        "TileView"
    ], function ($, _, Backbone, DashboardPageTemplate) {
        var dashboardView = Backbone.View.extend({
            el: ".page-wrapper",
            events: {
                'click .submit': 'formSubmitted'
            },
            initialize: function () {
                //this.Chartjs = Chart.noConflict();
            },
            render: function () {
                var template = _.template(DashboardPageTemplate);
                this.$outer_el.html(template());
                MyGlobal.cssUtils.injectCss("../js/project-libs/custom-dashboard/Tile.css");
                this.createActionTiles();

            },
            createActionTiles: function() {
                var tileContainer = new CustomUI.TileView({
                    el: '.actions-tiles-container',
                    iMaxCols: 16
                });

                var lockAll = new CustomUI.Tile({
                    sTitle: "Lock All",
                    sIcon: "glyphicon-lock",
                    sBackgroundColor: "gold",
                    bCustomTile: false,
                    aSize: [4,2]
                });

                var unlockAll = new CustomUI.Tile({
                    sTitle: "Unlock All",
                    sIcon: "glyphicon-eject",
                    sBackgroundColor: "darkkhaki",
                    bCustomTile: false,
                    aSize: [4,2]
                });


                var pieGraph = new CustomUI.Tile({
                    sCustomContent: "<canvas class='myPieChart'></canvas>",
                    sBackgroundColor: "purple",
                    bCustomTile: true,
                    aSize: [8,4],
                    fCallBack: this.createChart.bind(this)
                });



                var conntectedAcps = new CustomUI.Tile({
                    sTitle: "20 Connected ACPs",
                    sIcon: "glyphicon-globe",
                    sBackgroundColor: "greenyellow",
                    bCustomTile: false,
                    aSize: [4,2]
                });


                var cityCoverage = new CustomUI.Tile({
                    sTitle: "80% City Coverage",
                    sIcon: "glyphicon-user",
                    bCustomTile: false,
                    sBackgroundColor: "salmon",
                    aSize: [4,2]
                });


                tileContainer.addTile(lockAll);
                tileContainer.addTile(unlockAll);
                tileContainer.addTile(pieGraph);
                tileContainer.addTile(conntectedAcps);
                tileContainer.addTile(cityCoverage);
                tileContainer.render();




            },
            createChart: function(){

                var ctx = $(this.el).find('.myPieChart').get(0).getContext("2d");


                var config = {
                    type: "doughnut",
                    data: {
                        datasets: [{
                            data: [
                                20,
                                70,
                                10
                            ],
                            backgroundColor: [
                                "#FFFF00",
                                "#9ACD32",
                                "#F7464A"

                            ]
                        }],
                        labels: [
                            "Disabled",
                            "Connected",
                            "Disconnected"
                        ]

                    },
                    options: {
                        responsive: true
                    }
                };
                var myDoughnutChart = new Chart(ctx, config);


            }
        });
        return dashboardView;
    });