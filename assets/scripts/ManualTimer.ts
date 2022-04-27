import { clamp, clamp01 } from "cc";

export class ManualTimer {

    private m_originalTimeSet: number /**float*/;

    private m_timeRemaining: number /**float*/;

    private m_idle: boolean;

    public get Idle(): boolean { return this.m_idle; }

    constructor(duration: number/**float */ = 0) {
        this.m_timeRemaining = 0;
        this.m_idle = true;
        if (duration) this.set(duration);
    }

    public set(duration: number/**float */): void {
        this.m_originalTimeSet = duration;
        this.m_timeRemaining = duration;
        this.m_idle = false;
    }

    public addAndClamp(addedSeconds: number/**float */): void {
        this.m_timeRemaining = clamp(this.m_timeRemaining + addedSeconds, 0, this.m_originalTimeSet);
        if (this.m_timeRemaining > 0) {
            this.m_idle = false;
        }
    }

    public reset(): void {
        this.m_timeRemaining = this.m_originalTimeSet;
        this.m_idle = false;
    }

    public end(): void {
        this.m_timeRemaining = 0;
        this.m_idle = true;
    }

    public tick(dt: number/**float */): boolean {
        if (this.Idle) {
            return false;
        }
        this.m_timeRemaining -= dt;
        if (this.m_timeRemaining <= 0) {
            this.end();
            return true;
        }
        return false;
    }

    public timeRemaining(): number /**float*/ {
        return this.m_timeRemaining;
    }

    public timeElapsed(): number /**float*/ {
        return this.m_originalTimeSet - this.m_timeRemaining;
    }

    public originalTimeSet(): number /**float*/ {
        return this.m_originalTimeSet;
    }

    public normalizedProgress(): number /**float*/ {
        if (this.m_originalTimeSet <= 0) {
            return 1;
        }
        return clamp01(this.timeElapsed() / this.m_originalTimeSet);
    }

    // TODO : change
    public tickUntilEndUnscaled(dt: number/**float */): boolean {
        let ended = false;
        if (!this.Idle) ended = this.tick(dt);
        return ended;
    }
}