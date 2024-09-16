
import { _decorator, Component, instantiate, Node, Label, Layout, Vec3, __private } from 'cc';
import { Coroutine, CoroutineRemoveExitCall, CoroutineSetExitCall, StartCoroutine, StopAllCoroutines, StopCoroutine } from '../src/Coroutine';
import { randomBool, randomRange } from './rand';
const { ccclass, property } = _decorator;

@ccclass
export class TestAddOrRemove extends Component {

    @_decorator.property({ type: Node })
    private prefab: Node = null;

    @_decorator.property({ type: Label })
    private nodeCount: Label = null;

    @_decorator.property({ type: Layout })
    private layout: Layout = null;

    public add() {
        const node = instantiate(this.prefab);
        node.name = '' + this.node.children.length;
        node.parent = this.node;
        node.setPosition(Vec3.ZERO);
        node.active = true;

        this.nodeCount.string = '' + this.node.children.length;

        this.layout.updateLayout();
    }

    public remove() {
        if (this.node.children.length) {
            let x = Math.floor(randomRange(0, this.node.children.length));
            this.node.children[x].destroy();
        }

        this.nodeCount.string = '' + this.node.children.length;
    }

    start() {
        this.node.on(Node.EventType.CHILD_REMOVED, this.childeChaged, this);
    }

    childeChaged() {
        this.nodeCount.string = '' + this.node.children.length;
    }
}