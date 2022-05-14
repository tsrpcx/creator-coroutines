import { Component } from "cc";

export async function WaitForSeconds(comp: Component, delay: number, signal: AbortSignal = null) {

    return new Promise((resolve, reject) => {

        let waitForSecondsComplete = function () {
            resolve(null);
        }

        if (signal) {
            if (signal.aborted) waitForSecondsComplete();

            signal.addEventListener('abort', () => {
                comp.unschedule(waitForSecondsComplete);
                waitForSecondsComplete();
            });
        }

        comp.scheduleOnce(waitForSecondsComplete, delay);
    });
}