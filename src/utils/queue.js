class Queue {
  data = [];
  add(record) {
    this.data.unshift(record);
  }
  remove() {
    return this.data.pop();
  }
  last() {
    return this.data[0];
  }
  next() {
    return this.data[this.data.length-1];
  }
  size() {
    return this.data.length;
  }
  clear() {
    this.data = [];
  }
}
export default Queue;