import List from "./List";

export default class Queue<TData> implements List<TData>{

  private _bottomNode: Node<TData> = undefined;
  private _topNode: Node<TData> = undefined;
  private _count: number = 0;

  public size(): number {
      return this._count;
  }

  public isEmpty(): boolean {
      return this._bottomNode === undefined;
  }

  public push(value: TData): void {
      // create a new Node and add it to the top
      let node = new Node<TData>(value, this._topNode, undefined);

      if (this._topNode !== undefined) {
          // set the "next" property on the top node if it exists
          this._topNode.setNext(node);
      }

      // if there is no bottom node, this is the bottom
      if (this._bottomNode === undefined) {
          this._bottomNode = node;
      }

      // this is always the top node
      this._topNode = node;
      this._count++;
  }

  public pop(): TData {
      // remove the bottom node from the stack.
      // the node at the bottom now is the one after it
      let poppedNode = this._bottomNode;

      // if this node has a next one
      if (poppedNode.next !== undefined ) {
          // as we are popping the node, the next node will no longer have a "previous"
          poppedNode.next.setPrevious(undefined);
      }

      this._bottomNode = poppedNode.next;

      this._count--;
      return poppedNode.data;
  }

  public peek(): TData {
      return this._bottomNode.data;
  }

}

class Node<T> {

  previous: Node<T>;
  next: Node<T>;
  data: T;

  constructor (data: T, previous: Node<T>, next: Node<T>) {
      this.previous = previous;
      this.next = next;
      this.data = data;
  }

  public setNext(next: Node<T>): void {
      this.next = next;
  }

  public setPrevious(previous: Node<T>): void {
      this.previous = previous;
  }

}