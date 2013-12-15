(function() {



    function Vector (x,y) {
        this.x = x;
        this.y = y;
    }

    Vector.prototype.length = function() {
        return Math.sqrt(this.lengthSquare());
    };

    Vector.prototype.lengthSquare = function() {
        return this.x*this.x + this.y*this.y;
    };

    Vector.prototype.add = function(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    };

    Vector.prototype.factor = function(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    };
    Vector.prototype.scale = Vector.prototype.factor

    Vector.prototype.unit = function() {
        var length = this.length();
        return new Vector(this.x/length, this.y/length);
    };

    Vector.prototype.clone = function() {
        return new Vector(this.x, this.y);
    };

    Vector.prototype.angle = function() {
        var unit = this.unit();
        if (unit.y < 0) {
            return - Math.acos(unit.x);
        } else {
            return Math.acos(unit.x);
        }

    };

    Vector.prototype.to = function(vector) {
        return new Vector(vector.x-this.x, vector.y-this.y)
    };

    Vector.prototype.set = function(x,y) {
        this.x = x;
        this.y = y;
        return this;
    };

    Vector.direction = function(x1, y1, x2, y2) {
        return new Vector(x2-x1, y2-y1);
    }

    Vector.fromAngle = function(alpha) {
        return new Vector(Math.cos(alpha), Math.sin(alpha));
    }

    Vector.prototype.addAngle = function(alpha) {
        var length = this.length();
        alpha += this.angle();
        this.x = Math.cos(alpha)*length;
        this.y = Math.sin(alpha)*length;
        return this
    };

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = Vector;
    } else if (typeof define === 'function') {
        define(function() { return Vector; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.Vector = Vector;
    } else {
        this.Vector = Vector;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());
