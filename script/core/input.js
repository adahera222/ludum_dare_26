(function() {
    "use strict";

    function InputManager() {
        GrifGame.addEventCapabilities(this);
        this.gamepadManager = new Gamepad();
        this.hasGamepad = this.gamepadManager.init();
        this.key = {};

        this.gamepad = function(i) {
            return this.gamepadManager.gamepads[i] || false;
        }

        var that = this;
        window.addEventListener("keydown", function(e) {
            var key = e.keyCode
            if (!that.key[key]) {
                that.key[key] = true;
                that.emit("keyPressed", key);
            }
        });
        window.addEventListener("keyup", function(e) {
            var key = e.keyCode
            if (that.key[key]) {
                that.key[key] = false;
                that.emit("keyReleased", key);
            }
        });
    }


    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = InputManager;
    } else if (typeof define === 'function') {
        define(function() { return InputManager; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.InputManager = InputManager;
    } else {
        this.InputManager = InputManager;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());