/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/pages/dashboard.html",
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

            },
            render: function () {
                var template = _.template(DashboardPageTemplate);
                this.$el.html(template());
                MyGlobal.cssUtils.injectCss("../js/project-libs/custom-dashboard/Tile.css");
                this.createActionTiles();
                this.createStatusTiles();

            },
            createActionTiles: function() {
                var tileContainer = new CustomUI.TileView();

                var lockAll = new CustomUI.Tile({
                    sTitle: "Lock All",
                    sIcon: "glyphicon-lock",
                    sBackgroundColor: "gold"
                });

                var unlockAll = new CustomUI.Tile({
                    sTitle: "Unlock All",
                    sIcon: "glyphicon-eject",
                    sBackgroundColor: "darkkhaki"
                });

                var conntectedAcps = new CustomUI.Tile({
                    sTitle: "20 Connected ACPs",
                    sIcon: "glyphicon-globe",
                    sBackgroundColor: "greenyellow"
                });


                var cityCoverage = new CustomUI.Tile({
                    sTitle: "80% City Coverage",
                    sIcon: "glyphicon-user"
                });


                tileContainer.addTile(lockAll);
                tileContainer.addTile(unlockAll);
                tileContainer.addTile(conntectedAcps);
                tileContainer.addTile(cityCoverage);

                this.$el.find('.actions-tiles-container').append(tileContainer.getHtml());
            },
            createStatusTiles: function(){/*
                var tileContainer = new CustomUI.TileView();
                var newTile = new CustomUI.Tile({
                    sTitle: "Connected ACPs",
                    sSubTitle: "amount of currently connected acps",
                    sBodyText: "",
                    sSrc: "#"
                });
                var newTile1 = new CustomUI.Tile({
                    sTitle: "Disabled ACPs",
                    sSubTitle: "amount of currently disabled acps",
                    sBodyText: "",
                    bStatus: true,
                    sSrc: "#"
                });
                var newTile2 = new CustomUI.Tile({
                    sTitle: "City Coverage",
                    sSubTitle: "town shelters availability",
                    sBodyText: "",
                    bStatus: true,
                    sSrc: "#"
                });

                tileContainer.addTile(newTile2);

                this.$el.find('.status-tiles-container').append(tileContainer.getHtml());*/

            }
        });
        return dashboardView;
    });