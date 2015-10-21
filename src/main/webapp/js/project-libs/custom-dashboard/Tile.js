/**
 * Created by i313712 on 19/10/2015.
 */
if (typeof(CustomUI) === 'undefined')
    var CustomUI = {};

(function () {
    'use strict';

    CustomUI.Tile = function (oSettings) {
        this.sTitleText = oSettings.sTitle;
        this.sIcon = oSettings.sIcon;
        this.sBackgroundColor = oSettings.sBackgroundColor;
    };

    CustomUI.Tile.prototype._getHtml = function _getHtml() {
        var template = '<div class="custom-tile-container"> <div class="custom-tile-inner-container" style="background-color: {{sBackgroundColor}}"><div class=\"custom-tile-text-container\"> <div class="custom-tile-header" style="text-align: right;"> <span class="glyphicon {{sIcon}}" aria-hidden="true"></span> </div> <div class="custom-tile-body"> {{sTitleText}} </div> </div> </div> </div>';
        template = template.replace('{{sTitleText}}',this.sTitleText);
        template = template.replace('{{sIcon}}',this.sIcon);
        template = template.replace('{{sBackgroundColor}}',this.sBackgroundColor);
        return template;
    }
}());