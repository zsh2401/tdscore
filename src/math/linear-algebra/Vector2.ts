import { cos, ONE_DEGREE, pow, sin } from "..";
import DSObject from "../../DSObject";
import dsHashCode from "../../dsHashCode";
import Transformation2 from "./Transformation2";
import Vector from "./Vector";

/**
 * 表示一个二维向量
 */
export default class Vector2
    extends Vector {

    readonly x: number;

    readonly y: number;

    /**
     * 构造一个向量
     * @param x 
     * @param y 
     */
    constructor(x: number, y: number) {
        super(x, y);
        this.x = x;
        this.y = y;
    }

    /**
     * 进行线性变换
     * @param t 
     */
    transform(t: Transformation2): Vector2 {
        const m = t.mul(this);
        return new Vector2(m.at(0, 0), m.at(1, 0));
    }

    /**
     * 计算向量长度
     */
    get length(): number {
        return pow(pow(this.x, 2) + pow(this.y, 2), 0.5);
    }

    /**
     * 将向量进行顺时针旋转
     * @param degree 度数
     */
    rotateClockwisely(degree: number): Vector2 {
        const theta = ONE_DEGREE * degree;
        const t = new Transformation2(
            cos(theta),
            -sin(theta),
            sin(theta),
            cos(theta)
        );
        return this.transform(t);
    }

    /**
     * 计算向量哈希值
     */
    newHashCode(): number {
        return dsHashCode("Vector2" + (this.x ^ this.y))
    }

    /**
     * 与其它向量或对象进行比较
     * @param other 
     */
    equals(other: DSObject | null | undefined): boolean {
        if (other instanceof Vector2) {
            return this.x === other.x && this.y === other.y;
        } else {
            return super.equals(other);
        }
    }
}