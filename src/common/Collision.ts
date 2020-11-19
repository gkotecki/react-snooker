import { Ball } from "./Ball";

export class Collision {
  /**
   * Checks for collision between two balls
   *
   * Calculatea the distance between the two circles.
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
    return squareDistance <= (r1 + r2) * (r1 + r2) + 1;
  }
}
