(function() {
    "use strict";
    
    function SoundManager() {
        this.queue = [];
        this.complet = 0;
        this.error = 0;

        this.addToQueue = function(item,src) {
            if (this.isSet(item)) {
                this.queue.push([item,src]);
            } else {
                console.error(item+" is allready set in SoundManager");
            }
        }

        this.downloadSound = function(callback) {
            var that = this;
            if (this.queue.length === 0) {console.warn("No Sound to download.")}
            for (var i = 0; i<this.queue.length; i++) {
                var file = new Howl({
                    urls: [this.queue[i][1]+".wav", this.queue[i][1]+".ogg"],
                    onload: function() {
                        that.complet++;
                        if(that.isDone()) {
                            callback();
                        }
                    },
                    onloaderror: function(error) {
                        that.error++;
                        if(that.isDone()) {
                            callback();
                        }
                    }
                });
                this[this.queue[i][0]] = file;
            };
        }

        this.isDone = function() {
            return (this.queue.length == this.complet + this.error);
        }

        this.isSet = function(item) {
            if (item == "isSet" || item == "isDone" || item == "downloadImage" || item == "addToQueue" || item == "queue" || item == "complet" || item == "error") {return false}
            for (var i = this.queue.length - 1; i >= 0; i--) {
                if (this.queue[i][0] == item) {return false;}
            };
            return true;
        }
    }


    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = SoundManager;
    } else if (typeof define === 'function') {
        define(function() { return SoundManager; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.SoundManager = SoundManager;
    } else {
        this.SoundManager = SoundManager;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());

