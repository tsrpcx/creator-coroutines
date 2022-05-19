using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/**
1.8891	TestWaitUntil
1.8971	mainRoutine start
1.8977	subRoutine start
1.8980	subRoutine 1
2.4839	subRoutine 2
2.5850	subRoutine 3
2.7174	subRoutine 4
2.8295	subRoutine 5
2.9445	subRoutine complete
2.9530	mainRoutine complete
*/

public class TestWaitUntil : MonoBehaviour {

	void Start() {
		LogToFile.Log(this.GetType().Name);
		StartCoroutine(mainRoutine());
	}

	public IEnumerator mainRoutine() {
		LogToFile.Log("mainRoutine start");
		doSomething();
		yield return new WaitUntil(() => subRoutineComplete);
		LogToFile.Log("mainRoutine complete");
	}

	private void doSomething() {
		subRoutineComplete = false;
		StartCoroutine(subRoutine());
	}

	private bool subRoutineComplete = false;
	public IEnumerator subRoutine() {
		LogToFile.Log("subRoutine start");
		var i = 0;
		while (i < 5) {
			i++;
			LogToFile.Log("subRoutine " + i);
			yield return new WaitForSeconds(0.1f);
		}
		subRoutineComplete = true;
		LogToFile.Log("subRoutine complete");
	}
}
