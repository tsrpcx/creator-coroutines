
import { _decorator, Component } from 'cc';
import { Coroutine } from './Coroutine';
import { CoroutineExecutor, StartCoroutineWith } from './CoroutineExecutor';
import { randomBool, randomRange } from './rand';
import { WaitForSeconds } from './WaitForSeconds';
const { ccclass, property } = _decorator;

@ccclass
export class AttackMeleeTest extends Component {

    onEnable() {

        // this.node.name = randomName();

        const attackerName = this.node.name;
        const attackSpeed = randomRange(1, 2);
        const damageMin = randomRange(1, 2);
        const damageMax = randomRange(8, 10);

        this._coroutine = StartCoroutineWith(this, async (c: Coroutine) => {

            while (true) {

                if (c.abortSignal.aborted) break;

                const distanceCanReach = randomBool()
                if (!distanceCanReach) {
                    console.log(attackerName, 'distanceCanReach', distanceCanReach);
                    continue;
                }

                console.log(attackerName, 'do attack');

                if (c.abortSignal.aborted) break;

                const damage = Math.floor(randomRange(damageMin, damageMax));

                console.log(attackerName, 'damage', damage);

                if (c.abortSignal.aborted) break;

                const exit = randomRange(1, 100) < 5;
                if (exit) {
                    break;
                }

                const cooldownTime = attackSpeed;

                if (cooldownTime) {
                    await WaitForSeconds(c, cooldownTime, c.abortSignal);
                }
            }

            console.log(attackerName, 'call exit');

            return attackerName;
        });
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