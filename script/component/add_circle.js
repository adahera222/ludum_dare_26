(function() {
    "use strict";

    function addCircle(entity, color) {

        entity.on("draw", function(e) {
            e.ctx.fillStyle = color;
            e.ctx.beginPath();
            e.ctx.arc(e.pos.x, e.pos.y, entity.radius, 0, Math.PI*2);
            e.ctx.closePath();
            e.ctx.fill();
        })
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = addCircle;
    } else if (typeof define === 'function') {
        define(function() { return addCircle; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.addCircle = addCircle;
    } else {
        this.addCircle = addCircle;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());