(function() {
    "use strict";

    function Menu(option,x,y,game) {
        GrifGame.addEventCapabilities(this);
        this.option = option;
        this.index = 0;
        this.x = x;
        this.y = y;
        this.timeout = 100;
        var that = this;
        game.on("sceneChange", function() {
            that.timeout = 100;
        }, false, 100);

        this.on("update", function (e) {
            this.timeout -= e.dt;
            if (this.timeout>0) return
            var gamepad = e.inputs.gamepad(0);
            if (gamepad) {
                if (gamepad.axes[1]<-0.7) {
                    this.index--;
                    this.timeout= 100;
                } else if(gamepad.axes>0.7) {
                    this.index++;
                    this.timeout= 100;
                }
            }
            var v = (e.inputs.key[40] || 0) - (e.inputs.key[38] || 0);
            if (v) {
                this.index += v;
                this.timeout= 100;
                game.emit("playsound", {sound:"bip"});
            }
            this.index+=this.option.length;
            this.index%=this.option.length;
            if (e.inputs.key[13] || e.inputs.key[13] || (gamepad && (gamepad.buttons[2] || gamepad.buttons[3]))) {
                this.emit(this.option[this.index]);
                this.timeout= 100;
                game.emit("playsound", {sound:"select"});
            }
        });

        var alpha = 0
        this.on("draw", function(e) {
            e.ctx.textBaseline = "middle";
            e.ctx.textAlign = "center";
            e.ctx.fillStyle = "black";
            alpha+=0.1;
            for (var i = 0; i < this.option.length; i++) {
                if (this.index == i) {
                    e.ctx.font = "60pt Ubuntu";
                    e.ctx.fillText(this.option[i], x+Math.sin(alpha)*10,y+i*65+Math.cos(alpha)*5);
                }else {
                    e.ctx.font = "50pt Ubuntu";
                    e.ctx.fillText(this.option[i], x,y+i*65);
                }
            };
        });


    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = Menu;
    } else if (typeof define === 'function') {
        define(function() { return Menu; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.Menu = Menu;
    } else {
        this.Menu = Menu;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());