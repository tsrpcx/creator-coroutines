using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/**
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
*/


public class TestStartSubroutineYieldNull : MonoBehaviour {

	void Start() {
		LogToFile.Log(this.GetType().Name);
		StartCoroutine(mainRoutine());
	}

	public IEnumerator mainRoutine() {
		LogToFile.Log("mainRoutine start");
		StartCoroutine(subRoutine());
		yield return new WaitForEndOfFrame();
		LogToFile.Log("mainRoutine complete");
	}

	public IEnumerator subRoutine() {
		LogToFile.Log("subRoutine start");
		var i = 0;
		while (i < 5) {
			i++;
			LogToFile.Log("subRoutine " + i);
			yield return new WaitForEndOfFrame();
		}

		LogToFile.Log("subRoutine complete");
	}
}
