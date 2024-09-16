
import { _decorator, Component } from 'cc';
import { Coroutine, CoroutineRemoveExitCall, CoroutineSetExitCall, StartCoroutine, StopAllCoroutines, StopCoroutine, WaitForNextFrame, WaitForSeconds } from '../src/Coroutine';
import { randomBool, randomRange } from './rand';
const { ccclass, property } = _decorator;

@ccclass
export class TestMultipleCoroutines extends Component {

    *test0(name: string, i: number): Generator {

        let x = i;
        while (x < 3) {
            console.log(name, 'test0', x++);

            yield new WaitForSeconds(1);
        }

        yield this.test1(name, x);
    }

    *test1(name: string, j: number): Generator {

        let x = j;
        while (x < 6) {
            console.log(name, 'test1', x++);
            yield new WaitForSeconds(0.5);
        }

        const gen = this.test2(name, x);
        let hasNext = true;
        while (hasNext) {

            const vd = gen.next();

            hasNext = !vd.done;
            yield vd.value;
        }

        yield new WaitForNextFrame();
    }

    *test2(name: string, j: number): Generator {

        let x = j;
        while (x < 10) {
            console.log(name, 'test2', x++);
            yield new WaitForSeconds(0.2);
        }
    }

    private routines: string[] = [];

    onEnable() {
        this.scheduleOnce(() => {

            CoroutineSetExitCall(this, this.onRoutineExit.bind(this));

            for (let i = 0; i < 10; i++)
                this.routines.push(StartCoroutine(this, this.test0('' + i, 1)));

            this.scheduleOnce(() => {
                let x = Math.floor(randomRange(0, this.routines.length));
                console.log('cancel', this.routines[x]);
                StopCoroutine(this, this.routines[x]);
            }, 2)
        }, 0.1);
    }

    private onRoutineExit(id: string, exitArg?: any): void {
        console.log('onRoutineExit', id);

        const index = this.routines.indexOf(id);
        index > -1 && this.routines.splice(index, 1);

        if (!this.routines.length) this.node.destroy();
    }
}