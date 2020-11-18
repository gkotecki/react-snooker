import React, { useRef, useEffect } from "react";
import { Ball } from "./common/Ball";

function App() {
  // React canvas element reference
  const canvasRef = useRef(null);

  // Initializing game entities
  const whiteBall = new Ball([250, 350], [10,10], "#fff");

  /**
   * React update hook
   */
  useEffect(() => {
    // Set parameters to be reused within hook state
    let secondsPassed = 0;
    let oldTimeStamp = 0;

    // Start game loop
    const gameLoop = (timeStamp) => {
      const ctx: CanvasRenderingContext2D = canvasRef.current.getContext("2d");

      // Calculate the number of seconds passed since the last frame
      secondsPassed = (timeStamp - oldTimeStamp) / 1000;
      oldTimeStamp = timeStamp;
      const fps = Math.round(1 / secondsPassed);

      updateState(secondsPassed || 0);

      drawCanvas(ctx, fps);

      requestAnimationFrame(gameLoop);
    };
    gameLoop(console.timeStamp);
  });

  /**
   * Updates game state to prepare for next draw cycle
   */
  function updateState(secondsPassed: number) {
    whiteBall.update(secondsPassed)
  }

  /**
   * Clears previous frames and draws new content
   */
  function drawCanvas(ctx: CanvasRenderingContext2D, fps: number) {
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

    //Draw table holes
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(50, 50, 16, 0, 2*Math.PI);
    ctx.arc(450, 50, 16, 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(50, 350, 16, 0, 2*Math.PI);
    ctx.arc(450, 350, 16, 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(50, 650, 16, 0, 2*Math.PI);
    ctx.arc(450, 650, 16, 0, 2*Math.PI);
    ctx.fill();

    // Draw white ball
    whiteBall.draw(ctx);
  }

  return <canvas ref={canvasRef} width="500" height="700" />;
}

export default App;
