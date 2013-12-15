(function() {

    function Pool (size, entity, params) {
        "use strict";

        this.item = [];
        this.dead = [];
        var that = this;
        this.forceIndex = 0;

        for (var i = size - 1; i >= 0; i--) {
            var newItem = new entity(params);
            newItem.active = false;
            newItem.pool = this;
            newItem.destroy = function () {
                this.active = false;
                that.dead.push(this);
            };
            this.item.push(newItem);
            this.dead.push(newItem);
        }

    }

    Pool.prototype.create = function(callback,force) {
        var item = this.dead.shift();
        
        if (!item) {
            if (force) {
                item = this.item[this.forceIndex];
                this.forceIndex++;
                this.forceIndex %= this.item.length();
            } else {
                return false;
            }
        }
        if(item) {
            callback(item);
            item.active = true;
            return true;
        }
    };

    Pool.prototype.forEach = function(callback) {
        for (var i = this.item.length - 1; i >= 0; i--) {
            callback(this.item[i], this.item[i].active);
        }
    };

    Pool.prototype.forEachLiving = function(callback) {
        for (var i = this.item.length - 1; i >= 0; i--) {
            if (this.item[i].active) {
                callback(this.item[i]);
            }
        }
    };

    Pool.prototype.forEachDead = function(callback) {
        for (var i = this.dead.length - 1; i >= 0; i--) {
            callback(this.dead[i]);
        }
    };



    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = Pool;
    } else if (typeof define === 'function') {
        define(function() { return Pool; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.Pool = Pool;
    } else {
        this.Pool = Pool;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());
