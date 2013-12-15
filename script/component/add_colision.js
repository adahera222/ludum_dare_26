(function() {
    "use strict";

    function addColision (entity, tags, pool) {

        entity.on("update", function(e) {

            pool.forEachLiving(function(item) {
                if (item === entity) return;
                var distance = entity.pos.to(item.pos).lengthSquare();
                if ((distance < (entity.radius + item.radius)*(entity.radius + item.radius)) && testFriendly(item)) {
                    entity.emit("collision",{dt: e.dt, collided: item});
                    item.emit("collision",{dt: e.dt, collided: entity});
                };
            });
        });

        function testFriendly(item) {
            for (var i = 0; i < item.tags.length; i++) {
                if (tags.indexOf(item.tags[i]) >=0) {
                    return true;
                }
            };
            return false
        }
    }



    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = addColision;
    } else if (typeof define === 'function') {
        define(function() { return addColision; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.addColision = addColision;
    } else {
        this.addColision = addColision;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());