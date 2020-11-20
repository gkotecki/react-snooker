import { Ball } from "./Ball";
import { Hole } from "./Hole";

export class Collision {
  /**
   * Checks for collision between two balls
   *
   * Calculates the distance between the two circles.
   * When the distance is smaller or equal to the sum
   * of the two radius, the circles touch or overlap
   *
   * @param ball1 - Ball object
   * @param ball2 - Ball object
   *
   * @returns collision state
   */
  static onBalls(
    { x: x1, y: y1, radius: r1 }: Ball,
    { x: x2, y: y2, radius: r2 }: Ball
  ): boolean {
    const squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    return squareDistance <= (r1 + r2) * (r1 + r2);
  }

  /**
   * Checks if a ball center is inside a hole area
   *
   * @param ball - Ball object
   * @param hole - Hole object
   *
   * @returns out-of-bounds state
   */
  static onHole(
    { x: x1, y: y1 }: Ball,
    { x: x2, y: y2, radius: r2 }: Hole
  ): boolean {
    const squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    return squareDistance < r2 * r2;
  }
}
