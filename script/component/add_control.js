(function() {
    "use strict";

    function addControl(entity) {
        entity.dir = new GrifGame.Vector(1,0)

        
        entity.on("update", function(e) {
            var gamepad = e.inputs.gamepad(0);
            if (gamepad && gamepad.axes[0] && gamepad.axes[1]) {
                entity.dir.add({x:gamepad.axes[0]*0.2*e.dt/16, y:gamepad.axes[1]*0.2*e.dt/16})
            } else {
                var x = (e.inputs.key[39] || 0) -(e.inputs.key[37] || 0);
                var y = (e.inputs.key[40] || 0) -(e.inputs.key[38] || 0);
                entity.dir.add({x:x*0.2*e.dt/16, y:y*0.2*e.dt/16});
            }
            var l = entity.dir.lengthSquare()
            
            if (l>0) {
                entity.dir = entity.dir.unit();
                
            }
            entity.vel.x += entity.dir.x * e.dt * 0.015;
            entity.vel.y += entity.dir.y * e.dt * 0.015;
        });

    
    /*
        entity.on("update", function(e) {
            var dir = new GrifGame.Vector(0,0)
            var gamepad = e.inputs.gamepad(0);
            if (gamepad && gamepad.axes[0] && gamepad.axes[1]) {
                dir.set(gamepad.axes[0], gamepad.axes[1])
            } else {
                var x = (e.inputs.key[39] || 0) -(e.inputs.key[37] || 0);
                var y = (e.inputs.key[40] || 0) -(e.inputs.key[38] || 0);
                dir.set(x, y);
            }
            var angleTo = dir.angle();
            if (!isNaN(angleTo)) {
                var angleFrom = entity.dir.angle();
                var add = (angleTo-angleFrom%(Math.PI*2))/10;
                entity.dir.x = Math.cos(angleFrom+add);
                entity.dir.y = Math.sin(angleFrom+add);
                console.log()
            }
            
            entity.vel.x += entity.dir.x * e.dt * 0.03;
            entity.vel.y += entity.dir.y * e.dt * 0.03;
        });
    */
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = addControl;
    } else if (typeof define === 'function') {
        define(function() { return addControl; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.addControl = addControl;
    } else {
        this.addControl = addControl;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());