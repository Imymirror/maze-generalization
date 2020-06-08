export default interface List<E> {
  push(e:E):void;
  pop():E;
  size():number;
  isEmpty(): boolean;
}