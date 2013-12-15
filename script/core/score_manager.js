(function() {
    "use strict";

    function ScoreManager(game) {
        this.value = 0;
        this.timerCombo = 0;
        this.combo = 1;
        var max = 2000;
        this.ratio= 0

        var that = this;
        game.on("resetLevel", function() {
            that.value = 0;
            that.timerCombo = 0;
            that.combo = 1;
        });

        game.on("scorePlus", function(e) {
            var value = (e.value || 10);
            if (that.timerCombo>0) {
                value *= that.combo;
            } else {
                that.combo = 1;
            }
            that.combo +=1;
            that.timerCombo = max;
            that.value += value;
            that.ratio=1;
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