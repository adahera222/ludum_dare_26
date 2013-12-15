(function() {
    "use strict";

    function addPlayerBoundary (entity) {
        entity.on("update", function(e) {
            entity.pos.y = (entity.pos.y+640)%640;
            if(entity.pos.x<10) {
                entity.pos.x=10;
            } else if(entity.pos.x>950) {
                entity.pos.x=950;
            }
        });
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = addPlayerBoundary;
    } else if (typeof define === 'function') {
        define(function() { return addPlayerBoundary; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.addPlayerBoundary = addPlayerBoundary;
    } else {
        this.addPlayerBoundary = addPlayerBoundary;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());