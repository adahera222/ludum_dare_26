(function() {
    "use strict";

    function ScoreManager(game, scene) {
        this.value = 0;
        this.timerCombo = 0;
        this.combo = 1;
        var max = 2000;
        this.ratio= 0;
        this.level=0

        var that = this;
        game.on("resetLevel", function() {
            that.value = 0;
            that.timerCombo = 0;
            that.combo = 1;
            that.level = 0;
        });

        game.on("scorePlus", function(e) {
            var value = (e.value || 10);
            if (that.timerCombo>0) {
                value *= that.combo;
            } else {
                that.combo = 1;
            }
            if (that.combo==1) game.emit("playsound", {sound:"c1"});
            if (that.combo==2) game.emit("playsound", {sound:"c2"});
            if (that.combo==3) game.emit("playsound", {sound:"c3"});
            if (that.combo>=4) game.emit("playsound", {sound:"c4"});
            that.combo +=1;
            that.timerCombo = max;
            that.value += value;
            that.ratio=1;
            if (that.value>1200 && that.level===0) {
                that.level = 1;
                game.emit("addEnemy");
            } else if (that.value>3000 && that.level===1) {
                that.level = 2;
                game.emit("addEnemy");
            } else if (that.value>8000 && that.level===2) {
                that.level = 3;
                game.emit("addEnemy");
            }else if (that.value>15000 && that.level===3) {
                that.level = 4;
                game.emit("addEnemy");
            } else if (that.value>((that.level-4)*10000 +20000 )&& that.value>15000) {
                that.level +=1;
                game.emit("addEnemy");
            }
        });

        this.update = function(e) {
            this.timerCombo-= e.dt;
            this.ratio = this.timerCombo/max
        }
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = ScoreManager;
    } else if (typeof define === 'function') {
        define(function() { return ScoreManager; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.ScoreManager = ScoreManager;
    } else {
        this.ScoreManager = ScoreManager;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());