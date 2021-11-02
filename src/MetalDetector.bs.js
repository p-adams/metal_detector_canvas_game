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
  var mouseCoords = match[0];
  var dimensions = React.useRef({
        width: 600,
        height: 500
      });
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
      var dom = gameCanvasRef.current;
      if (dom == null) {
        return ;
      }
      var ctx = dom.getContext("2d");
      ctx.clearRect(0, 0, dimensions.current.width, dimensions.current.height);
      ctx.beginPath();
      ctx.arc(x$1, y$1, 20, 0, Math.imul(3, Math.PI | 0));
      ctx.stroke();
      return ;
    }
    
  };
  return React.createElement("div", undefined, React.createElement("h2", undefined, "metal detector game"), React.createElement(GameCanvas.make, {
                  width: dimensions.current.width,
                  height: dimensions.current.height,
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
