import { remove } from "lodash";
import React, { useEffect, useRef } from "react";
import { Ball } from "./common/Ball";
import { Collision } from "./common/Collision";
import { Hole } from "./common/Hole";

function App() {
  // React canvas element reference
  const canvasRef = useRef(null);

  // Initializing game entities
  const whiteBall = new Ball([280,550], [0,0], "#fff");
  const blueBalls = [
    new Ball([170 + 26*1,150], [0,0], "#22f"),
    new Ball([170 + 26*2,150], [0,0], "#22f"),
    new Ball([170 + 26*3,150], [0,0], "#22f"),
    new Ball([170 + 26*4,150], [0,0], "#22f"),
    new Ball([170 + 26*5,150], [0,0], "#22f"),
    new Ball([183 + 26*1,172], [0,0], "#22f"),
    new Ball([183 + 26*2,172], [0,0], "#22f"),
    new Ball([183 + 26*3,172], [0,0], "#22f"),
    new Ball([183 + 26*4,172], [0,0], "#22f"),
    new Ball([196 + 26*1,194], [0,0], "#22f"),
    new Ball([196 + 26*2,194], [0,0], "#22f"),
    new Ball([196 + 26*3,194], [0,0], "#22f"),
    new Ball([209 + 26*1,216], [0,0], "#22f"),
    new Ball([209 + 26*2,216], [0,0], "#22f"),
    new Ball([222 + 26*1,238], [0,0], "#22f"),
  ];
  const holes = [
    new Hole([55, 55]),
    new Hole([445, 55]),
    new Hole([50, 350]),
    new Hole([450, 350]),
    new Hole([55, 645]),
    new Hole([445, 645]),
  ]

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

      // Calls game lifecycle functions
      updateState(secondsPassed || 0);
      detectCollisions();
      drawCanvas(ctx, fps);

      requestAnimationFrame(gameLoop);
    };
    gameLoop(console.timeStamp);
  });

  /**
   * Updates game state to prepare for next draw cycle
   */
  function updateState(secondsPassed: number): void {
    // Remove out-of-bounds balls from stack
    remove(blueBalls, ({ outOfBounds }) => outOfBounds)

    // Calls update on every entity
    whiteBall.update(secondsPassed);
    blueBalls.forEach((ball) => ball.update(secondsPassed));
  }

  /**
   * Detects collisions between all entities
   */
  function detectCollisions(): void {
    const gameObjects: Ball[] = [whiteBall, ...blueBalls];

    // Loop between all entities to check for individual collision
    for (let i = 0; i < gameObjects.length; i++) {
      let ball1: Ball = gameObjects[i];
      ball1.isColliding = false;

      // Checks if the ball reached a hole
      holes.forEach((hole) => {
        if (Collision.onHole(ball1, hole)) {
          ball1.outOfBounds = true;
        }
      });

      const absorption = 0.8;

      // Check for wall hits left and right
      if (ball1.x < 50 + ball1.radius) {
        ball1.isColliding = true;
        ball1.vx = Math.abs(ball1.vx) * absorption;
      } else if (ball1.x > 450 - ball1.radius) {
        ball1.isColliding = true;
        ball1.vx = -Math.abs(ball1.vx) * absorption;
      }

      // Check for wall hits bottom and top
      if (ball1.y < 50 + ball1.radius) {
        ball1.isColliding = true;
        ball1.vy = Math.abs(ball1.vy) * absorption;
      } else if (ball1.y > 650 - ball1.radius) {
        ball1.isColliding = true;
        ball1.vy = -Math.abs(ball1.vy) * absorption;
      }

      // Iterates over all possible ball pairs
      for (let j = i + 1; j < gameObjects.length; j++) {
        let ball2: Ball = gameObjects[j];
        ball2.isColliding = false;

        if (Collision.onBalls(ball1, ball2)) {
          ball1.isColliding = true;
          ball2.isColliding = true;

          let vCollision = { x: ball2.x - ball1.x, y: ball2.y - ball1.y };
          let distance = Math.sqrt(
            (ball2.x - ball1.x) * (ball2.x - ball1.x) +
              (ball2.y - ball1.y) * (ball2.y - ball1.y)
          );
          let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance, };
          let vRelativeVelocity = { x: ball1.vx - ball2.vx, y: ball1.vy - ball2.vy, };
          let speed =
            vRelativeVelocity.x * vCollisionNorm.x +
            vRelativeVelocity.y * vCollisionNorm.y;

          if (speed < 0) {
            break;
          }

          ball1.vx -= speed * vCollisionNorm.x;
          ball1.vy -= speed * vCollisionNorm.y;
          ball2.vx += speed * vCollisionNorm.x;
          ball2.vy += speed * vCollisionNorm.y;
        }
      }
    }
  }

  /**
   * Clears previous frames and draws new content
   */
  function drawCanvas(ctx: CanvasRenderingContext2D, fps: number): void {
    // Clears previous frame
    ctx.clearRect(0, 0, 500, 700);

    // Draw FPS string
    ctx.font = "14px monospace";
    ctx.fillStyle = "#000";
    ctx.fillText("FPS: " + fps, 0, 11);

    // Draw billiards table
    ctx.fillStyle = "#420";
    ctx.fillRect(25, 25, 450, 650);
    ctx.fillStyle = "#090";
    ctx.fillRect(50, 50, 400, 600);

    //Draw holes
    holes.forEach((hole) => hole.draw(ctx));

    // Draw balls
    whiteBall.draw(ctx);
    blueBalls.forEach((ball) => ball.draw(ctx));
  }

  /**
   * Mouse click event handler
   *
   * @param event - mouse click event
   */
  function mouseClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
    const canvas: HTMLElement = canvasRef.current;
    const factor = 3;
    whiteBall.vx = ((event.clientX - canvas.offsetLeft) - whiteBall.x) * factor;
    whiteBall.vy = ((event.clientY - canvas.offsetTop) - whiteBall.y) * factor;
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={mouseClick}
      width="500"
      height="700"
    />
  );
}

export default App;
