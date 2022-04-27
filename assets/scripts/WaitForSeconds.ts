import { Component } from "cc";

export async function WaitForSeconds(comp: Component, delay: number, signal: AbortSignal = null) {
    return new Promise((resolve, reject) => {

        if (signal) {

            if (signal.aborted) reject('cancel');

            signal.addEventListener('abort', () => {
                comp.unschedule(resolve);
                reject('cancel');
            });

        }

        comp.scheduleOnce(() => resolve(null), delay);
    });
}