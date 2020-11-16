import React, { useRef, useEffect } from "react";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let secondsPassed = 0;
    let oldTimeStamp = 0;
    let fps;

    const gameLoop = (timeStamp) => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext("2d");
      context.scale(2, 2);

      // Calculate the number of seconds passed since the last frame
      secondsPassed = (timeStamp - oldTimeStamp) / 1000;
      oldTimeStamp = timeStamp;

      // Calculate fps
      fps = Math.round(1 / secondsPassed);

      // Draw number to the screen
      context.fillStyle = "white";
      context.fillRect(0, 0, 200, 100);
      context.font = "25px sans-serif";
      context.fillStyle = "black";
      context.fillText("FPS: " + fps, 10, 30);

      update(context, secondsPassed);

      draw(context);

      requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }, []);

  function update(context, secondsPassed) {
    let randomColor = Math.random() > 0.5 ? "#ff8080" : "#0099b0";
    context.fillStyle = randomColor;
  }

  function draw(context) {
    context.fillRect(100, 50, 200, 175);
  }

  return <canvas ref={canvasRef} />;
}

export default App;
