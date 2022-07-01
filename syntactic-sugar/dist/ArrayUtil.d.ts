declare global {
    interface Array<T> {
        clear(): void;
        has(o: T): boolean;
        delete(o: T): void;
        enqueue(o: T): void;
        dequeue(): T;
    }
}
export {};
