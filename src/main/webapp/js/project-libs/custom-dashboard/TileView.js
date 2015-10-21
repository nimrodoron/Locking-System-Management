/**
 * Created by i313712 on 19/10/2015.
 */
if (typeof(CustomUI) === 'undefined')
    var CustomUI = {};

(function () {
    'use strict';

    CustomUI.TileView = function () {
        this.TileCollection = [];
    };

    CustomUI.TileView.prototype.addTile = function addTile(oTile) {
            this.TileCollection.push(oTile);
    };

    CustomUI.TileView.prototype.getHtml = function(){
        var outputHtml = "";
        this.TileCollection.forEach(function(Tile){
            outputHtml+=Tile._getHtml();
        });
        outputHtml= '<div class="tile-container-view">'+outputHtml+'</div>';
        return outputHtml;
    };

        /*
        var template = '\<div class=\"custom-tile-container\"> <div class="custom-tile-inner-container"> <div class="custom-tile-text-container"> <div class="custom-tile-header"> {{sTitleText}} </div> <div class="custom-tile-sub-header"> {{sSubTitleText}} </div> <div class="custom-tile-body"> {{sBodyText}} </div> <div class="custom-tile-footer fail"> {{bStatus}} </div> </div> </div> </div>';
        template = template.replace('{{sTitleText}}',this.sTitleText);
        template = template.replace('{{sBodyText}}',this.sBodyText);
        template = template.replace('{{sSubTitleText}}',this.sSubTitleText);
        template = template.replace('{{bStatus}}',this.sSubTitle === true ? "ON" : "OFF");
        return template;
    */
}());