import { _decorator, Node } from "cc";
import { Coroutine } from "./Coroutine";
import { randomBool, randomRange } from "./rand";
import { WaitForSeconds } from "./WaitForSeconds";

const { ccclass } = _decorator;

export interface IAttackMeleeData {
    attackerName: string;
    damageMin: number;
    damageMax: number;
    attackSpeed: number;
}

@ccclass
export class AttackMelee extends Coroutine {

    private data: IAttackMeleeData = null;

    public setData(data: IAttackMeleeData) {
        this.data = data;
    }

    public executeRoutine(): void {
        this.asyncRoutine();
    }

    public async asyncRoutine() {

        while (true) {

            if (this.abortSignal.aborted) break;

            const distanceCanReach = randomBool()
            if (!distanceCanReach) {
                console.log(this.data.attackerName, 'distanceCanReach', distanceCanReach);
                continue;
            }

            console.log(this.data.attackerName, 'do attack');

            if (this.abortSignal.aborted) break;

            const damage = Math.floor(randomRange(this.data.damageMin, this.data.damageMax));

            console.log(this.data.attackerName, 'damage', damage);

            if (this.abortSignal.aborted) break;

            const exit = randomRange(1, 100) < 5;
            if (exit) {
                break;
            }

            const cooldownTime = this.data.attackSpeed;

            if (cooldownTime) {
                await WaitForSeconds(this, cooldownTime, this.abortSignal);
            }
        }

        console.log(this.data.attackerName, 'call exit');
        this.exitRoutine(this.data.attackerName);
    }
}