type coords = {x: int, y: int}
type canvasDimensions = {width: int, height: int}
type metal = {x: int, y: int, color: string, detected: bool, score: int}
let tiles = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let getRandomInt = (min, max) => {
  Js.Math.random_int(min, max)
}
let getRandomColor = () => {
  let colors = ["#173F5F", "#20639B", "#3CAEA3", "#F6D55C", "#ED553B"]
  colors[Js.Math.random_int(0, Belt.Array.length(colors))]
}
// generate score based on color
let generateScore = color => {
  switch color {
  | "#173F5F" => 2
  | "#20639B" => 4
  | "#3CAEA3" => 6
  | "#F6D55C" => 8
  | "#ED553B" => 12
  | _ => -1
  }
}
@react.component
let make = () => {
  let gameCanvasRef = React.useRef(Js.Nullable.null)
  let (mouseCoords, setMouseCoords) = React.useState(_ => {x: 0, y: 0})
  let dimensions = React.useRef({width: 600, height: 500})
  let (metals, setMetals) = React.useState(_ => [])
  let (metalsDetected, setMetalsDetected) = React.useState(_ => [])
  React.useEffect0(() => {
    Js.Array2.forEach(tiles, rows => {
      Js.Array2.forEach(rows, _ => {
        let color = getRandomColor()
        setMetals(_prev =>
          Js.Array2.concat(
            _prev,
            [
              {
                x: getRandomInt(0, 600),
                y: getRandomInt(0, 500),
                color: color,
                detected: false,
                score: generateScore(color),
              },
            ],
          )
        )
      })
    })
    None
  })

  let detect = (ctx, detectorX, detectorY) => {
    Js.Array2.forEach(metals, metal => {
      let distance = Js.Math.hypot(
        (detectorX - metal.x)->Belt.Int.toFloat,
        (detectorY - metal.y)->Belt.Int.toFloat,
      )
      if distance < 40->Belt.Int.toFloat {
        if !Js.Array.includes(metal, metalsDetected) {
          setMetalsDetected(_prev => Js.Array.concat(metalsDetected, [metal]))
        }
        CanvasApi.beginPath(ctx)
        ctx.fillStyle = metal.color
        CanvasApi.fillRect(ctx, metal.x, metal.y, 20, 20)
        ctx.font = "10px Avenir, Helvetica, Arial, sans-serif"
        CanvasApi.fillText(ctx, `POINTS: ${metal.score->Belt.Int.toString}`, metal.x, metal.y - 4)
      }
    })
  }
  let drawDetector = (x, y) => {
    switch gameCanvasRef.current->Js.Nullable.toOption {
    | Some(dom) => {
        let ctx = CanvasApi.getContext(dom, "2d")
        CanvasApi.clearRect(ctx, 0, 0, dimensions.current.width, dimensions.current.height)
        Js.Array2.forEach(metals, metal => {
          CanvasApi.beginPath(ctx)
          ctx.fillStyle = "white"
          CanvasApi.fillRect(ctx, metal.x, metal.y, 20, 20)
        })
        CanvasApi.beginPath(ctx)
        CanvasApi.arc(ctx, x, y - 20, 20, 0, 3 * Js.Math._PI->Belt.Float.toInt)
        CanvasApi.stroke(ctx)
        detect(ctx, x, y)
      }

    | None => ()
    }
  }

  let onMouseMove = e => {
    let x = ReactEvent.Mouse.clientX(e)
    let y = ReactEvent.Mouse.clientY(e)

    setMouseCoords(_prev => {
      x: x - ReactEvent.Mouse.target(e)["offsetLeft"],
      y: y - ReactEvent.Mouse.target(e)["offsetTop"],
    })
    if mouseCoords.x > 0 && mouseCoords.y > 0 {
      drawDetector(mouseCoords.x, mouseCoords.y)
    }
  }
  <div>
    <h2> {React.string("metal detector game")} </h2>
    <div> {React.string("metals detected: ")} {React.int(Belt.Array.length(metalsDetected))} </div>
    <GameCanvas
      canvasRef={gameCanvasRef}
      width={dimensions.current.width}
      height={dimensions.current.height}
      canvasClassName="metal-detector-canvas"
      onMouseMove={onMouseMove}
    />
  </div>
}
