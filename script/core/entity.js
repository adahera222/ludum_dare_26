(function() {
    "use strict";

    function Entity () {
        GrifGame.addEventCapabilities(this);
        this.pos = new GrifGame.Vector(0,0);
        this.tags = []
        this.addSpecialEmiter("draw", function(callback, e) {
            e.pos = this.pos.clone();
            e.ctx.save();
            this.emit("configureContext", e);
            callback();
            e.ctx.restore();
        });
    }

    Entity.prototype.kill = function() {
        this.removeAllListener();
        this.destroy();
    };

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = Entity;
    } else if (typeof define === 'function') {
        define(function() { return Entity; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.Entity = Entity;
    } else {
        this.Entity = Entity;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());