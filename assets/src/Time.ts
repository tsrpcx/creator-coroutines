import { director, game } from "cc";
import { PREVIEW } from "cc/env";

export enum DeltaTimeType {
    DELTA_TIME,
    // FIXED_DELTA_TIME,
    UNSCALED_DELTA_TIME
}

export class Time {

    protected static globalTimeScale: number = 1;
    protected static globalRealDeltaTime: number = 0;
    protected static globalDeltaTime: number = 0;
    protected static globalRealtimeSinceStartup: number = 0;

    public static hookTime() {

        if (!director || !game) return;

        // @ts-ignore
        if (!director.tickExchanged) {
            // @ts-ignore
            director.tickExchanged = true;

            // @ts-ignore
            director.originTick = director.tick;
            director.tick = (dt: number) => {
                Time.globalRealDeltaTime = dt;
                dt = Time.globalTimeScale * dt;
                Time.globalDeltaTime = dt;
                // @ts-ignore
                director.originTick(dt);
            }
        }

        // @ts-ignore
        if (!game.dtSaved) {
            // @ts-ignore
            game.dtSaved = true;

            // @ts-ignore
            game.originCalculateDT = game._calculateDT;
            // @ts-ignore
            game._calculateDT = (now: number) => {
                if (!now) now = performance.now();

                Time.globalRealtimeSinceStartup = now;
                // @ts-ignore
                return game.originCalculateDT(now);
            }
        }
    }

    public static unhookTime() {

        if (!director || !game) return;

        // @ts-ignore
        if (director.tickExchanged) {
            // @ts-ignore
            director.tickExchanged = false;

            // @ts-ignore
            director.tick = director.originTick;
            // @ts-ignore
            director.originTick = null;
        }

        // @ts-ignore
        if (game.dtSaved) {
            // @ts-ignore
            game.dtSaved = false;

            // @ts-ignore
            game._calculateDT = game.originCalculateDT;

            // @ts-ignore
            game.originCalculateDT = null;
        }
    }

    // 1 -> 无缩放; 0.5 -> 减速; 2 -> 加速
    public static set timeScale(v: number) {
        if (Time.globalTimeScale != v)
            Time.globalTimeScale = v;
        this.hookTime();
    }

    // 1 -> 无缩放; 0.5 -> 减速; 2 -> 加速
    public static get timeScale(): number {
        return Time.globalTimeScale;
    }

    // Second 秒
    public static get deltaTime(): number {
        return Time.globalDeltaTime;
    }

    // Second 秒
    public static get unscaledDeltaTime(): number {
        return Time.globalRealDeltaTime;
    }

    // Millisecond 毫秒
    public static get realtimeSinceStartupMs(): number {
        return Time.globalRealtimeSinceStartup;
    }

    // Second 秒
    public static get realtimeSinceStartup(): number {
        return Time.globalRealtimeSinceStartup / 1000;
    }

    public static get now(): number {
        return new Date().getTime();
    }

    public static startOfDay(time: number): number {
        const startOfDay = new Date(time);
        startOfDay.setUTCHours(0, 0, 0, 0);
        return startOfDay.getTime();
    }

    public static endOfDay(time: number): number {
        const endOfDay = new Date(time);
        endOfDay.setUTCHours(23, 59, 59, 999);
        return endOfDay.getTime();
    }

    public static getDeltaTime(dtType: DeltaTimeType): number {
        switch (dtType) {
            case DeltaTimeType.DELTA_TIME:
                return Time.deltaTime;
            case DeltaTimeType.UNSCALED_DELTA_TIME:
                return Time.unscaledDeltaTime;
            default:
                return Time.deltaTime;
        }
    }

    public static get time(): number {
        return new Date().getTime() / 1000;
    }
}

if (PREVIEW) {
    // @ts-ignore
    window.Time = Time;
}

Time.hookTime();
