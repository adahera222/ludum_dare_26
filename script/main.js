(function () {
    window.GrifGame = {};

    window.addEventListener("load", function() {
        game = new GrifGame.Game();
        game.play("menu");
    });
    

})();