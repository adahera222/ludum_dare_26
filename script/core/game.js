(function() {
    "use strict";

    function Game() {
        GrifGame.addEventCapabilities(this);
        this.loadCanvas();
        this.input = new GrifGame.InputManager();
        this.load_scenes();
        this.frameIndex = 0;
        this.addSpecialEmiter("draw", function(callback, e) {
            e.ctx.save();
            this.emit("configureContext", e);
            callback();
            e.ctx.restore();
        });
    
    }

    Game.prototype.loadCanvas = function(id) {
        this.canvas = document.getElementById('game');
        this.width = this.canvas.width = 960;
        this.height = this.canvas.height = 640;
        this.context = this.canvas.getContext("2d");

        var that = this;
        function resize() {
            var gameArea = document.getElementById("gameArea");
            gameArea.style.width = 960/640*window.innerHeight+"px";
            gameArea.style.height = window.innerHeight+"px";
        }
        resize();
        window.addEventListener("resize", resize);
    };

    Game.prototype.load_scenes = function() {
        this.scenes = {};
        this.scenes.gameplay = new GrifGame.SceneGameplay(this);
        this.scenes.menu = new GrifGame.SceneMenu(this);
        this.scenes.gameover = new GrifGame.SceneGameOver(this);
        this.scenes.share = new GrifGame.SceneShare(this);
    };


    Game.prototype.play = function(scene) {
        

        var that = this;
        var lastFrame = Date.now();
        function mainloop (timestamp) {
            window.requestAnimationFrame(mainloop);
            timestamp = Date.now();
            var dt = timestamp-lastFrame;
            lastFrame = timestamp;
            var params = {
                dt: dt,
                frameIndex: that.frameIndex,
                inputs: that.input,
                ctx: that.context,
                canvas: that.canvas
            };
            if (dt<=0 || dt>50) return;
            that.emit("update", params);
            that.emit("draw", params);
        }
        GrifGame.readXML("data/entities.xml", function(file) {
            //console.log(file)
            GrifGame.entitiesConfig = file;
            mainloop(Date.now());
            that.emit("sceneChange", {newScene: scene});
        });
        
    };

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = Game;
    } else if (typeof define === 'function') {
        define(function() { return Game; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.Game = Game;
    } else {
        this.Game = Game;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());