(function() {

    function Color (red,green,blue,alpha) {
        this.red = red;
        this.blue = blue;
        this.green = green;
        this.alpha = (alpha || 1);
    }

    Color.prototype.toString = function() {
        return "rgba("+Math.floor(this.red) +
            "," + Math.floor(this.green) +
            "," + Math.floor(this.blue) +
            "," +this.alpha + ")";
    };

    Color.prototype.addRed = function(value) {
        this.red += value;
        if (this.red<0) {
            this.red = 0;
        } else if (this.red >255){
            this.red = 255;
        }
        return this;
    };

    Color.prototype.addGreen = function(value) {
        this.green += value;
        if (this.green<0) {
            this.green = 0;
        } else if (this.green >255){
            this.green = 255;
        }
        return this;
    };

    Color.prototype.addBlue = function(value) {
        this.blue += value;
        if (this.blue<0) {
            this.blue = 0;
        } else if (this.blue >255){
            this.blue = 255;
        }
        return this;
    };

    Color.prototype.lighter = function(value) {
        this.addRed(value);
        this.addGreen(value);
        this.addBlue(value);
        return this;
    };

    Color.prototype.darker = function(value) {
        this.addRed(-value);
        this.addGreen(-value);
        this.addBlue(-value);
        return this;
    };

    Color.prototype.set = function(red, green, blue, alpha) {
        this.red = red;
        this.blue = blue;
        this.green = green;
        this.alpha = (alpha || this.alpha);
        return this;
    };

    Color.prototype.randomize = function(strenght) {
        this.addRed(Math.random()*strenght-strenght/2);
        this.addGreen(Math.random()*strenght-strenght/2);
        this.addBlue(Math.random()*strenght-strenght/2);
        return this;
    };

    Color.prototype.fadeTo = function(color, percent) {
        this.addRed((color.red-this.red)*percent);
        this.addGreen((color.green-this.green)*percent);
        this.addBlue((color.blue-this.blue)*percent);
    };

    Color.random = function() {
        var color = new Color(0,0,0);
        color.red = Math.floor(Math.random()*255);
        color.blue = Math.floor(Math.random()*255);
        color.green = Math.floor(Math.random()*255);
        color.alpha = Math.random();
        return color;
    };

    if (typeof exports === 'object') {
        module.exports = Color;
    } else if (typeof define === 'function') {
        define(function() { return Color; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.Color = Color;
    } else {
        this.Color = Color;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());
