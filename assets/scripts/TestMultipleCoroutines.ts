
import { _decorator, Component } from 'cc';
import { Coroutine, CoroutineRemoveExitCall, CoroutineSetExitCall, StartCoroutine, StopAllCoroutines, StopCoroutine } from './Coroutine';
import { randomBool, randomRange } from './rand';
const { ccclass, property } = _decorator;

@ccclass
export class TestMultipleCoroutines extends Component {

    onEnable() {

        const routines = [];

        CoroutineSetExitCall(this, this.onRoutineExit.bind(this));

        routines.push(StartCoroutine(this, async (c: Coroutine) => {
            const workName = this.node.name + ' work1';
            while (true) {
                await c.WaitForSeconds(c, 0.5);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        }));

        routines.push(StartCoroutine(this, async (c: Coroutine) => {
            const workName = this.node.name + ' work2';
            while (true) {
                await c.WaitForSeconds(c, 0.5);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        }));

        routines.push(StartCoroutine(this, async (c: Coroutine) => {
            const workName = this.node.name + ' work3';
            while (true) {
                await c.WaitForSeconds(c, 0.5);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        }));

        routines.push(StartCoroutine(this, async (c: Coroutine) => {
            const workName = this.node.name + ' work4';
            while (true) {
                await c.WaitForSeconds(c, 0.5);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        }));

        routines.push(StartCoroutine(this, async (c: Coroutine) => {
            const workName = this.node.name + ' work5';
            while (true) {
                await c.WaitForSeconds(c, 0.5);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        }));

        routines.push(StartCoroutine(this, async (c: Coroutine) => {
            const workName = this.node.name + ' work6';
            while (true) {
                await c.WaitForSeconds(c, 0.5);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        }));

        routines.push(StartCoroutine(this, async (c: Coroutine) => {
            const workName = this.node.name + ' work7';
            while (true) {
                await c.WaitForSeconds(c, 0.5);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        }));

        routines.push(StartCoroutine(this, async (c: Coroutine) => {
            const workName = this.node.name + ' work8';
            while (true) {
                await c.WaitForSeconds(c, 0.5);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        }));

        routines.push(StartCoroutine(this, async (c: Coroutine) => {
            const workName = this.node.name + ' work9';
            while (true) {
                await c.WaitForSeconds(c, 0.5);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        }));

        routines.push(StartCoroutine(this, async (c: Coroutine) => {
            const workName = this.node.name + ' work10';
            while (true) {
                await c.WaitForSeconds(c, 0.5);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        }));

        this.scheduleOnce(() => {
            let x = Math.floor(randomRange(0, routines.length));
            StopCoroutine(this, routines[x]);
        }, 3)
    }

    private onRoutineExit(id: string, exitArg?: any): void {
        console.log(exitArg, 'exit');
    }

    protected onDestroy(): void {
        StopAllCoroutines(this);
        CoroutineRemoveExitCall(this);
    }
}