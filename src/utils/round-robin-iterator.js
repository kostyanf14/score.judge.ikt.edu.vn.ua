class RoundRobinIterator {
  #i = 0;
  #values;

  constructor(values) {
    this.#values = values;
    this.current = undefined;
  }

  next() {
    if (this.#i >= this.#values.length) this.#i = 0;
    return this.current = this.#values[this.#i++];
  }
}

export default RoundRobinIterator;
