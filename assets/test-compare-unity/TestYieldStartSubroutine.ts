/**
 * unity result
 7.94	TestYieldStartSubroutine
 7.94	mainRoutine start
 7.94	subRoutine start
 7.94	subRoutine 1
 7.94	subRoutine 2
 7.96	subRoutine 3
 7.98	subRoutine 4
 7.99	subRoutine 5
 8.01	subRoutine complete
 8.01	mainRoutine complete

 * creator result
2323.586 'TestYieldStartSubroutine'
2323.586 'mainRoutine start'
2323.586 'mainRoutine complete'
2473.58 'subRoutine start'
2473.58 'subRoutine 1'
2490.246 'subRoutine 2'
2506.912 'subRoutine 3'
2523.578 'subRoutine 4'
2540.244 'subRoutine 5'
2556.91 'subRoutine complete'
*/

import { Component, _decorator } from "cc";
import { StartCoroutine, waitForNextFrame } from "../src/Coroutine";
import { Time } from "../src/Time";

@_decorator.ccclass
export class TestYieldStartSubroutine extends Component {

	start(): void {
		console.log(Time.realtimeSinceStartup, this.constructor.name);
		StartCoroutine(this, this.mainRoutine());
	}

	public *mainRoutine() {
		console.log(Time.realtimeSinceStartup, "mainRoutine start");
		yield StartCoroutine(this, this.subRoutine());
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
