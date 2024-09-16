
import { _decorator, Component, Node, UIOpacity, clamp } from 'cc';
import { StartCoroutine, waitForNextFrame } from '../src/Coroutine';
const { ccclass, property } = _decorator;

@ccclass('TestAlpha')
export class TestAlpha extends Component {

    start() {
        StartCoroutine(this, this.alphaTest());
    }

    *alphaTest() {
        while (true) {
            yield this.alphaTo(0, 10);
            yield this.alphaTo(255, 10);
        }
    }

    private _uiopacity: UIOpacity = null;
    private get uiopacity(): UIOpacity {
        if (!this._uiopacity) this._uiopacity = this.getComponent(UIOpacity) || this.addComponent(UIOpacity);
        return this._uiopacity;
    }

    *alphaTo(to: number, speed: number) {
        while (!this.uiopacity) {
            yield waitForNextFrame;
        }

        const from = this.uiopacity.opacity;
        const step = (from > to ? -1 : 1) * speed;
        let current = from;

        for (; current != to;) {
            current += step;
            current = clamp(current, from, to);
            this.uiopacity.opacity = current;
            yield waitForNextFrame;
        }
    }
}