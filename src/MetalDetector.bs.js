// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "../node_modules/rescript/lib/es6/curry.js";
import * as React from "react";
import * as GameCanvas from "./GameCanvas.bs.js";

function MetalDetector(Props) {
  var gameCanvasRef = React.useRef(null);
  var match = React.useState(function () {
        return {
                x: 0,
                y: 0
              };
      });
  var setMouseCoords = match[1];
  React.useEffect(function () {
        
      });
  var onMouseMove = function (e) {
    var x = e.clientX;
    var y = e.clientY;
    return Curry._1(setMouseCoords, (function (_prev) {
                  return {
                          x: x - e.target.offsetLeft | 0,
                          y: y - e.target.offsetTop | 0
                        };
                }));
  };
  return React.createElement("div", undefined, React.createElement("h2", undefined, "metal detector game"), React.createElement(GameCanvas.make, {
                  width: "600",
                  height: "500",
                  canvasClassName: "metal-detector-canvas",
                  canvasRef: gameCanvasRef,
                  onMouseMove: onMouseMove
                }));
}

var make = MetalDetector;

export {
  make ,
  
}
/* react Not a pure module */
