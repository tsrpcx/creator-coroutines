import { _decorator, Component, macro } from "cc";
const { ccclass } = _decorator;

@ccclass
export class Coroutine extends Component {

    protected m_abortController: AbortController = new AbortController();
    public get abortSignal(): AbortSignal { return this.m_abortController.signal; }

    protected m_exitCalled: boolean = false;

    public onExit: (id: string, arg?: any) => void;

    public get routineId(): string {
        return this.uuid || this._id;
    }

    public cancelRoutine() {
        this.m_abortController.abort("cancel");
    }

    protected exitRoutine(exitArg: any = null) {
        if (this.m_exitCalled) return;

        this.m_exitCalled = true;
        this.unscheduleAllCallbacks();
        this.onExit && this.onExit(this.routineId, exitArg);
        this.destroy();
    }

    public executeRoutine(func: (coroutine: Coroutine) => Promise<void>) {
        this.asyncRoutine(func);
    }

    protected async asyncRoutine(func: (coroutine: Coroutine) => Promise<void>) {
        let exitArg: any = null;

        try {
            exitArg = await func(this);
        }
        catch (e) {
            console.error(e);
        }

        this.exitRoutine(exitArg);
    }

    public setData(data: any) {
        throw new Error("Coroutine.setData no implementation " + this.name);
    }
}