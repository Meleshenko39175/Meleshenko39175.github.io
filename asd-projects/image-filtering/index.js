// This is a small program. There are only two sections.

const FilterButtonYOffset = 20;

let selectedFilter = 0;
let ActiveFilterList = [];
let applyToBackground = false;
const FilterList = [
  ["Reddify", reddify, true],
  ["Increase Green By Blue", increaseGreenByBlue, true],
  ["Decrease Blue", decreaseBlue, true],
];

// This first section is what runs as soon as the page loads.
$(document).ready(function () {
  loadFilterList();
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

function loadFilterList() {
  var htmlBody = $("body");
  var filterListDisplay = $("<div>")
    .css("top", 400)
    .addClass("FilterList")
    .appendTo(htmlBody);

  var applyToBackgroundDisplay = $("<button>")
    .attr("id", "applyToBackground")
    .appendTo(filterListDisplay)
    .css("top", 50)
    .css("left", 500)
    .css("background", "yellow")
    .on("click", toggleApplyBackground);

  toggleApplyBackground();

  var activeFiltersDisplay = $("<div>")
    .css("top", -50)
    .css("left", 500)
    .addClass("ActiveFilterList")
    .appendTo(htmlBody);

  for (var filterIndex = 0; filterIndex < FilterList.length; filterIndex++) {
    var currentFilter = FilterList[filterIndex];
    var filterButton = $("<button>")
      .text(currentFilter[0])
      .attr("id", "filter" + filterIndex)
      .appendTo(filterListDisplay)
      .css("left", 20)
      .css("top", FilterButtonYOffset * filterIndex)
      .css("background", "white")
      .on("click", selectFilter);
  }
}

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  $(".ActiveFilterList").empty();
  ActiveFilterList = [];
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  if (applyToBackground) {
    applyFilter(FilterList[selectedFilter][1]);
  } else {
    applyFilterNoBackground(FilterList[selectedFilter][1]);
  }
  createAppliedFilterLog(FilterList[selectedFilter][0]);
  // do not change the below line of code
  render($("#display"), image);
}

function toggleApplyBackground() {
  applyToBackground = !applyToBackground;
  if (applyToBackground) {
    $("#applyToBackground").text("Apply Filter To Background: YES");
  } else {
    $("#applyToBackground").text("Apply Filter To Background: NO");
  }
}

function createAppliedFilterLog(filterName) {
  ActiveFilterList.push(filterName);
  var logString = String("Added Filter: " + filterName);
  if (applyToBackground === false) {
    logString = logString + " (Not Applied to Background)";
  }
  var newLine = $("<p>").text(logString).appendTo($(".ActiveFilterList"));
}

function selectFilter(event) {
  for (var index = 0; index < FilterList.length; index++) {
    var currentObjectString = String("#filter" + index);
    var currentObject = $(currentObjectString);
    //currentObject.localeCompare(String("#" + event.target.id)) === 0
    if (
      currentObjectString.localeCompare(String("#" + event.target.id)) === 0
    ) {
      currentObject.css("background", "red");
      selectedFilter = index;
    } else {
      currentObject.css("background", "white");
    }
  }
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

//Applies a specific filter to the screen
function applyFilter(filterFunction) {
  for (let imageRow = 0; imageRow < image.length; imageRow++) {
    for (
      let imageColumn = 0;
      imageColumn < image[imageRow].length;
      imageColumn++
    ) {
      let rgbString = image[imageRow][imageColumn];
      let rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers, [imageRow, imageColumn]);
      rgbString = rgbArrayToString(rgbNumbers);
      image[imageRow][imageColumn] = rgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function

//Applies a filter function without affecting the background
function applyFilterNoBackground(filterFunction) {
  var backgroundColor = rgbStringToArray(image[0][0]);
  for (let imageRow = 0; imageRow < image.length; imageRow++) {
    for (
      let imageColumn = 0;
      imageColumn < image[imageRow].length;
      imageColumn++
    ) {
      let rgbString = image[imageRow][imageColumn];
      let rgbNumbers = rgbStringToArray(rgbString);
      if (
        rgbNumbers[RED] != backgroundColor[RED] &&
        rgbNumbers[GREEN] != backgroundColor[GREEN] &&
        rgbNumbers[BLUE] != backgroundColor[BLUE]
      ) {
        filterFunction(rgbNumbers, [imageRow, imageColumn]);
      }
      rgbString = rgbArrayToString(rgbNumbers);
      image[imageRow][imageColumn] = rgbString;
    }
  }
}

// TODO 5: Create the keepInBounds function

//Corrects a numbers value within RGB limitations
function keepInBounds(value) {
  return value < 0 ? 0 : value > 255 ? 255 : value;
}

// TODO 3: Create reddify function

//Sets the RED index of RGB valuse to 200
function reddify(rgbData, parameters) {
  rgbData[RED] = 200;
}

// TODO 6: Create more filter functions

function decreaseBlue(rgbData, parameters) {
  rgbData[BLUE] = keepInBounds(rgbData[BLUE] - 50);
}

function increaseGreenByBlue(rgbData, parameters) {
  rgbData[GREEN] = keepInBounds(rgbData[GREEN] + rgbData[BLUE]);
}

// CHALLENGE code goes below here
