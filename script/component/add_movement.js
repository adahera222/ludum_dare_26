(function() {
    "use strict";

    function addMovement(entity, value, radius, speed) {
        speed = parseFloat(speed) || 1;
        if(value=="line") {
            entity.on("update", function(e) {
                entity.vel.add({x:-0.005*e.dt*speed,y:0})
            });
        }
        if (value=="circle") {
            var rotation =0;
            entity.on("update", function(e) {
                rotation+=e.dt*0.001;
                //entity.vel.add({x:Math.cos(rotation)*0.001, y:Math.sin(rotation)*0.001})
                entity.vel.add({x:Math.cos(rotation)*0.05,y:Math.sin(rotation)*0.05})
            });
        }
        
    } 

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = addMovement;
    } else if (typeof define === 'function') {
        define(function() { return addMovement; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.addMovement = addMovement;
    } else {
        this.addMovement = addMovement;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());