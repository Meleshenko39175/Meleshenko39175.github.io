var init = function (window) {
  "use strict";
  var draw = window.opspark.draw,
    physikz = window.opspark.racket.physikz,
    app = window.opspark.makeApp(),
    canvas = app.canvas,
    view = app.view,
    fps = draw.fps("#000");

  window.opspark.makeGame = function () {
    window.opspark.game = {};
    var game = window.opspark.game;

    ////////////////////////////////////////////////////////////
    ///////////////// PROGRAM SETUP ////////////////////////////
    ////////////////////////////////////////////////////////////

    // TODO 1 : Declare and initialize our variables

    var circle;
    var circles = [];

    // TODO 2 : Create a function that draws a circle

    function drawCircle() {
      circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
      physikz.addRandomVelocity(circle, canvas);
      view.addChild(circle);
      circles.push(circle);
    }

    // TODO 3 / 7 : Call the drawCircle() function

    var totalCircles = 100;
    for (
      var newcircleindex = 0;
      newcircleindex < totalCircles;
      newcircleindex++
    ) {
      drawCircle();
    }

    ////////////////////////////////////////////////////////////
    ///////////////// PROGRAM LOGIC ////////////////////////////
    ////////////////////////////////////////////////////////////

    /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
    function update() {
      // TODO 4 : Update the circle's position //

      //Deleted

      // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
      //Deleted

      // TODO 9 : Iterate over the array

      for (var index = 0; index < circles.length; index++) {
        var currentCircle = circles[index];
        physikz.updatePosition(currentCircle);
        game.checkCirclePosition(currentCircle);
      }
    }

    /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
    game.checkCirclePosition = function (circle) {
      // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
      var circleLeft = circle.x - circle.radius;
      var circleRight = circle.x + circle.radius;
      var circleUp = circle.y - circle.radius;
      var circleDown = circle.y + circle.radius;
      if (circleLeft > canvas.width) {
        circle.x = -circle.radius;
      }
      if (circleUp > canvas.height) {
        circle.y = -circle.radius;
      }

      // TODO 6 : YOUR CODE STARTS HERE //////////////////////
      if (circleRight < 0) {
        circle.x = canvas.width + circle.radius;
      }

      if (circleDown < 0) {
        circle.y = canvas.height + circle.radius;
      }

      // YOUR TODO 6 CODE ENDS HERE //////////////////////////
    };

    /////////////////////////////////////////////////////////////
    // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
    /////////////////////////////////////////////////////////////

    view.addChild(fps);
    app.addUpdateable(fps);

    game.circle = circle;
    game.circles = circles;
    game.drawCircle = drawCircle;
    game.update = update;

    app.addUpdateable(window.opspark.game);
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = init;
}
