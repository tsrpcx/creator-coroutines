
// convert from https://github.com/XJINE/Unity_RandomEx

import { geometry, IVec2Like, IVec3Like, IVec4Like, Rect } from "cc";

export type ValueFuncType = () => number;
export class Random {

    private static readonly RADIAN_MIN: number = 0;
    private static readonly RADIAN_MAX: number = 6.283185307179586;

    private static valueFunc: ValueFuncType = Math.random;

    // NOTE:
    // ValueFunc must return 0 ~ 1 range value.
    public static set ValueFunc(v: () => number) { Random.valueFunc = v; };
    public static get ValueFunc(): ValueFuncType { return Random.valueFunc; };

    public static get Value(): number/**float */ { return Random.ValueFunc(); }

    // Rangs
    public static RangeInt(min: number/**int */, max: number/**int */): number /**int */ {
        return Math.floor(min + (max - min + 1) * Random.Value);
    }

    public static RangeFloat(min: number/**float */, max: number/**float */) {
        return min + (max - min) * Random.Value;
    }

    public static RangeVec2<Out extends IVec2Like>(out: Out, min: IVec2Like, max: IVec2Like): Out {
        out.x = Random.RangeFloat(min.x, max.x);
        out.y = Random.RangeFloat(min.y, max.y);
        return out;
    }

    public static RangeVec3<Out extends IVec3Like>(out: Out, min: IVec3Like, max: IVec3Like) {
        out.x = Random.RangeFloat(min.x, max.x);
        out.y = Random.RangeFloat(min.y, max.y);
        out.z = Random.RangeFloat(min.z, max.z);
        return out;
    }

    public static RangeVec4<Out extends IVec4Like>(out: Out, min: IVec4Like, max: IVec4Like) {
        out.x = Random.RangeFloat(min.x, max.x);
        out.y = Random.RangeFloat(min.y, max.y);
        out.z = Random.RangeFloat(min.z, max.z);
        out.w = Random.RangeFloat(min.w, max.w);
        return out;
    }

    public static PointInRect<Out extends IVec2Like>(out: Out, rect: Rect): Out {
        out.x = Random.RangeFloat(rect.xMin, rect.xMax);
        out.y = Random.RangeFloat(rect.yMin, rect.yMax);
        return out;
    }

    public static PointInAABB<Out extends IVec3Like>(out: Out, aabb: geometry.AABB): Out {
        out.x = Random.RangeFloat(aabb.center.x - aabb.halfExtents.x, aabb.center.x + aabb.halfExtents.x);
        out.y = Random.RangeFloat(aabb.center.y - aabb.halfExtents.y, aabb.center.y + aabb.halfExtents.y);
        out.z = Random.RangeFloat(aabb.center.z - aabb.halfExtents.z, aabb.center.z + aabb.halfExtents.z);
        return out;
    }

    public static get Radian(): number/**float */ { return Random.RangeFloat(Random.RADIAN_MIN, Random.RADIAN_MAX); }

    public static get Sign(): number/**int */ { return Random.RangeFloat(-1, 1) > 0 ? 1 : -1; }

    public static OnUnitCircle<Out extends IVec2Like>(out: Out): Out {
        let angle = Random.Radian;

        out.x = Math.cos(angle);
        out.y = Math.sin(angle);

        return out;
    }

    public static InsideUnitCircle<Out extends IVec2Like>(out: Out): Out {
        let angle = Random.Radian;
        let radius = Random.Value;

        out.x = Math.cos(angle) * radius;
        out.y = Math.sin(angle) * radius;
        return out;
    }

    public static OnUnitSphere<Out extends IVec3Like>(out: Out): Out {
        let angle1 = Random.Radian;
        let angle2 = Random.Radian;

        out.x = Math.sin(angle1) * Math.cos(angle2);
        out.y = Math.sin(angle1) * Math.sin(angle2);
        out.z = Math.cos(angle1);

        return out;
    }

    public static InsideUnitSphere<Out extends IVec3Like>(out: Out): Out {

        let angle1 = Random.Radian;
        let angle2 = Random.Radian;
        let radius = Random.Value;

        out.x = Math.sin(angle1) * Math.cos(angle2) * radius;
        out.y = Math.sin(angle1) * Math.sin(angle2) * radius;
        out.z = Math.cos(angle1) * radius;

        return out;
    }

    public static Choice<T>(list: Array<T>): T {
        if (list && list.length) {
            return list[Math.floor(Random.Value * list.length)];
        }
        return null;
    }

    public static ChoiceOut<T>(list: Array<T>): T {
        if (list && list.length) {
            let index = Math.floor(Random.Value * list.length);
            return list.splice(index, 1)[0];
        }
        return null;
    }
}