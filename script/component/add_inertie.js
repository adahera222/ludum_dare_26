(function() {
    "use strict";

    function addInertia(entity, factor) {
        entity.on("update", function() {
            entity.vel.factor(factor);
        });
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = addInertia;
    } else if (typeof define === 'function') {
        define(function() { return addInertia; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.addInertia = addInertia;
    } else {
        this.addInertia = addInertia;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());