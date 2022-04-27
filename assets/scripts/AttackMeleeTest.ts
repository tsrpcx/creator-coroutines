
import { _decorator, Component, Node } from 'cc';
import { AttackMelee } from './AttackMelee';
import { CommandProcessor } from './CommandProcessor';
const { ccclass, property } = _decorator;

@ccclass
export class AttackMeleeTest extends Component {

    onEnable() {
        CommandProcessor.i.executeSpecific(this, AttackMelee);
    }

}