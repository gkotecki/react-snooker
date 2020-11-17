import React, { useRef, useEffect } from "react";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let secondsPassed = 0;
    let oldTimeStamp = 0;

    console.log();

    const gameLoop = (timeStamp) => {
      const ctx = getContext();
      
      ({ secondsPassed, oldTimeStamp } = drawFps(secondsPassed, timeStamp, oldTimeStamp, ctx));

      update(ctx, secondsPassed);

      requestAnimationFrame(gameLoop);
    };
    gameLoop(console.timeStamp);
  }, []);

  function drawFps(secondsPassed, timeStamp, oldTimeStamp, ctx) {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Draw number to the screen
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 200, 100);
    ctx.font = "25px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText("FPS: " + Math.round(1 / secondsPassed), 10, 30);
    return { secondsPassed, oldTimeStamp };
  }

  function getContext() {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;

    return canvas.getContext("2d");
  }

  function update(context, secondsPassed) {
    let randomColor = Math.random() > 0.5 ? "#ff8080" : "#0099b0";
    context.fillStyle = randomColor;
    context.fillRect(100, 50, 200, 175);
  }

  return <canvas ref={canvasRef} />;
}

export default App;
