export function randomBool(): boolean {
    return Math.random() > 0.5;
}

export function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

const chars = 'abcdefghijklmnopqrstuvwxyz';
export function randomChar(): string {
    let pos = Math.floor(randomRange(0, chars.length));
    return chars.substring(pos, pos + 1);
}

export function randomName(): string {

    let n = '';
    let fl = randomRange(2, 8);
    for (let i = 0; i < fl; i++) {
        if (n.length == 0) {
            n += randomChar().toUpperCase();
        }
        else {
            n += randomChar();
        }
    }

    return n;
}