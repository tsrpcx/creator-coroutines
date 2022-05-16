import { _decorator, Component, isValid } from "cc";

@_decorator.ccclass
export class Coroutine extends Component {

	private m_abortController: AbortController = new AbortController();
	public get abortSignal(): AbortSignal {
		if (!(isValid(this) && isValid(this.node))) return null;
		this.m_abortController.signal;
	}

	private m_exitCalled: boolean = false;

	public onExit: (id: string, arg?: any) => void;

	public routineId: string;

	public cancelRoutine() {
		this.m_abortController.abort("cancel");
	}

	private exitRoutine(exitArg: any = null) {
		if (this.m_exitCalled) return;

		this.m_exitCalled = true;
		this.onExit && this.onExit(this.routineId, exitArg);
		this.destroy();
	}

	public executeRoutine(func: (coroutine: Coroutine) => Promise<void>) {
		this.asyncRoutine(func);
	}

	public async WaitForSeconds(comp: Coroutine, delay: number) {

		if (!(isValid(this) && isValid(this.node))) return null;

		return new Promise((resolve, reject) => {

			let waitForSecondsComplete = function () {
				resolve(null);
			}

			if (this.abortSignal) {
				if (this.abortSignal.aborted) waitForSecondsComplete();

				this.abortSignal.addEventListener('abort', () => {
					comp.unschedule(waitForSecondsComplete);
					waitForSecondsComplete();
				});
			}

			comp.scheduleOnce(waitForSecondsComplete, delay);
		});
	}

	private async asyncRoutine(func: (coroutine: Coroutine) => Promise<void>) {
		let exitArg: any = null;

		try {
			exitArg = await func(this);
		}
		catch (e) {
			console.error(e);
		}

		this.exitRoutine(exitArg);
	}
}

interface CoroutineExecutorBinder {
	m_coroutineExecutor: CoroutineExecutor;
}

class CoroutineExecutor {

	private m_routineId: number = 1;
	public genRoutineId(): string {
		return 'routine_' + this.m_routineId++;
	}

	private _routines: Coroutine[] = [];
	public routineExitCallback: (id: string, exitArg?: any) => void = null;

	private onCoroutineExitCallback(id: string, exitArg?: any): void {
		this.routineExitCallback && this.routineExitCallback(id, exitArg);
	}

	public static with(c: Component): CoroutineExecutor {

		// prevent mess when node destroy
		if (!(isValid(c) && isValid(c.node))) return null;

		const binder: CoroutineExecutorBinder = c as any as CoroutineExecutorBinder;
		if (binder.m_coroutineExecutor) return binder.m_coroutineExecutor;

		binder.m_coroutineExecutor = new CoroutineExecutor();
		return binder.m_coroutineExecutor;
	}

	public StartCoroutine(c: Component, func: (coroutine: Coroutine) => Promise<any>): string {
		const routine: Coroutine = c.addComponent(Coroutine);
		routine.routineId = this.genRoutineId();
		this._routines.push(routine);

		routine.onExit = this.onRoutineExit.bind(this);
		routine.executeRoutine(func);

		return routine.routineId;
	}

	public StopCoroutine(id: string): boolean {
		let has = false;
		if (id && id.length) {
			for (let i = this._routines.length - 1; i >= 0; i--) {
				const routine = this._routines[i];
				if (routine && routine.routineId == id) {
					routine.cancelRoutine();
					has = true;
					break;
				}
			}
		}
		return has;
	}

	public IsCoroutineRunning(id: string): boolean {
		let has = true;
		for (let i = this._routines.length - 1; i >= 0; i--) {
			const routine = this._routines[i];
			if (routine && routine.routineId == id) {
				has = true;
				break;
			}
		}
		return has;
	}

	private onRoutineExit(id: string, exitArg: any) {
		if (id && id.length) {

			let routineExist = false;
			for (let i = this._routines.length - 1; i >= 0; i--) {
				const routine = this._routines[i];
				if (routine && routine.routineId == id) {
					this._routines.splice(i, 1);
					routineExist = true;
					break;
				}
			}

			routineExist && this.onCoroutineExitCallback(id, exitArg);
		}
	}

	public StopAllCoroutines() {
		for (let i = this._routines.length - 1; i >= 0; i--) {
			const routine = this._routines[i];
			if (routine) {
				routine.cancelRoutine();
			}
		}
		this._routines.length = 0;
	}
}

export function CoroutineSetExitCall(c: Component, exitCall: (id: string, exitArg?: any) => void): void {
	let exec = CoroutineExecutor.with(c);
	if (exec) exec.routineExitCallback = exitCall;
}

export function CoroutineRemoveExitCall(c: Component): void {
	let exec = CoroutineExecutor.with(c);
	if (exec) exec.routineExitCallback = null;
}

export function StartCoroutine(c: Component, func: (coroutine: Coroutine) => Promise<any>): string {
	let exec = CoroutineExecutor.with(c);
	return exec ? exec.StartCoroutine(c, func) : null;
}

export function StopCoroutine(c: Component, id: string): boolean {
	let exec = CoroutineExecutor.with(c);
	return exec ? exec.StopCoroutine(id) : false;
}

export function IsCoroutineRunning(c: Component, id: string): boolean {
	let exec = CoroutineExecutor.with(c);
	return exec ? exec.IsCoroutineRunning(id) : false;
}

export function StopAllCoroutines(c: Component): void {
	let exec = CoroutineExecutor.with(c);
	exec && exec.StopAllCoroutines();
}