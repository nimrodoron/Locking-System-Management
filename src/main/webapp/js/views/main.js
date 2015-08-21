/**
 * Created by Amir on 14/03/2015.
 */
define(
    [   'jquery',
        "underscore",
        "backbone",
        "text!templates/landing-page-template.html"
    ], function ($, _, Backbone, LandingPageTemplate) {
        var MainIndexView = Backbone.View.extend({
            el: ".body-container",
            events: {
                'click .submit': 'formSubmitted'
            },
            initialize: function () {
                this.render();

            },
            formSubmitted: function () {
                $.ajax({
                    url:'service?name='+$('.form-control').val()
                    }).done(function(data){
                    $('.form-control').set(data);
                        $('.form-control').popover({content:data,animation:false});
                        $('.form-control').popover('show');
                    }.bind(this));
            },
            render: function () {
                var template = _.template(LandingPageTemplate);
                this.$el.html(template());
            }
        })
        return MainIndexView;
    });