Array.prototype.clear = function () {
    this.length = 0;
};
Array.prototype.has = function (o) {
    return this.indexOf(o) != -1;
};
Array.prototype.delete = function (o) {
    const i = this.indexOf(o);
    i != -1 && this.splice(i, 1);
};
Array.prototype.enqueue = function (o) {
    this.unshift(o);
};
Array.prototype.dequeue = function () {
    if (this.length)
        return this.pop();
    return null;
};
export {};
