import List from "./List";

export default class Stack<TData> implements List<TData>{

  private _topNode: Node<TData> = undefined;
  private _count: number = 0;

  public size(): number {
      return this._count;
  }

  public isEmpty(): boolean {
      return this._topNode === undefined;
  }

  public push(value: TData): void {
      // create a new Node and add it to the top
      let node = new Node<TData>(value, this._topNode);
      this._topNode = node;
      this._count++;
  }

  public pop(): TData {
      // remove the top node from the stack.
      // the node at the top now is the one before it
      let poppedNode = this._topNode;
      this._topNode = poppedNode.previous;
      this._count--;
      return poppedNode.data;
  }

  public peek(): TData {
      return this._topNode.data;
  }

}

class Node<T> {

  previous: Node<T>;
  data: T;

  constructor (data: T, previous: Node<T>) {
      this.previous = previous;
      this.data = data;
  }
}