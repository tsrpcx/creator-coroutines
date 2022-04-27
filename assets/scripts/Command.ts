import { _decorator, Component } from "cc";
const { ccclass } = _decorator;

@ccclass
export class Command extends Component {

	protected _abortController: AbortController = new AbortController();
	public onExit: (id: string) => void;

	public get routineId(): string {
		return this.uuid || this._id;
	}

	public setData(data: any) {
		throw new Error("Command.setData no implementation " + this.name);
	}

	public cancelRoutine() {
		this.unscheduleAllCallbacks();
		this._abortController.abort("cancel");
		this.scheduleOnce(this.destroy);
	}

	public executeRoutine() {

	}

	protected async asyncRoutine() {

	}
}