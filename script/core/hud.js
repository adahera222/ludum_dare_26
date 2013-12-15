(function() {
    "use strict";
    var alpha = 0

    function hud(e,amount, score,combo) {
        /*******life**********/
        e.ctx.save();
        e.ctx.globalAlpha = 0.7;
        var height = 40*amount+10;
        var y = 320-height/2;
        e.ctx.fillStyle ="rgba(10,200,10,1)";
        alpha+=0.1;
        var a = 0
        if (amount==1) {
            a = Math.cos(alpha)*5
            e.ctx.fillStyle ="rgba(200,10,10,1)";
        }
        for (var i = amount - 1; i >= 0; i--) {
            e.ctx.fillRect(5,y+40*i+10-a/2,30+a,30+a);
        }
        e.ctx.restore();
        /*******Score**********/
        e.ctx.fillStyle ="rgba(10,10,10,0.7)";
        e.ctx.fillRect(960-130,0,138,52)
        e.ctx.font = "22px Monaco, \"Lucida Console\", 'Courier New', Courier, monospace";
        //e.ctx.font = "22px 'Lucida Console'";
        var str = ""+score
        for (var i = 10; i <= 1000000; i*=10) {
           if (score<i) str = "0"+str;
        };
        e.ctx.textBaseline = "top"
        e.ctx.textAlign = "right";
        e.ctx.fillStyle = "rgba(255,255,"+Math.floor(255-combo*255)+",1)";
        e.ctx.fillText(str,940,20)

    }


    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = hud;
    } else if (typeof define === 'function') {
        define(function() { return hud; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.hud = hud;
    } else {
        this.hud = hud;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());