var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(posx, posy, size = 25) {
      var hitZoneSize = size;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(
        hitZoneSize,
        damageFromObstacle
      );
      sawBladeHitZone.x = posx;
      sawBladeHitZone.y = posy;
      game.addGameItem(sawBladeHitZone);

      var obstacleImage = draw.bitmap("img/sawblade.png");
      obstacleImage.x = -size;
      obstacleImage.y = -size;
      sawBladeHitZone.addChild(obstacleImage);
    }

    function createEnemy(posx, posy = 25) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = posx;
      enemy.y = groundY - posy;
      enemy.velocityX = -10;
      enemy.rotationalVelocity = 10;
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10);
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.shrink();
      };
      game.addGameItem(enemy);

      var obstacleImage = draw.bitmap("img/sawblade.png");
      obstacleImage.x = -25;
      obstacleImage.y = -25;
      enemy.addChild(obstacleImage);
    }
    createSawBlade(400, 300);
    createSawBlade(800, 300);
    createSawBlade(1200, 300, 50);
    createEnemy(1000);
    createEnemy(1400);
    for (var i = 0; i < 25; i++) {
      createEnemy(3000 + i * 5);
    }

    function startLevel() {
      // TODO 13 goes below here
      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
