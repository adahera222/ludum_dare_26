(function() {
    "use strict";

    function SceneGameplay(game) {
        this.active = false;
        this.name = "gameplay";
        var that = this;
        this.entities = new GrifGame.Pool(100, GrifGame.Entity);
        this.life = 5;
        this.shake = 0;
        this.score = new GrifGame.ScoreManager(game);
        

        game.on("sceneChange", function(e) {
            that.active = (e.newScene === that.name);
        });

        game.on("resetLevel", function(e) {
            that.reset();
            that.entities.create(function(entity) {
                GrifGame.entityBuilder(entity, "player", game, that );
                entity.pos.y = 320;
            });
            createEnemy();
            createEnemy();
        });

        game.on("looseLife", function() {
            that.shake = 500;
            that.life--;
            createEnemy()
            if (that.life<=0) {
                game.emit("sceneChange",{newScene:"gameover", score: that.score.value});
            }
        });

        game.on("enemyDestroyed", function(e) {
            game.emit("scorePlus", {value:e.enemy.score})
            createEnemy();
        });

        game.on("configureContext", function(e) {
            if (that.active) {
                if (that.shake>=0) {
                    e.ctx.translate(Math.random()*20-10, Math.random()*20-10)
                }
                that.shake -= e.dt;
            }
        })

        function createEnemy() {
            that.entities.create(function(entity) {
                GrifGame.entityBuilder(entity, "enemy"+Math.floor(Math.random()*4+2), game, that )
                entity.pos.set(1000,Math.random()*560+40);
            });
        }

        game.on("draw", function(e) {
            if (that.active) {
                //e.ctx.fillStyle = "rgba(20,20,80,0.3)";
                //e.ctx.fillRect(0,0,1000,700);
                
                e.ctx.fillStyle = "rgba(20,20,80,1)";
                e.ctx.fillRect(0,0,1000,700);
                e.ctx.fillStyle = "rgba(0,128,0,1)";
                e.ctx.beginPath();
                e.ctx.arc(-500,320,600, -1, 1);
                e.ctx.closePath();
                e.ctx.fill();
                e.ctx.fillStyle = "rgba(128,64,10,1)";
                e.ctx.beginPath();
                e.ctx.arc(-500,320,550, -1, 1);
                e.ctx.closePath();
                e.ctx.fill();
                that.entities.forEachLiving(function(entity) {
                    entity.emit("draw", e);
                });
                GrifGame.hud(e,that.life, that.score.value, that.score.ratio)
            }
        });

        game.on("update", function(e) {
            if (that.active) {
                that.entities.forEachLiving(function(entity) {
                    entity.emit("update", e);
                });
            }
            that.score.update(e);
        });
    }

    SceneGameplay.prototype.reset = function() {
        console.log("heyaaaaaaa")
        this.entities.forEachLiving(function(entity) {

            entity.kill();
        });
        this.life = 5;
        this.shake = 0;
    };

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = SceneGameplay;
    } else if (typeof define === 'function') {
        define(function() { return SceneGameplay; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.SceneGameplay = SceneGameplay;
    } else {
        this.SceneGameplay = SceneGameplay;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());