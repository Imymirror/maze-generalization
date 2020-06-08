import List from "./List";

export default class RandomQueue<E> implements List<E>{
  private queue:E [];

  public constructor(){
    this.queue = [];
  }

  public push(e:E){
    this.queue.push(e);
  }

  public pop():E {
    if(this.queue.length === 0)
      throw new Error("There's no element to remove in Random Queue");

    let randIndex = Math.floor(Math.random() * this.queue.length);
    
    let randElement = this.queue[randIndex];
    this.queue[randIndex] = this.queue[this.queue.length-1];
    this.queue.pop();

    return randElement;
  }

  public size(){
    return this.queue.length;
  }

  public isEmpty():boolean{
    return this.size() == 0;
  }
}