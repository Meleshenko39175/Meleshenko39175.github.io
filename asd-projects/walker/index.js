/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  // Game Item Objects
  var keysdown = {
    37: false,
    38: false,
    39: false,
    40: false,
  }
  var walker = {
    position_x: 0,
    position_y: 0,
    velocity_x: 0,
    velocity_y: 0,
    movespeed: 5,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveWalker()
    repositionGameItem()
    wallCollision()
    redrawGameItem()

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    keysdown[event.which] = true
  }

  function handleKeyUp(event)
  {
    keysdown[event.which] = false
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem()
  {
    walker.position_x += walker.velocity_x * walker.movespeed;
    walker.position_y += walker.velocity_y * walker.movespeed;
  }

  function redrawGameItem()
  {
    $("#walker").css("left", walker.position_x);
    $("#walker").css("top", walker.position_y);
  }

  function wallCollision()
  {
    if (walker.position_x > $("#board").width() - $("#walker").width())
    {
      walker.position_x = $("#board").width() - $("#walker").width();
    }
    else if (walker.position_x < 0)
    {
      walker.position_x = 0;
    }

    if (walker.position_y > $("#board").height() - $("#walker").height())
    {
      walker.position_y = $("#board").height() - $("#walker").height();
    }
    else if (walker.position_y < 0)
    {
      walker.position_y = 0;
    }
  }

  function getAxis(negativeKey, positiveKey)
  {
    if (negativeKey && !positiveKey)
    {
      return -1;
    }
    else if (positiveKey && !negativeKey)
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }

  function moveWalker()
  {
    walker.velocity_x = getAxis(keysdown[KEY.LEFT], keysdown[KEY.RIGHT]);
    walker.velocity_y = getAxis(keysdown[KEY.UP], keysdown[KEY.DOWN]);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
