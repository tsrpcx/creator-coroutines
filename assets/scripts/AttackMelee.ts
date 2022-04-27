import { _decorator, Node } from "cc";
import { Command } from "./Command";
import { WaitForSeconds } from "./WaitForSeconds";

const { ccclass } = _decorator;

function randomBool(): boolean {
    return Math.random() > 0.5;
}

function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

@ccclass
export class AttackMelee extends Command {

    public setData(data: any) {
        console.log('AttackMelee.setData', data);
    }

    public executeRoutine(): void {
        this.asyncRoutine();
    }

    public async asyncRoutine() {

        do {

            const distanceCanReach = randomBool()
            if (!distanceCanReach) {
                console.log(this.node.name, 'distanceCanReach', distanceCanReach);
                break;
            }

            const atkDelay = randomRange(0, 2);

            if (atkDelay) {
                await WaitForSeconds(this, atkDelay, this._abortController.signal);
            }

            console.log(this.node.name, 'atk');

            const targetDead = randomBool()

            if (targetDead) {
                console.log(this.node.name, 'targetDead', targetDead);
                break;
            }

            if (this._abortController.signal.aborted) break;

            const damage = randomRange(100, 500);
            console.log(this.node.name, 'damage', damage);

            if (this._abortController.signal.aborted) break;

            const cleaveDamagePct = randomRange(0, 1);

            if (cleaveDamagePct > 0) {
                console.log(this.node.name, 'cleaveDamage', damage * cleaveDamagePct);
            }

            if (this._abortController.signal.aborted) break;

            const cooldownTime = randomRange(0, 2);

            if (cooldownTime) {
                await WaitForSeconds(this, cooldownTime);
            }
        }
        while (false);

        console.log(this.node.name, 'asyncRoutine exit');
        this.onExit && this.onExit(this.routineId);
    }
}