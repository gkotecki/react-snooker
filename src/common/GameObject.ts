import { CanvasPosition, Velocity } from "./Types";

/**
 * Generic game object
 */
export class GameObject {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isColliding: boolean;

  constructor(position: CanvasPosition, velocity: Velocity) {
    this.x = position[0];
    this.y = position[1];
    this.vx = velocity[0];
    this.vy = velocity[1];

    this.isColliding = false;
  }

  public draw(context: CanvasRenderingContext2D): void {
    console.warn('TODO: implement this method on inheritance');
  }

  public update(secondsPassed: number): void {
    console.warn('TODO: implement this method on inheritance');
  }
}
