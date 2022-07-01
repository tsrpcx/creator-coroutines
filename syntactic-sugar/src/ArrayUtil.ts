declare global {
    interface Array<T> {
        clear(): void;
        has(o: T): boolean;
        delete(o: T): void;
        enqueue(o: T): void;
        dequeue(): T;
    }
}

Array.prototype.clear = function (): void {
    this.length = 0;
};

Array.prototype.has = function <T>(o: T): boolean {
    return this.indexOf(o) != -1;
};

Array.prototype.delete = function <T>(o: T): void {
    const i = this.indexOf(o);
    i != -1 && this.splice(i, 1);
};

Array.prototype.enqueue = function <T>(o: T): void {
    this.unshift(o);
};

Array.prototype.dequeue = function <T>(): T | null {
    if (this.length) return this.pop() as T;
    return null;
};

export { };