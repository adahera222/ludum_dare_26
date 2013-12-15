(function() {
    "use strict";

    function SceneGameOver(game) {
        this.active = false;
        this.name   = "gameover";
        this.menu   = new GrifGame.Menu(["retry", "menu", "share on twitter", "share on facebook"], 480,350)
        this.menu.on("retry", function() {
            game.emit("sceneChange",{newScene:"gameplay"});
            game.emit("resetLevel");
        });
        this.score = 0;
        this.menu.on("menu", function(e) {
            game.emit("sceneChange",{newScene:"menu"});
        });
        this.menu.on("share on twitter", function(e) {
            var link = "http://twitter.com/home?status=I've%20scored%20"+that.score+"%20points%20on%20%22The%20Last%20Stand%22.%20http://grifdail.fr/Game/ludum_dare_28"
            game.emit("sceneChange",{newScene:"share", link: link});
        });
        this.menu.on("share on facebook", function(e) {
            var link = "http://www.facebook.com/sharer/sharer.php?s=100&p[url]=http://grifdail.fr/Game/ludum_dare_28&p[images][0]=&p[title]=The%20Last%20Stand&p[summary]=I've%20scored%20"+that.score+"%20point%20on%20%22The%20Last%20Stand%22.%20"
            game.emit("sceneChange",{newScene:"share", link: link});
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
                e.ctx.fillText("Game Over",480,100);
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
        module.exports = SceneGameOver;
    } else if (typeof define === 'function') {
        define(function() { return SceneGameOver; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.SceneGameOver = SceneGameOver;
    } else {
        this.SceneGameOver = SceneGameOver;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());