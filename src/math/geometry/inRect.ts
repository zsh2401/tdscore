import Vector2 from "../matrix/Vector2"

/**
* Checking if the point is in the rect.
* @param p 
* @param rect 
* @returns 
*/
export default function inRect(p: Vector2, rect: [Vector2, Vector2, Vector2, Vector2]) {
    return cross(rect[0], rect[1], p) *
        cross(rect[2], rect[3], p) >= 0 &&
        cross(rect[1], rect[2], p) *
        cross(rect[3], rect[0], p) >= 0
}

/**
 * Calculate the result of AXB
 * @param a 
 * @param b 
 * @param p 
 * @returns 
 */
export function cross(a: Vector2, b: Vector2, p: Vector2) {
    return (b.x - a.x) * (p.y - a.y) - (p.x - a.x) * (b.y - a.y)
}