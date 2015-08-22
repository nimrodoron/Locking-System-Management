/**
 * Created by Amir on 22/08/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "AcpModel"
    ], function ($, _, Backbone, AcpModel) {

        return  Backbone.Collection.extend({
            model: AcpModel
        });

    });