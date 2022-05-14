import { _decorator, Component, Eventify } from "cc";
import { Coroutine } from "./Coroutine";

const { ccclass } = _decorator;

export interface CoroutineExecutorBinder {
	m_coroutineExecutor: CoroutineExecutor;
	onCoroutineExecutorRoutineExit(id: string, exitArg?: any): void;
}

@ccclass
export class CoroutineExecutor extends Component {

	private _routines: Coroutine[] = [];
	private binder: CoroutineExecutorBinder = null;

	public static with(c: Component): CoroutineExecutor {
		const binder: CoroutineExecutorBinder = c as any as CoroutineExecutorBinder;
		binder.m_coroutineExecutor = binder.m_coroutineExecutor || (binder as any as Component).getComponent(CoroutineExecutor) || (binder as any as Component).addComponent(CoroutineExecutor);
		binder.m_coroutineExecutor.binder = binder;
		return binder.m_coroutineExecutor;
	}

	public StartCoroutine(func: (coroutine: Coroutine) => Promise<any>): string {
		const routine: Coroutine = this.addComponent(Coroutine);
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

			routineExist && this.binder && this.binder.onCoroutineExecutorRoutineExit && this.binder.onCoroutineExecutorRoutineExit(id, exitArg);
		}
	}

	public StopAllCoroutines(routine: any) {
		for (let i = this._routines.length - 1; i >= 0; i--) {
			const routine = this._routines[i];
			if (routine) {
				routine.cancelRoutine();
			}
		}
		this._routines.length = 0;
	}
}

export function StartCoroutineWith(c: Component, func: (coroutine: Coroutine) => Promise<any>): string {
	return CoroutineExecutor.with(c).StartCoroutine(func);
}