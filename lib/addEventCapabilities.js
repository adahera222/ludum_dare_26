(function() {
    "use strict";

    var addEventCapabilities = function (object) {
        object = object || {};

        object.listenersFor = {};
        object.listenersCount = 0;
        object.specialEmiter = {};

        object.addEventListener = function (eventName, callback, once, priority) {
            priority = (isNaN(priority) ? 0 : priority);
            var id = object.listenersCount++;
            if (!object.listenersFor[eventName]) {
                object.listenersFor[eventName] = [];
            }
            object.listenersFor[eventName].push({id:id,callback:callback, priority:priority, once: once});
            object.listenersFor[eventName].sort(function(a,b) {
                return (b.priority-a.priority);
            })
            return id;
        };

        object.removeListener = function (id) {
            for (var eventName in object.listenersFor) {
                var listeners = object.listenersFor[eventName];
                for (var i = listeners.length - 1; i >= 0; i--) {
                    if (listeners[i].id == id) {
                        break;
                    }
                    i = -1;
                }
                if (i>=0) {
                    listeners.splice(i,1);
                    return;
                }
            }
        };

        object.removeAllListenerFor = function(eventName) {
            if (!object.listenersFor[eventName]) {
                object.listenersFor[eventName] = [];
            } else {
                object.listenersFor[eventName].length = 0;
            }
        };

        object.removeAllListener = function() {
            object.listenersFor = {};
            object.listenersCount = 0;
        };

        object.emit = function (eventName, eventParams) {
            var listeners   = object.listenersFor[eventName] || [];
            var actions = [];

            var callback = function() {
                for (var i=0; i < listeners.length; i++) {
                    try {
                        var result = listeners[i].callback.call(object, eventParams);
                        if (result === false) {
                            return false;
                        } else if (typeof result === "function") {
                            actions.push(result);
                        }
                    } catch (e) {
                        console.error('Error on event '+eventName);
                        throw(e);
                    }
                }
                for (i = actions.length - 1; i >= 0; i--) {
                    actions[i]();
                }
                return true;
            };
            if (!!this.specialEmiter[eventName]) {
                this.specialEmiter[eventName].call(object, callback, eventParams);
            } else {
                callback();
            }

            return eventParams;
        };


        object.addSpecialEmiter = function (eventName, callback) {
            this.specialEmiter[eventName] = callback;
        };

        object.removeSpecialEmiter = function(eventName) {
            delete this.specialEmiter[eventName];
        };

        object.on = object.addEventListener;

        return object;

    };

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = addEventCapabilities;
    } else if (typeof define === 'function') {
        define(function() { return addEventCapabilities; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.addEventCapabilities = addEventCapabilities;
    } else {
        this.addEventCapabilities = addEventCapabilities;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());

