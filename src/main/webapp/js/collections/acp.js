/**
 * Created by Amir on 22/08/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "AcpModel",
        "AcpCrudService"
    ], function ($, _, Backbone, AcpModel) {

        return  Backbone.Collection.extend({
            model: AcpModel,
            initialize: function() {
                this.on('add', function(model) {
                    console.log('something got added');
                });
                // This will be called when an item is removed, popped or shifted
                this.on('remove',  function(model) {
                    console.log('something got removed');
                });
                // This will be called when an item is updated
                this.on('change', function(model) {
                    console.log('something got changed');
                });

            }
        });

    });