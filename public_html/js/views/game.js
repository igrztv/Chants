define([
    'backbone',
    'tmpl/game',
    'utils/microphone'
], function(
    Backbone,
    game,
    mic
){
    var GameView = Backbone.View.extend({

        template: game(),
        //model: user,

        render: function () {
            this.$el.html(this.template);
        },
         
        events: {
            'click a': 'hide',
            'click .start': 'start'
        },

        start: function(){
            mic.requireMicrophone().done(function(){
                
                console.log('.done()');
                this.update();
                
            }.bind(this)).fail(function(){
                console.log('.fail()');
            });
            //mic.updatePitch();
            //let call frames for updating microphone    

        },

        update: function(){
            if (true) {
                rafID = requestAnimationFrame( this.update.bind(this) );
                mic.updatePitch();
            }
        },

        rec: function()
        {

        },

        pause: function(){

        },

        show: function () {
            this.trigger('show', this);
            this.$el.css({'display': 'block'});
            //this.render();
        },

        hide: function () {
            //this.$el.empty();
            this.$el.css({'display': 'none'});
        }

    });

    return new GameView({
        el: $('.game-block'),
    });;
});