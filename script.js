let go = false;
let step = 0;
let path = 0;
let dotSize = 1;
let colourStart = 160;
let colour = colourStart;
let colourRange = 60;
let bigSaturation = 0;
let littleSaturation = 0;
let brightness = 100;
let bigAlpha = 0.03;
let littleAlpha = 0.16;

let xPadding = 0;
let yPadding = 0;
const yShift = -600;
const xShift = -300;
const imageWidth = 1000;
const imageHeight = 1000;
const maxWidth = 500;
const maxHeight = 500;
let scale = 1;
let speed = 20;
let paths = [];

// multiple graphics with text
// https://github.com/processing/p5.js/wiki/Global-and-instance-mode

let pathName = "pathname";

let map;

function preload() {
  // Get the most recent earthquake in the database
  loadJSON("./paths/all/plots1.json", "json", addData);
  loadJSON("./paths/all/plots2.json", "json", addData);
  loadJSON("./paths/all/plots3.json", "json", addData);
  loadJSON("./paths/all/plots4.json", "json", addData);
  loadJSON("./paths/all/plots5.json", "json", addData);
  loadJSON("./paths/all/plots6.json", "json", addData);
  loadJSON("./paths/all/plots7.json", "json", addData);
  loadJSON("./paths/all/plots8.json", "json", addData);

  map = loadImage("images/map-01.png");
}

function addData(data) {
  paths.push(...shuffle(data.paths));
  go = true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  width > height ? (scale = height / maxHeight) : (scale = width / maxWidth);
  xPadding = (width - scale * maxWidth) / 2;
  yPadding = (height - scale * maxHeight) / 2;
  colorMode(HSB);
  background(0, 0, 5.5);
  noStroke();
  frameRate(60);

  // console.log("paths", paths);
  // blendMode(EXCLUSION);
  // image(
  //   map,
  //   xPadding + xShift,
  //   yPadding + yShift,
  //   imageWidth * scale,
  //   imageHeight * scale
  // );

  // make UI
  fill(255);
  textFont("IBM Plex Mono");
  textSize(24);
  text("Drop in the Ocean", 10, 40);
  // text("Each point is a drop on one da4", 10, 40);
  slider = createSlider(1, 1000, 1);
  slider.addClass("slider");
}

function draw() {
  // background(0, 0.0001);
  if (go) drawPaths();
  speed = slider.value();
}

function drawPaths() {
  if (paths[path]) {
    if (step <= paths[path].points.length - speed) {
      // text(paths[path].name, 10, 10, 70, 80);
      for (let i = 0; i < speed; i++) {
        if (paths[path].points[step]) {
          let thisDot = dotSize;
          fill(colour, bigSaturation, brightness, bigAlpha);
          circle(
            xPadding + paths[path].points[step][0] * scale + xShift,
            yPadding + paths[path].points[step][1] * scale + yShift,
            thisDot * 3
          );
          fill(colour, littleSaturation, brightness, littleAlpha);
          circle(
            xPadding + paths[path].points[step][0] * scale + xShift,
            yPadding + paths[path].points[step][1] * scale + yShift,
            thisDot
          );
          step++;
          colour += colourRange / paths[path].points.length;
        }
      }
      // console.log("step ", step);
    } else {
      console.log("path is ", path, " and movement length is ", paths.length);
      if (path <= paths.length) {
        step = 0;
        colour = colourStart;
        path++;
        // colour += path * 2;
        console.log("colour", colour);
        console.log("path", path);
      }
    }
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
