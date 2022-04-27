import { _decorator, Component } from "cc";
import { Command } from "./Command";
import { CoroutineExecutor } from "./CoroutineExecutor";

const { ccclass } = _decorator;

@ccclass
export class CommandProcessor extends Component {

	// --- instance begin ---
	private static _instance: CommandProcessor = null;
	public static get i(): CommandProcessor {
		return this._instance;
	}
	// --- instance end ---

	protected onLoad(): void {
		CommandProcessor._instance = this;
	}

	onDestroy(): void {
		CommandProcessor._instance = null;
	}

	private _coroutineExecutor: CoroutineExecutor = null;
	private get m_coroutineExecutor(): CoroutineExecutor {
		if (!this._coroutineExecutor) {
			this._coroutineExecutor = this.getComponent(CoroutineExecutor) || this.addComponent(CoroutineExecutor);
		}
		return this._coroutineExecutor;
	}

	public execute(command: any, data: any = null) {
		return this.m_coroutineExecutor.StartCoroutine(command, data);
	}

	public executeSpecific(executor: CoroutineExecutor | any, command: any, data: any = null): string {
		if (!(executor instanceof CoroutineExecutor)) {
			executor = executor.getComponent(CoroutineExecutor) || executor.addComponent(CoroutineExecutor);
		}

		return executor.StartCoroutine(command, data);
	}

	public stopCommand(coroutineId: string, owner: CoroutineExecutor = null) {
		owner = owner || this.m_coroutineExecutor;
		if (coroutineId && coroutineId.length) {
			owner.StopCoroutine(coroutineId);
		}
	}
}