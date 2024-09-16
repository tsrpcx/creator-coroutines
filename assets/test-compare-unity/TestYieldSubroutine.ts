/**
 * unity result
10.39	TestYieldSubroutine
10.39	mainRoutine start
10.39	subRoutine start
10.40	subRoutine 1
10.40	subRoutine 2
10.41	subRoutine 3
10.42	subRoutine 4
10.63	subRoutine 5
10.65	subRoutine complete
10.65	mainRoutine complete

1879.605 'TestYieldSubroutine'
1879.605 'mainRoutine start'
1879.605 'subRoutine start'
1879.605 'subRoutine 1'
1979.601 'subRoutine 2'
1996.267 'subRoutine 3'
2012.933 'subRoutine 4'
2029.599 'subRoutine 5'
2046.265 'subRoutine complete'
2046.265 'mainRoutine complete'
*/

import { Component, _decorator } from "cc";
import { StartCoroutine, waitForNextFrame } from "../src/Coroutine";
import { Time } from "../src/Time";

@_decorator.ccclass
export class TestYieldSubroutine extends Component {

	start(): void {
		console.log(Time.realtimeSinceStartup, this.constructor.name);
		StartCoroutine(this, this.mainRoutine());
	}

	public *mainRoutine() {
		console.log(Time.realtimeSinceStartup, "mainRoutine start");
		yield this.subRoutine();
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
