(function() {
    "use strict";

    function addCollisionAction (entity, map) {
        function callback (type) {
            return function () {
                game.emit("playSound", map[type]);
            };
        }

        entity.on("collision", function(e) {
            for (var i = 0; i < e.collided.tags.length; i++) {
                if (map[e.collided.tags[i]]) {
                    this.emit(map[e.collided.tags[i]],e);
                }
            }
            if(map["all"]) {
                this.emit(map["all"]);
                return;
            }
        });
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = addCollisionAction;
    } else if (typeof define === 'function') {
        define(function() { return addCollisionAction; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.addCollisionAction = addCollisionAction;
    } else {
        this.addCollisionAction = addCollisionAction;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());