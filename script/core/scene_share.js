(function() {
    "use strict";

    function SceneShare(game) {
        this.active = false;
        this.name   = "share";

        var that = this

        game.canvas.addEventListener("click", function(e) {
            if (that.link) {
                window.open(that.link);
                that.link = null;
                game.emit("sceneChange", {newScene: "gameover"})
            }
        });

        game.on("sceneChange", function(e) {
            that.active = (e.newScene === that.name);
            if (e.score || e.score===0) {
                that.score = e.score;
            } 
            that.link = e.link
        });

        game.on("draw", function(e) {
            if (that.active) {
                e.ctx.fillStyle = "#0006E6";
                e.ctx.fillRect(0,0,960,640)
                e.ctx.textBaseline = "middle";
                e.ctx.textAlign = "center";
                e.ctx.fillStyle = "black";
                e.ctx.font = "50pt Ubuntu, Arial, sans-serif";
                e.ctx.fillStyle = "#000000";
                e.ctx.fillText("Click on the screen",480,300);
                e.ctx.fillText("to share you score",480,360);
            }
        });
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = SceneShare;
    } else if (typeof define === 'function') {
        define(function() { return SceneShare; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.SceneShare = SceneShare;
    } else {
        this.SceneShare = SceneShare;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());