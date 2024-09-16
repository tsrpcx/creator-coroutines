
export class AbortSignal {

    public onabort: (() => void)[] = null;
    public aborted = false;

    constructor() {
        this.onabort = [];
        this.aborted = false;
    }

    removeEventListener(handler: () => void) {
        this.onabort.delete(handler);
    }

    addEventListener(handler: () => void) {
        this.onabort.push(handler);
    }

    dispatchEvent() {
        for (const call of this.onabort) {
            if (call && typeof call == 'function') call();
        }
        this.onabort.clear();
    }

    clear() {
        this.onabort.clear();
    }
}

export class AbortController {

    public signal: AbortSignal = null;

    constructor() {
        this.signal = new AbortSignal();
    }

    abort() {
        if (this.signal.aborted) return;

        this.signal.aborted = true;
        this.signal.dispatchEvent();
    }

    clear() {
        this.signal.clear();
    }
}