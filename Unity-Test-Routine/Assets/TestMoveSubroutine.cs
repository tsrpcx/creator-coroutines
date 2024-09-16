using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/**
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
*/

public class TestMoveSubroutine : MonoBehaviour {

	void Start() {
		LogToFile.Log(this.GetType().Name);
		StartCoroutine(mainRoutine());
	}

	public IEnumerator mainRoutine() {
		LogToFile.Log("mainRoutine start");
		IEnumerator ie = subRoutine();
		while (ie.MoveNext()) {
			yield return ie.Current;
		}
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
