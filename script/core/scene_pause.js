(function() {
    "use strict";

    function ScenePause(game) {
        this.active = false;
        this.name   = "pause";
        this.menu   = new GrifGame.Menu(["continue", "restart", "exit", "audio: on"], 480,350, game)
        this.menu.on("restart", function() {
            game.emit("sceneChange",{newScene:"gameplay"});
            game.emit("resetLevel");
        });
        this.score = 0;
        this.menu.on("exit", function(e) {
            game.emit("sceneChange",{newScene:"menu"});
        });
        this.menu.on("continue", function() {
            game.emit("sceneChange",{newScene:"gameplay"});
        });
        this.menu.on("audio: on", function() {
            this.option[3] = "audio: off";
            this.timeout = 100;
            Howler.mute()
        });
        this.menu.on("audio: off", function() {
            this.option[3] = "audio: on";
            this.timeout = 100;
            Howler.unmute()
        });
        

        var that = this

        game.on("sceneChange", function(e) {
            that.active = (e.newScene === that.name);
            if (e.score || e.score===0) {
                that.score = e.score;
            } 
        });

        game.on("draw", function(e) {
            if (that.active) {

                e.ctx.fillStyle = "#2F01E6";
                e.ctx.fillRect(0,0,960,640)
                that.menu.emit("draw", e);
                e.ctx.font = "70pt Ubuntu, Arial, sans-serif";
                e.ctx.fillText("Pause",480,100);
                 e.ctx.font = "50pt Ubuntu, Arial, sans-serif";
                e.ctx.fillText("Score: "+that.score+"pts",480,200);
            }
        });

        game.on("update", function(e) {
            if (that.active) {
                that.menu.emit("update", e);
            }
        });
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = ScenePause;
    } else if (typeof define === 'function') {
        define(function() { return ScenePause  ; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.ScenePause = ScenePause   ;
    } else {
        this.ScenePause = ScenePause   ;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());