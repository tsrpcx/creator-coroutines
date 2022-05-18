using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/**
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
*/

public class TestYieldSubroutine : MonoBehaviour {

	void Start() {
		LogToFile.Log(this.GetType().Name);
		StartCoroutine(mainRoutine());
	}

	public IEnumerator mainRoutine() {
		LogToFile.Log("mainRoutine start");
		yield return subRoutine();
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
