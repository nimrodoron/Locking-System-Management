/**
 * Created by i313712 on 19/10/2015.
 */
if (typeof(CustomUI) === 'undefined') {
    var CustomUI = {};
}
(function () {
    'use strict';

    CustomUI.Tile = function (oSettings) {
        this.oSettings = oSettings;
        this.$inner_el = null;
    };
    CustomUI.Tile.prototype.setContainer = function setContainer(outer_el) {

        this.$outer_el = $(outer_el);

    };

    CustomUI.Tile.prototype.render = function render () {
        if (this.$inner_el === null) {

            var uniqueId = Math.floor(Math.random()*1000);
            var innerClass = 'custom-tile-container-'+uniqueId;
            var template = this._getHtml(innerClass);
            this.$outer_el.append(template);
            this.$inner_el = this.$outer_el.find('.'+innerClass);
        }

        this.$inner_el.css('left',  (this.oPosition.left * CustomUI.ResponsiveGrid.BasicUnit)+2*this.oPosition.left);
        this.$inner_el.css('top',  (this.oPosition.top *CustomUI.ResponsiveGrid.BasicUnit)+2*this.oPosition.top);
        this.$inner_el.css('width', (this.oSettings.aSize[0] * CustomUI.ResponsiveGrid.BasicUnit)+2*(this.oSettings.aSize[0]-1));
        this.$inner_el.css('height', (this.oSettings.aSize[1] * CustomUI.ResponsiveGrid.BasicUnit)+2*(this.oSettings.aSize[1]-1));

        if (this.oSettings.fCallBack)
            this.oSettings.fCallBack();

    };

    CustomUI.Tile.prototype._getHtml = function _getHtml(sUniqueClass) {
        var template = '<div class="custom-tile-container {{sUniqueClass}}" style="position: inherit; background-color: {{sBackgroundColor}};">';
        template = template.replace('{{sUniqueClass}}', sUniqueClass);
        template = template.replace('{{sBackgroundColor}}', this.oSettings.sBackgroundColor);

        if (this.oSettings.bCustomTile) {
            template = template + this.oSettings.sCustomContent + '</div>';

        } else {
            template = template + '<div class="custom-tile-inner-container" style=""><div class=\"custom-tile-text-container\"> <div class="custom-tile-header" style="text-align: right;"> <span class="custom-tile-glyphicon glyphicon {{sIcon}}" aria-hidden="true"></span> </div> <div class="custom-tile-body"> {{sTitleText}} </div> </div> </div> </div>';
            template = template.replace('{{sTitleText}}',this.oSettings.sTitle);
            template = template.replace('{{sIcon}}',this.oSettings.sIcon);


        }
        return template;
    };

    CustomUI.Tile.prototype.setPosition = function setPosition (oPosition) {
      this.oPosition = oPosition;
    };

    CustomUI.Tile.prototype.getBasicUnitsWidth = function getBasicUnitsWidth(){
        return this.oSettings.aSize[0];
    };

    CustomUI.Tile.prototype.getBasicUnitsHeight = function getBasicUnitsHeight(){
        return this.oSettings.aSize[1];
    };
}());