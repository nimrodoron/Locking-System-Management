/**
 * Created by i313712 on 19/10/2015.
 */
if (typeof(CustomUI) === 'undefined') {
    var CustomUI = {};
}


(function () {
    'use strict';

    CustomUI.ResponsiveGrid = {};
    CustomUI.ResponsiveGrid.BasicUnit = 50;
    CustomUI.ResponsiveGrid.GridMatrix = function (iMaxCols,iMaxRows) {
        this.iMaxCols = iMaxCols;
        this.iMaxRows = iMaxRows;
        var i,j;
        this.mOccMatrix = [];
        for (i=0; i < this.iMaxRows; i++) {
            this.mOccMatrix[i] = [];
            for (j=0; j<this.iMaxCols; j++) {
                this.mOccMatrix[i][j] = -1;
            }
        }
    };


    CustomUI.ResponsiveGrid.GridMatrix.prototype.addObj = function addObj(aPosition, aMeas){

        var startRow = aPosition[0];
        var startCol = aPosition[1];
        var objWidth = aMeas[0];
        var objHeight = aMeas[1];
        var endRow = startRow + objHeight;
        var endCol = startCol + objWidth;

        if (objWidth > this.iMaxCols) {
            if (this._rowEmpty(startRow)) {
                this._markPosition({
                    startRow: startRow,
                    startCol: 0,
                    endRow: endRow,
                    endCol: endCol

                });
                return true;
            }
            return false;
        }
        if (endCol > this.iMaxCols)
            return false;

        var bPositionEmpty = this._positionEmpty({
            startRow: startRow,
            startCol: startCol,
            endRow: endRow,
            endCol: endCol
        });

        if (!bPositionEmpty)
            return false;

        this._markPosition({
            startRow: startRow,
            startCol: startCol,
            endRow: endRow,
            endCol: endCol

        });

        return true;

    };

    CustomUI.ResponsiveGrid.GridMatrix.prototype._markPosition = function _markPosition(oPosition){
        var i,j;

        for (i=oPosition.startRow; i<oPosition.endRow && i<this.iMaxRows; i++) {
            for (j=oPosition.startCol; j<oPosition.endCol && j<this.iMaxCols; j++) {
                this.mOccMatrix[i][j] = 1;
            }
        }
     };

    CustomUI.ResponsiveGrid.GridMatrix.prototype._rowEmpty = function _rowEmpty(iRow) {
        return this._positionEmpty({
            startRow: iRow,
            endRow: iRow+1,
            startCol: 0,
            endCol: this.iMaxCols
        });

    };

    CustomUI.ResponsiveGrid.GridMatrix.prototype._positionEmpty = function _positionEmpty (oPosition) {
        var i,j;

        for (i=oPosition.startRow; i<oPosition.endRow && i<this.iMaxRows; i++) {
            for (j=oPosition.startCol; j<oPosition.endCol && j<this.iMaxCols; j++) {
                if (this.mOccMatrix[i][j] === 1){
                    return false;
                }
            }
        }
        return true;
    };

    CustomUI.TileView = function (oSettings) {
        this.TileCollection = [];
        this.$outer_el = $(oSettings.el);
        var uniqueId = Math.floor(Math.random()*100);
        var innerClass = 'tile-container-view-'+uniqueId;
        var outputHtml= '<div class="{{sInnerClass}}" style="position: absolute"></div>';
        outputHtml = outputHtml.replace('{{sInnerClass}}',innerClass);
        this.$outer_el.html(outputHtml);
        this.inner_el = '.'+innerClass;
        this.resizeEvent = null;
        this.inputMaxCols = oSettings.iMaxCols;

        var _this = this;
        $(window).on('resize',function(oEvent){
            clearTimeout(_this.resizeEvent);
            _this.resizeEvent = setTimeout(function(){
                _this.render();
            },350);
        });

    };
    CustomUI.TileView.prototype.addTile = function addTile(oTile) {
        oTile.setContainer(this.inner_el);
        this.TileCollection.push(oTile);
    };


    CustomUI.TileView.prototype._updateConstants = function _updateConstants () {
        this.containerWidth = this.$outer_el.width();
        this.iMaxCols = Math.floor(this.containerWidth/CustomUI.ResponsiveGrid.BasicUnit);
        var combinedMaxCols = this.inputMaxCols <= this.iMaxCols ? this.inputMaxCols : this.iMaxCols;
        this.mOccuMatrix = new CustomUI.ResponsiveGrid.GridMatrix(combinedMaxCols, 200);
    };

    CustomUI.TileView.prototype._containerChanged = function _containerChanged() {

        if (this.containerWidth && (Math.abs(this.$outer_el.width() - this.containerWidth) <= 100))
            return false;

        this.containerWidth = this.$outer_el.width();
        return true;

    };
    CustomUI.TileView.prototype.render = function render() {

           /* if (!this._containerChanged()) {
                console.log('no massive change - dont render');
                return;

            }*/

            console.log('actualrender');
            this._updateConstants();
            var currentRow = 0, currentCol = 0;
            var _this = this;
            this.TileCollection.forEach(function(oCurrentTile){

                var widthBasicUnits = oCurrentTile.aSize[0];
                var heightBasicUnits = oCurrentTile.aSize[1];
                var isAdded=false;

                while (isAdded === false) {
                    var isAdded = _this.mOccuMatrix.addObj([currentRow,currentCol],[widthBasicUnits,heightBasicUnits]);
                    if (isAdded === true) {

                        oCurrentTile.setPosition({
                            left: currentCol,
                            top: currentRow
                        });

                        currentCol += widthBasicUnits;
                        if (currentCol >= _this.iMaxCols) {
                            currentCol=0 ;
                            currentRow++;
                        }

                    }
                    else {
                        if (currentCol < _this.iMaxCols) {
                            currentCol++;
                        } else {
                            currentCol=0 ;
                            currentRow++;
                        }
                    }

                }



            });


           this.TileCollection.forEach(function(oTile){
               oTile.render();

            });


    };
}());