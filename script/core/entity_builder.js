(function() {
    "use strict";

    function entityBuilder(entity, type, game, scene) {

        var entityConfig = GrifGame.entitiesConfig.getElementById(type);
        if (!entityConfig) throw new Error("Cannot found entity "+type);
        entity.tags.push(entityConfig.getAttribute("id"));
        if (entityConfig.getAttribute("tags")) {
            entity.tags  = entity.tags.concat(entityConfig.getAttribute("tags").split(" "));
        }
        var extending = entityConfig.querySelectorAll("extend");
        for (var i = extending.length - 1; i >= 0; i--) {
            entityBuilder(entity, extending[i].getAttribute("value"), game, scene);
        }
        var modules = entityConfig.querySelectorAll("module");
        for (i = 0 ; i < modules.length; i++) {
            addModule(entity, parseModule(modules[i]), game, scene);
        }
    }

    function parseModule(module) {
        var params = {
                value: module.getAttribute("value"),
                speed: module.getAttribute("speed"),
                offsetX: parseFloat(module.getAttribute("offsetX")),
                offsetY: parseFloat(module.getAttribute("offsetY")),
                radius: parseFloat(module.getAttribute("radius")) || 1,
                timer: parseFloat(module.getAttribute("timer")),
                type: module.getAttribute("type"),
                tags: module.getAttribute("tags"),
                color: module.getAttribute("color")
        };
        if (isNaN(params.offsetX)) {
            params.offsetX = 0;
        }
        if(isNaN(params.offsetY)) {
            params.offsetY = 0;
        }
        if(params.tags) {
            params.tags = params.tags.split(" ");
        } else {
            params.tags = [];
        }
        var keys = module.querySelectorAll("map");
        params.scheme = {};
        for (var j = keys.length - 1; j >= 0; j--) {
            params.scheme[keys[j].getAttribute("function")] = keys[j].getAttribute("value");
        }
        return params
    }

    function addModule(entity, module, game, scene) {
        switch (module.type) {
            case "destroy": 
                entity.on("destroy", function() {
                    this.kill();
                }, false, -1)
            break;
            case "kinetic": 
                GrifGame.addKinetic(entity);
            break;
            case "control": 
                GrifGame.addControl(entity);
            break;
            case "circle": 
                GrifGame.addCircle(entity, module.color);
            break;
            case "inertia": 
                GrifGame.addInertia(entity, parseFloat(module.value));
            break;
            case "radius": 
                entity.radius = parseFloat(module.radius);
            break;
            case "collision action":
                GrifGame.addCollisionAction(entity, module.scheme);
            break;
            case "collision":
                GrifGame.addColision(entity, module.tags, scene.entities);
            break;
            case "movement":
                GrifGame.addMovement(entity, module.value, module.radius, module.speed)
            break;
            case "radius--":
                entity.on("collision", function(e) {
                    entity.radius-=module.value*e.dt/16;
                    if (entity.radius<=15) {
                        game.emit("enemyDestroyed", {enemy:this})
                        entity.emit("destroy");
                    }
                }, false, 100);
            break;
            case "playerBoundary":
                GrifGame.addPlayerBoundary(entity)
            break;
            case "earthBreaker":
                entity.on("update", function() {
                    if (this.pos.x<0) {
                        game.emit("looseLife");
                        this.kill("destroy");
                    }
                });
            break;
            case "trails":
                GrifGame.addTrails(entity, parseFloat(module.value), module.color);
            break;
            case "score":
                entity.score = parseFloat(module.value);
            break;
        } 
    }


    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = entityBuilder;
    } else if (typeof define === 'function') {
        define(function() { return entityBuilder; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.entityBuilder = entityBuilder;
    } else {
        this.entityBuilder = entityBuilder;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());