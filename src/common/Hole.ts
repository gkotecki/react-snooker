import { GameObject } from "./GameObject";

/**
 * Hole entity
 */
export class Hole extends GameObject {
  readonly radius = 18;

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
  }
}
