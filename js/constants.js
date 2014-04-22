// Game globals

var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");
var fps = 24;  // how many 'update' frames per second
var step = 1/fps;  // how long is each frame (in seconds)
var scale = 4;
var cols = 128;
var rows = 128;

var KEY = {
  LEFT:  37,
  UP:    38,
  RIGHT: 39,
  DOWN:  40,
  A:     65,
  D:     68,
  S:     83,
  W:     87
};

var colours = [
  "#000000",
  "#aaaaaa",
  "#00ff00",
  "#ffff00",
  "#ffff55",
  "#aa5500",
  "#ff5555",
  "#aa0000",
  "#55ff55",
  "#00aa00",
  "#55ffff",
  "#00aaaa",
  "#5555ff",
  "#0000aa",
  "#ff55ff",
  "#aa00aa"
];

