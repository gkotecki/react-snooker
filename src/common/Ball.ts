import { GameObject } from "./GameObject";
import { CanvasPosition, Velocity } from "./Types";

export class Ball extends GameObject {
  color: string;
  readonly radius = 12;

  constructor(position: CanvasPosition, velocity: Velocity, color: string) {
    super(position, velocity);
    this.color = color;
  }

  update(secondsPassed) {
    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
  }
}
