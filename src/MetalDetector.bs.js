// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_math from "../node_modules/rescript/lib/es6/js_math.js";
import * as Caml_array from "../node_modules/rescript/lib/es6/caml_array.js";
import * as GameCanvas from "./GameCanvas.bs.js";

var backgroundColor = "#e5d3b3";

var detectorColor = "#212121";

var tiles = [
  [
    0,
    0,
    0
  ],
  [
    0,
    0,
    0
  ],
  [
    0,
    0,
    0
  ]
];

var getRandomInt = Js_math.random_int;

function getRandomColor(param) {
  var colors = [
    "#173F5F",
    "#20639B",
    "#3CAEA3",
    "#F6D55C",
    "#ED553B"
  ];
  return Caml_array.get(colors, Js_math.random_int(0, colors.length));
}

function generateScore(color) {
  switch (color) {
    case "#173F5F" :
        return 2;
    case "#20639B" :
        return 4;
    case "#3CAEA3" :
        return 6;
    case "#ED553B" :
        return 12;
    case "#F6D55C" :
        return 8;
    default:
      return -1;
  }
}

function MetalDetector(Props) {
  var gameCanvasRef = React.useRef(null);
  var match = React.useState(function () {
        return {
                fillStyle: "",
                font: "",
                strokeStyle: ""
              };
      });
  var setCtx = match[1];
  var ctx = match[0];
  var match$1 = React.useState(function () {
        return {
                x: 0,
                y: 0
              };
      });
  var setMouseCoords = match$1[1];
  var mouseCoords = match$1[0];
  var dimensions = React.useRef({
        width: 600,
        height: 500
      });
  var match$2 = React.useState(function () {
        return [];
      });
  var setMetals = match$2[1];
  var metals = match$2[0];
  var match$3 = React.useState(function () {
        return [];
      });
  var setMetalsDetected = match$3[1];
  var metalsDetected = match$3[0];
  React.useEffect((function () {
          var dom = gameCanvasRef.current;
          if (!(dom == null)) {
            Curry._1(setCtx, (function (_prev) {
                    return dom.getContext("2d");
                  }));
          }
          tiles.forEach(function (rows) {
                rows.forEach(function (param) {
                      var color = getRandomColor(undefined);
                      return Curry._1(setMetals, (function (_prev) {
                                    return _prev.concat([{
                                                  x: Js_math.random_int(0, 600),
                                                  y: Js_math.random_int(0, 500),
                                                  color: color,
                                                  detected: false,
                                                  score: generateScore(color)
                                                }]);
                                  }));
                    });
                
              });
          
        }), []);
  var distance = function (x, y, metal) {
    return Math.hypot(x - metal.x | 0, y - metal.y | 0);
  };
  var onMouseMove = function (e) {
    var x = e.clientX;
    var y = e.clientY;
    Curry._1(setMouseCoords, (function (_prev) {
            return {
                    x: x - e.target.offsetLeft | 0,
                    y: y - e.target.offsetTop | 0
                  };
          }));
    if (mouseCoords.x > 0 && mouseCoords.y > 0) {
      var x$1 = mouseCoords.x;
      var y$1 = mouseCoords.y;
      var match = gameCanvasRef.current;
      if (!(match == null)) {
        ctx.clearRect(0, 0, dimensions.current.width, dimensions.current.height);
        metals.forEach(function (metal) {
              ctx.beginPath();
              ctx.fillStyle = backgroundColor;
              ctx.fillRect(metal.x, metal.y, 20, 20);
              ctx.closePath();
              
            });
        ctx.beginPath();
        ctx.fillStyle = detectorColor;
        ctx.arc(x$1, y$1 - 20 | 0, 20, 0, Math.imul(3, Math.PI | 0));
        ctx.fill();
        ctx.closePath();
        metals.forEach(function (metal) {
              if (distance(x$1, y$1, metal) < 40) {
                if (!metalsDetected.includes(metal)) {
                  Curry._1(setMetalsDetected, (function (_prev) {
                          return [metal].concat(metalsDetected);
                        }));
                }
                ctx.beginPath();
                ctx.fillStyle = metal.color;
                ctx.fillRect(metal.x, metal.y, 20, 20);
                ctx.font = "10px Avenir, Helvetica, Arial, sans-serif";
                ctx.fillText("POINTS: " + String(metal.score), metal.x, metal.y - 4 | 0);
                ctx.closePath();
                var color = "red";
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.arc(x$1, y$1 - 20 | 0, 20, 0, Math.imul(3, Math.PI | 0));
                ctx.fill();
                ctx.closePath();
                return ;
              }
              
            });
        return ;
      } else {
        return ;
      }
    }
    
  };
  var pickUp = function (param) {
    metals.forEach(function (metal) {
          if (distance(mouseCoords.x, mouseCoords.y, metal) < 40) {
            console.log("pick up metal");
            return ;
          }
          
        });
    
  };
  return React.createElement("div", undefined, React.createElement("h2", undefined, "metal detector game"), React.createElement("div", undefined, "metals detected: ", metalsDetected.length), React.createElement(GameCanvas.make, {
                  width: dimensions.current.width,
                  height: dimensions.current.height,
                  canvasClassName: "metal-detector-canvas",
                  canvasRef: gameCanvasRef,
                  onMouseMove: onMouseMove,
                  onClick: pickUp
                }));
}

var detectionOffest = 40;

var make = MetalDetector;

export {
  backgroundColor ,
  detectorColor ,
  detectionOffest ,
  tiles ,
  getRandomInt ,
  getRandomColor ,
  generateScore ,
  make ,
  
}
/* react Not a pure module */
