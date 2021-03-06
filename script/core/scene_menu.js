(function() {
    "use strict";

    function SceneMenu(game) {
        GrifGame.addEventCapabilities(this);
        this.active = false;
        this.name   = "menu";
        this.menu   = new GrifGame.Menu(["play", "vote", "credits", "audio: on"], 480,390,game)
        this.menu.on("play", function() {
            game.emit("sceneChange",{newScene:"gameplay"});
            game.emit("resetLevel");
        });
        this.menu.on("vote", function() {
            window.location.replace("http://www.ludumdare.com/compo/");
        });
        this.menu.on("credits", function() {
            window.location.replace("http://grifdail.fr/");
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
            that.menu.timeout = 100;
        });

        game.on("draw", function(e) {
            if (that.active) {
                e.ctx.fillStyle = "#2F01E6";
                e.ctx.fillRect(0,0,960,640)
                that.menu.emit("draw", e);
                e.ctx.font = "70pt Ubuntu";
                e.ctx.fillText("The Last Stand",480,200)
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
        module.exports = SceneMenu;
    } else if (typeof define === 'function') {
        define(function() { return SceneMenu; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.SceneMenu = SceneMenu;
    } else {
        this.SceneMenu = SceneMenu;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());