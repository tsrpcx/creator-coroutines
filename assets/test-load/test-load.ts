
import { _decorator, Component, Node, Prefab, instantiate, UITransform } from 'cc';
import { StartCoroutine, waitForNextFrame, WaitForSeconds, WaitUntil } from '../src/Coroutine';
import { loadAsset } from '../src/Load';
import { Random } from '../src/Random';
const { ccclass, property } = _decorator;

const padding = 10;
const margin = 10;

@ccclass('TestLoad')
export class TestLoad extends Component {

    @property(Node)
    private loading: Node = null;

    showLoading() {
        if (this.loading) {
            this.loading.active = true;
        }
    }

    removeLoading() {
        if (this.loading) {
            this.loading.active = false;
        }
    }

    private _ut: UITransform = null;
    private get ut(): UITransform {
        if (!this._ut) this._ut = this.getComponent(UITransform);
        return this._ut;
    }

    onEnable() {

        let col = Random.RangeInt(3, 6);
        let row = Random.RangeInt(3, 6);

        StartCoroutine(this, this.loadNodes(col, row));
    }

    *loadNodes(col: number, row: number) {

        console.log('col', col, 'row', row);

        let prefab: Prefab = null;
        let tryCount = 3;

        this.showLoading();
        yield waitForNextFrame;

        while (!prefab && tryCount > 0) {
            yield new WaitUntil(async () => {
                prefab = await loadAsset('bundle-wtf', 'cell') as Prefab;
            });
            tryCount--;
        }

        if (!prefab) {
            console.error('TestLoad no prefab loaded');
            return;
        }

        yield new WaitForSeconds(0.5);

        this.removeLoading();

        let cellUt = prefab.data.getComponent(UITransform);
        this.ut.width = margin + (cellUt.width * row) + (padding * (row - 1)) + margin;
        this.ut.height = margin + (cellUt.height * col) + (padding * (col - 1)) + margin;

        yield waitForNextFrame;

        let top = this.ut.height / 2;
        top -= margin;

        for (let y = 0; y < col; y++) {
            let ypos = top - (cellUt.height / 2);
            top -= cellUt.height;
            top -= padding;

            let left = - (this.ut.width / 2) + margin;
            for (let x = 0; x < row; x++) {
                let xpos = left + (cellUt.width / 2);
                left += cellUt.width;
                left += padding;

                let n = instantiate(prefab.data) as Node;
                n.parent = this.node;
                n.setPosition(xpos, ypos);
            }
        }
    }
}