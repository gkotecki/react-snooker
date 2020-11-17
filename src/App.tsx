import React, { useRef, useEffect } from "react";

function App() {
  const canvasRef = useRef(null);

  /**
   * React update hook
   */
  useEffect(() => {
    // Set parameters to be reused within hook state
    let secondsPassed = 0;
    let oldTimeStamp = 0;
    let fps = 0;

    // Start game loop
    const gameLoop = (timeStamp) => {
      const ctx: CanvasRenderingContext2D = canvasRef.current.getContext("2d");

      // Calculate the number of seconds passed since the last frame
      ({ fps, secondsPassed, oldTimeStamp } = calculateFps( secondsPassed, timeStamp, oldTimeStamp ));

      updateCanvas(ctx, fps);

      requestAnimationFrame(gameLoop);
    };
    gameLoop(console.timeStamp);
  }, []);

  /**
   * Calculates FPS and set time parameters
   */
  function calculateFps(secondsPassed: number, timeStamp: any, oldTimeStamp: number) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    const fps = Math.round(1 / secondsPassed);
    return { fps, secondsPassed, oldTimeStamp };
  }

  /**
   * Clears previous frames and draws new content
   */
  function updateCanvas(ctx: CanvasRenderingContext2D, fps: number) {
    // Clears previous frame
    ctx.clearRect(0, 0, 500, 700);

    // Draw FPS string
    ctx.font = "14px monospace";
    ctx.fillStyle = "black";
    ctx.fillText("FPS: " + fps, 0, 11);

    // Draw billiards table
    ctx.fillStyle = "#420";
    ctx.fillRect(25, 25, 450, 650);
    ctx.fillStyle = "#090";
    ctx.fillRect(50, 50, 400, 600);

    // Draw white ball
    ctx.fillStyle = "#fff"
    ctx.beginPath();
    ctx.arc(250, 350, 12, 0, 2*Math.PI);
    ctx.fill();
  }

  return <canvas ref={canvasRef} width="500" height="700" />;
}

export default App;
