(function() {
    "use strict";

    function addTrails (entity, strengt, color) {
        var buffer = document.createElement("canvas");
        buffer.width=960;
        buffer.height=640;
        var ctx = buffer.getContext("2d");
        var save = document.createElement("canvas");
        var sctx = save.getContext("2d");
        var n = navigator.userAgent.search("Firefox");

        if (n==-1) {
            entity.on("draw", function(e) {
                ctx.save();
                ctx.globalCompositeOperation = "copy";
                ctx.globalAlpha = parseFloat(strengt);
                ctx.drawImage(buffer,0,0);
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = "source-over";
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(e.pos.x, e.pos.y, entity.radius, 0, Math.PI*2);
                ctx.closePath();
                ctx.fill();
                e.ctx.drawImage(buffer,0,0)
                ctx.restore();
            });
        }

        
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = addTrails;
    } else if (typeof define === 'function') {
        define(function() { return addTrails; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.addTrails = addTrails;
    } else {
        this.addTrails = addTrails;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());