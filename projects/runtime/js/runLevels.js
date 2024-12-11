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

    function createReward(posx, posy, value = 10) {
      var collectableSprite = draw.circle(10, "#ffF9f0", "#ffF9f0", 1);
      var collectable = game.createGameItem("reward", 25);
      collectable.addChild(collectableSprite);
      collectable.x = posx;
      collectable.y = groundY - posy;
      collectable.velocityX = -1.5;
      collectable.onPlayerCollision = function () {
        game.increaseScore(100);
        collectable.shrink();
      };

      collectable.onProjectileCollision = function () {
        collectable.shrink();
      };
      game.addGameItem(collectable);
    }

    function createMarker(posx) {
      var markerSprite = draw.circle(50, "#FFFFFF", "#FFFFFF", 1);
      var marker = game.createGameItem("marker", 25);
      marker.addChild(markerSprite);
      marker.x = posx;
      marker.y = groundY - 20;
      marker.velocityX = -1.5;
      marker.onPlayerCollision = function () {
        marker.shrink()
        startLevel();
      };
      marker.onProjectileCollision = function () {
        marker.shrink()
        startLevel();
      };
      game.addGameItem(marker);
    }

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level["gameItems"];
      for (
        var gameObjectIndex = 0;
        gameObjectIndex < levelObjects.length;
        gameObjectIndex++
      ) {
        var currentObject = levelObjects[gameObjectIndex];
        if (currentObject.type == "sawblade") {
          createSawBlade(currentObject.x, currentObject.y);
        } else if (currentObject.type == "enemy") {
          createEnemy(currentObject.x, currentObject.y);
        } else if (currentObject.type == "reward") {
          createReward(currentObject.x, currentObject.y);
        } else if (currentObject.type == "marker") {
          createMarker(currentObject.x);
        }
      }
    }

    //////////////////////////////////////////////
    // DO NOT EDIT CODE BELOW HERE
    //////////////////////////////////////////////
    if (++currentLevel === levelData.length) {
      startLevel = () => {
        console.log("Congratulations!");
      };
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
