/**
 * unity result
 3.52	TestMoveSubroutine
 3.53	mainRoutine start
 3.53	subRoutine start
 3.53	subRoutine 1
 3.53	subRoutine 2
 3.63	subRoutine 3
 3.64	subRoutine 4
 3.65	subRoutine 5
 3.95	subRoutine complete
 3.95	mainRoutine complete

 * creator result
1664.051 'TestMoveSubroutine'
1664.051 'mainRoutine start'
1664.051 'subRoutine start'
1664.051 'subRoutine 1'
1747.381 'subRoutine 2'
1764.047 'subRoutine 3'
1780.713 'subRoutine 4'
1797.379 'subRoutine 5'
1814.045 'subRoutine complete'
1814.045 'mainRoutine complete'
*/

import { Component, _decorator } from "cc";
import { StartCoroutine, waitForNextFrame } from "../src/Coroutine";
import { Time } from "../src/Time";

@_decorator.ccclass
export class TestMoveSubroutine extends Component {

	start(): void {
		console.log(Time.realtimeSinceStartup, this.constructor.name);
		StartCoroutine(this, this.mainRoutine());
	}

	public *mainRoutine() {
		console.log(Time.realtimeSinceStartup, "mainRoutine start");
		const ie = this.subRoutine();
		let hasNext = true;
		while (hasNext) {
			const vd = ie.next();
			hasNext = !vd.done;
			yield vd.value;
		}
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
