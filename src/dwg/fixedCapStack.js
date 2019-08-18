export default class FixedCapacityStack {
  // A stack with a fixed capacity (specified at instantiation)
  // Stack won't allow pushing when it's already full

  constructor(capacity) {
    if (isNaN(capacity)) throw new Error ("Capacity must be a number");
    else if (!capacity) throw new Error ("Capacity must be larger than 0");
    this.capacity = capacity;
    this.index = 0;
    this.stack = new Array(this.capacity);

    for (let i = 0; i < this.capacity; i++) {
      this.stack[i] = null;
    }
  }

  clear() {
    // Iterate over index in case it's less than capacity
    for (let i = 0; i < this.index; i++) {
      this.stack[i] = null;
    }
    this.index = 0;
  }

  push(item) {
    // Return item we're trying to push when stack is full
    // that way client can check and add item back to their
    // collection as need
    if (this.index === this.capacity) return item;
    this.stack[this.index++] = item;
  }

  pop() {
    // Don't decrement when index is 0
    if (!this.index) return null;

    const item = this.stack[--this.index];
    this.stack[this.index] = null;
    return item;
  }

  forEach(cb) {
    if (typeof cb !== "function") throw new Error("Please pass in a callback");

    for (let i = 0; i < this.capacity; i++) {
      cb(this.stack[i], i);
    }
  }

  map(cb) {
    if (typeof cb !== "function") throw new Error("Please pass in a callback");

    const returnArr = [];
    for (let i = 0; i < this.capacity; i++) {
      returnArr.push(this.stack[i], i, this.stack);
    }

    return returnArr;
  }
}
