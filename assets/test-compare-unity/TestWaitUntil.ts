/**
 * unity result
1.8891	TestWaitUntil
1.8971	mainRoutine start
1.8977	doSomething start
1.8980	doSomething 1
2.4839	doSomething 2
2.5850	doSomething 3
2.7174	doSomething 4
2.8295	doSomething 5
2.9445	doSomething complete
2.9530	mainRoutine complete


 * creator result
1.8162539999999998 'TestWaitUntil'
1.8162539999999998 'mainRoutine start'
1.8162539999999998 'doSomething start'
1.8162539999999998 'doSomething 1'
2.8328800000000003 'doSomething 2'
3.849506 'doSomething 3'
4.8661319999999995 'doSomething 4'
5.882758 'doSomething 5'
6.899384 'doSomething complete'
6.899384 'result' 5
6.899384 'mainRoutine complete'
*/

import { Component, _decorator } from "cc";
import { Coroutine, StartCoroutine, WaitUntil } from "../src/Coroutine";
import { Time } from "../src/Time";

@_decorator.ccclass
export class TestWaitUntil extends Component {

	start(): void {
		console.log(Time.realtimeSinceStartup, this.constructor.name);
		StartCoroutine(this, this.mainRoutine());
	}

	public *mainRoutine() {
		console.log(Time.realtimeSinceStartup, "mainRoutine start");
		let result = 0;
		yield new WaitUntil(async (c: Coroutine) => {
			result = await this.doSomething(c);
		});
		console.log(Time.realtimeSinceStartup, 'result', result);
		console.log(Time.realtimeSinceStartup, "mainRoutine complete");
	}

	public async doSomething(c: Coroutine) {
		console.log(Time.realtimeSinceStartup, "doSomething start");
		var i = 0;
		while (i < 5) {
			i++;
			console.log(Time.realtimeSinceStartup, "doSomething " + i);
			await c.asyncWaitForSeconds(1);
		}
		console.log(Time.realtimeSinceStartup, "doSomething complete");
		return i;
	}
}
