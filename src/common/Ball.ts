import { GameObject } from "./GameObject";
import { CanvasPosition, Velocity } from "./Types";

/**
 * Ball entity
 */
export class Ball extends GameObject {
  vx: number;
  vy: number;
  color: string;
  outOfBounds = false;
  showLogs = false;
  readonly radius = 12;

  constructor(position: CanvasPosition, velocity: Velocity, color: string, showLogs?: boolean) {
    super(position);
    this.vx = velocity[0];
    this.vy = velocity[1];
    this.color = color;
    this.showLogs = showLogs;
  }

  update(secondsPassed: number) {
    const decay = 0.5;
    const velocityThreshold = 0.5;

    if (this.showLogs) {
      console.log(this.vx, this.vy)
    }

    this.vx = Math.abs(this.vx) < velocityThreshold
      ? 0
      : this.vx - this.vx * decay * secondsPassed;

    this.vy = Math.abs(this.vy) < velocityThreshold
      ? 0
      : this.vy - this.vy * decay * secondsPassed;

    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.isColliding ? "#f00" : this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
  }
}
