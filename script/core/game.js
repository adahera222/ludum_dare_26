(function() {
    "use strict";

    function Game() {
        GrifGame.addEventCapabilities(this);
        this.loadCanvas();
        this.input = new GrifGame.InputManager();
        this.sound = new GrifGame.SoundManager();
        this.load_scenes();
        this.frameIndex = 0;
        this.addSpecialEmiter("draw", function(callback, e) {
            e.ctx.save();
            this.emit("configureContext", e);
            callback();
            e.ctx.restore();
        });

        this.on("playsound", function(e) {
            var sound = this.sound[e.sound];
            if (sound) {
                sound.play();
            }
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
        this.scenes.share = new GrifGame.ScenePause(this);
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
                dt: dt*0.95,
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
            that.sound.addToQueue("select","assets/s")
            that.sound.addToQueue("c1","assets/c1")
            that.sound.addToQueue("c2","assets/c2")
            that.sound.addToQueue("c3","assets/c3")
            that.sound.addToQueue("c4","assets/c4")
            that.sound.addToQueue("explode","assets/e")
            that.sound.addToQueue("bip","assets/b")
            that.sound.addToQueue("go","assets/go")

            GrifGame.entitiesConfig = file;
            that.sound.downloadSound(function () {
                mainloop(Date.now());
                that.emit("sceneChange", {newScene: scene});
            });
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