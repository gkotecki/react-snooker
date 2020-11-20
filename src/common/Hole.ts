import { GameObject } from "./GameObject";
import { CanvasPosition } from "./Types";

export class Hole extends GameObject {
  readonly radius = 18;

  constructor(position: CanvasPosition) {
    super(position, [0,0]);
  }

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
  }
}
