import { _decorator, Component } from "cc";
import { Command } from "./Command";

const { ccclass } = _decorator;

@ccclass
export class CoroutineExecutor extends Component {

	private _routines: Command[] = [];

	public StartCoroutine<T>(T: any, data: any): string {
		const routine: Command = this.addComponent(T);
		this._routines.push(routine);
		routine.onExit = this.onRoutineExit.bind(this);
		routine.executeRoutine();
		return routine.routineId;
	}

	public StopCoroutine(id: string): void {
		for (let i = this._routines.length - 1; i >= 0; i--) {
			const routine = this._routines[i];
			if (routine && routine.routineId == id) {
				routine.cancelRoutine();
			}
			this._routines.splice(i, 1);
		}
	}

	private onRoutineExit(id: string) {
		this.StopCoroutine(id);
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