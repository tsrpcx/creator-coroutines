
import { _decorator, Component, instantiate, Node, Label } from 'cc';
import { Coroutine, CoroutineRemoveExitCall, CoroutineSetExitCall, StartCoroutine, StopAllCoroutines, StopCoroutine } from './Coroutine';
import { randomBool, randomRange } from './rand';
const { ccclass, property } = _decorator;

@ccclass
export class TestAddOrRemove extends Component {

    @_decorator.property({ type: Node })
    private prefab: Node = null;

    @_decorator.property({ type: Label })
    private nodeCount: Label = null;

    public nodeList: Node[] = [];

    public add() {
        const node = instantiate(this.prefab);
        node.parent = this.node;
        node.name = '' + this.nodeList.length;
        this.nodeList.push(node);
        node.active = true;

        this.nodeCount.string = '' + this.nodeList.length;
    }

    public remove() {
        if (this.nodeList.length) {
            let x = Math.floor(randomRange(0, this.nodeList.length));
            this.nodeList[x].destroy();
            this.nodeList.splice(x, 1);
        }

        this.nodeCount.string = '' + this.nodeList.length;
    }
}