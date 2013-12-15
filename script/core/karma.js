(function() {
    "use strict";

    function Karma(game, scene) {
        this.value = 0;

        game.on("resetLevel", function() {
            that.value = 0;
        });

        game.on("looseLife", function() {
            that.value+=10+(5-scene.life)*20
        });

        game.on("scorePlus", function(e) {
            that.value-=e.value
        });

        game.on("spawnEnemy", function(e) {
            var type = Math.random()
            if (that.value>0) {
                if (type*2>1) {
                    //
                } else {

                }
            }
        } false, 10)


        function wave1() {
            scene.entities.create(function(entity) {
                
            });
        }

    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = Karma;
    } else if (typeof define === 'function') {
        define(function() { return Karma; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.Karma = Karma;
    } else {
        this.Karma = Karma;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());