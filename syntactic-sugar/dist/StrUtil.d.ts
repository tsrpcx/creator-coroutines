declare global {
    interface String {
        padZero(length: number): string;
        isIDcard(): boolean;
        isPhoneNum(): boolean;
        isChinese(): boolean;
        isLetterOrNumbers(): boolean;
        trimStartChar(n: Array<string> | string): string;
        trimEndChar(n: Array<string> | string): string;
        trimBoth(n: Array<string> | string): string;
        combineUrl(...args: string[]): string;
        cut2array(len: number, fromeEnd?: boolean): Array<string>;
        htmlDecode(): string;
        addUrlParams(obj: {
            [key: string]: any;
        }): string;
        hashCode(): number;
    }
    interface StringConstructor {
        timestr(): string;
        naturalCompare(a: string, b: string, alphabet?: string): number;
        isNullOrEmpty(str: string): boolean;
    }
}
export {};
