(function() {
    "use strict";

    function addKinetic(entity) {
        entity.vel = new GrifGame.Vector(0,0);

        entity.on("update", function(e) {
            entity.pos.x += entity.vel.x* e.dt;
            entity.pos.y += entity.vel.y* e.dt;
        });
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = addKinetic;
    } else if (typeof define === 'function') {
        define(function() { return addKinetic; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.addKinetic = addKinetic;
    } else {
        this.addKinetic = addKinetic;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());   