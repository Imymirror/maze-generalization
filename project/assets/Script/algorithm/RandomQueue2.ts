import List from "./List";

export default class RandomQueue2<E> implements List<E>{
  private queue:E [];

  public constructor(){
    this.queue = [];
  }

  public push(e:E){
    if(Math.random() < 0.5)
      this.queue.unshift(e);
    else
      this.queue.push(e);
  }

  public pop():E {
    if(this.queue.length === 0)
      throw new Error("There's no element to remove in Random Queue");

    if(Math.random() < 0.5)
      return this.queue.shift();
    else
      return this.queue.pop();
  }

  public size(){
    return this.queue.length;
  }

  public isEmpty():boolean{
    return this.size() == 0;
  }
}