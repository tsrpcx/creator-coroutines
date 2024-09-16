using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/**
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
*/


public class TestYieldStartSubroutine : MonoBehaviour {

	void Start() {
		LogToFile.Log(this.GetType().Name);
		StartCoroutine(mainRoutine());
	}

	public IEnumerator mainRoutine() {
		LogToFile.Log("mainRoutine start");
		yield return StartCoroutine(subRoutine());
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
