$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the drawGrid() function call below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can help you determine specific x any y values throughout the game
     * Comment the function call out to remove the grid
     */

    //drawGrid();

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)

    createPlatform(150, 650, 200, 100);
    createPlatform(350, 550, 200, 200);
    createPlatform(650, 300, 100, 300);
    createPlatform(950, 650, 100, 100);
    createPlatform(750, 550, 100, 50);
    createPlatform(950, 450, 100, 50);
    createPlatform(1150, 450, 200, 50);
    createPlatform(750, 350, 100, 50);
    createPlatform(550, 300, 100, 50);
    createPlatform(300, 300, 100, 50);
    createPlatform(200, 0, 100, 350);

    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

    createCollectable("database", 250, 600, 0, 0);
    createCollectable("database", 200, 600, 0, 0);
    createCollectable("database", 400, 500, 0, 0);
    createCollectable("database", 450, 500, 0, 0);
    createCollectable("database", 975, 600, 0, 0);
    createCollectable("database", 775, 500, 0, 0);
    createCollectable("database", 975, 400, 0, 0);
    createCollectable("max", 1175, 400, 0, 0);
    createCollectable("max", 1225, 400, 0, 0);
    createCollectable("max", 1275, 400, 0, 0);
    createCollectable("database", 775, 300, 0, 0);
    createCollectable("kennedi", 325, 250, 0, 0);

    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)

    createCannon("right", 500, 5000, 50, 25);
    createCannon("left", 100, 1500, 100, 50);
    createCannon("right", 700, 5500, 100, 100);
    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
