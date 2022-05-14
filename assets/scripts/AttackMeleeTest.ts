
import { _decorator, Component, Node } from 'cc';
import { AttackMelee, IAttackMeleeData } from './AttackMelee';
import { CoroutineExecutor } from './CoroutineExecutor';
import { randomName, randomRange } from './rand';
const { ccclass, property } = _decorator;

@ccclass
export class AttackMeleeTest extends Component {

    onEnable() {

        // this.node.name = randomName();

        this._coroutine = CoroutineExecutor.with(this).StartCoroutine(AttackMelee, {
            attackerName: this.node.name,
            attackSpeed: randomRange(1, 2),
            damageMin: randomRange(1, 2),
            damageMax: randomRange(8, 10),
        } as IAttackMeleeData)
    }

    private _coroutine: string = null;
    private _time: number = 0;

    update(dt: number) {
        if (!(this._coroutine && this._coroutine.length)) return;

        this._time += dt;
        // console.log(this.node.name, 'update', this._time);

        if (this._time >= randomRange(6, 10)) {
            console.log(this.node.name, 'abort');
            let has = CoroutineExecutor.with(this).StopCoroutine(this._coroutine);
            if (!has) this._coroutine = null;
        }
    }

    onCoroutineExecutorRoutineExit(id: string, exitArg?: any): void {
        if (this._coroutine == id) this._coroutine = null;

        if (exitArg as string != this.node.name) {
            console.error("err");
        }
        else {
            console.log(this.node.name, 'exit');;
        }
    }
}