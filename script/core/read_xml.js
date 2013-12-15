(function() {

    function readXML(file, callBack) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function() {
            var parser = new DOMParser();
            var xml = parser.parseFromString(xhr.responseText, "text/xml");
            xml.getElementById = function(id,tag) {
                var nodes = this.getElementsByTagName(tag || "*");
                for (var i = nodes.length - 1; i >= 0; i--) {
                    if (nodes[i].getAttribute("id")==id) {
                        return nodes[i];
                    }
                }
                return null;
            };
            callBack(xml);
        });
        xhr.open("get",file+"?bust="+Date.now());
        xhr.send();
    }

    /*********************************************************\
        MULTI EXPORT
    \*********************************************************/
    
    if (typeof exports === 'object') {
        module.exports = readXML;
    } else if (typeof define === 'function') {
        define(function() { return readXML; });
    } else if (typeof GrifGame === 'object') {
        GrifGame.readXML = readXML;
    } else {
        this.readXML = readXML;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());
