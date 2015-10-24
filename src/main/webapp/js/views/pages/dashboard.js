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

                var actionsTable = new CustomUI.Tile({
                    bCustomTile: true,
                    aSize: [8,4],
                    sCustomContent: '<div class="panel panel-default"><div class="panel-heading">Latest Actions</div><table class="table"><thead><tr><th>Time</th><th>Action</th><th></th></tr></thead><tbody><tr><td>20/10/15</td><td>Ha Broshim Shelter Locked </td><td><span class="glyphicon glyphicon-lock"></span></td></tr> <tr><td>20/10/15</td><td>Ahad Ha\'am Shelter Locked  </td><td><span class="glyphicon glyphicon-lock"></span></td> </tr> <tr><td>20/10/15</td><td>Bnei Ha Nevi\'im Shelter Locked  </td><td><span class="glyphicon glyphicon-lock"></span></td> </tr> </tbody> </table> </div>'
                });

                var alarmsTable = new CustomUI.Tile({
                    bCustomTile: true,
                    //sBackgroundColor: "salmon",
                    aSize: [8,4],
                    sCustomContent: '<div class="panel panel-default"><div class="panel-heading">Latest Alarms</div><table class="table"><thead><tr><th>Time</th><th>Info</th></tr></thead><tbody><tr><td>20/10/15</td><td>Alarm in Sderot</td></tr> <tr><td>18/10/15</td><td>False Alarm in Raanana</td></tr><tr><td>15/10/15</td><td>Alarm in Rehovot</td> </tr> </tbody> </table> </div>'
                });


                tileContainer.addTile(lockAll);
                tileContainer.addTile(unlockAll);
                tileContainer.addTile(pieGraph);
                tileContainer.addTile(conntectedAcps);
                tileContainer.addTile(cityCoverage);
                tileContainer.addTile(actionsTable);
                tileContainer.addTile(alarmsTable);

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