
import { _decorator, Component } from 'cc';
import { Coroutine } from './Coroutine';
import { CoroutineExecutor, StartCoroutineWith } from './CoroutineExecutor';
import { randomBool, randomRange } from './rand';
import { WaitForSeconds } from './WaitForSeconds';
const { ccclass, property } = _decorator;

@ccclass
export class TestMultipleCoroutines extends Component {

    onEnable() {

        StartCoroutineWith(this, async (c: Coroutine) => {
            const workName = 'work1';
            while (true) {
                await WaitForSeconds(c, 0.5, c.abortSignal);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        });

        StartCoroutineWith(this, async (c: Coroutine) => {
            const workName = 'work2';
            while (true) {
                await WaitForSeconds(c, 0.2, c.abortSignal);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        });

        StartCoroutineWith(this, async (c: Coroutine) => {
            const workName = 'work3';
            while (true) {
                await WaitForSeconds(c, 0.5, c.abortSignal);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        });

        StartCoroutineWith(this, async (c: Coroutine) => {
            const workName = 'work4';
            while (true) {
                await WaitForSeconds(c, 0.8, c.abortSignal);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        });

        StartCoroutineWith(this, async (c: Coroutine) => {
            const workName = 'work5';
            while (true) {
                await WaitForSeconds(c, 0.7, c.abortSignal);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        });

        StartCoroutineWith(this, async (c: Coroutine) => {
            const workName = 'work6';
            while (true) {
                await WaitForSeconds(c, 0.4, c.abortSignal);
                console.log(workName, 'do some work');
                if (randomRange(1, 100) < 10) break;
            }

            return workName;
        });
    }

    onCoroutineExecutorRoutineExit(id: string, exitArg?: any): void {
        console.log(exitArg, 'exit');
    }
}