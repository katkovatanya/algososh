type TStack<T> = {
  push(value: T): void;
  pop(): void;
  clear(): void;
  getElements(): T[];
  getSize(): number;
};

export default class Stack<T> implements TStack<T> {
  head: number | null;
  array: T[];

  constructor() {
    this.head = null;
    this.array = [];
  }
  push(item: T) {
    this.array.push(item);
    this.head === null ? (this.head = 0) : this.head++;
  }
  pop() {
    this.array.pop();
  }
  clear() {
    this.array = [];
  }
  getElements = () => {
    return this.array;
  };
  getSize = () => {
    return this.array.length;
  };
}
