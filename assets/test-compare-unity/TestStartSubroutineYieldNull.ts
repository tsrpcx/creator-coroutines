/**
 * unity result
 5.63	TestStartSubroutineYieldNull
 5.63	mainRoutine start
 5.64	subRoutine start
 5.64	subRoutine 1
 5.64	subRoutine 2
 5.64	mainRoutine complete
 5.66	subRoutine 3
 5.67	subRoutine 4
 5.68	subRoutine 5
 5.68	subRoutine complete

 * creator result
1690.431 'TestStartSubroutineYieldNull'
1690.431 'mainRoutine start'
1773.761 'mainRoutine complete'
1773.761 'subRoutine start'
1773.761 'subRoutine 1'
1790.427 'subRoutine 2'
1807.093 'subRoutine 3'
1823.759 'subRoutine 4'
1840.425 'subRoutine 5'
1857.091 'subRoutine complete'
*/

import { Component, _decorator } from "cc";
import { StartCoroutine, waitForNextFrame } from "../src/Coroutine";
import { Time } from "../src/Time";

@_decorator.ccclass
export class TestStartSubroutineYieldNull extends Component {

	start(): void {
		console.log(Time.realtimeSinceStartup, this.constructor.name);
		StartCoroutine(this, this.mainRoutine());
	}

	public *mainRoutine() {
		console.log(Time.realtimeSinceStartup, "mainRoutine start");
		StartCoroutine(this, this.subRoutine());
		yield waitForNextFrame;
		console.log(Time.realtimeSinceStartup, "mainRoutine complete");
	}

	public *subRoutine() {
		console.log(Time.realtimeSinceStartup, "subRoutine start");
		var i = 0;
		while (i < 5) {
			i++;
			console.log(Time.realtimeSinceStartup, "subRoutine " + i);
			yield waitForNextFrame;
		}

		console.log(Time.realtimeSinceStartup, "subRoutine complete");
	}
}
