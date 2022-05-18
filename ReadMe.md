# Coroutine And Time For Cocos Creator

## Usage

* Coroutine Similar With Unity

```typescript

    start(): void {
		StartCoroutine(this, this.testRoutine());
	}

	*testRoutine() {
		console.log("testRoutine start");
		yield new WaitForSeconds(1);
		console.log("testRoutine complete");
	}

```

* Time Similar With Unity, All timeScale Will be CHANGED after set Time.timeScale

```typescript

    Time.timeScale = 0.5;

```


## Except

```yield return StartCoroutine``` Is diffrent with Unity