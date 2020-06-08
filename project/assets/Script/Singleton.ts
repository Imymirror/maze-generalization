class Singleton {
  private static instance: Singleton;

  public static getInstance<T extends {}>(this: new () => T): T {
    if(!(<any>this).instance){
        (<any>this).instance = new this();
    }
    return (<any>this).instance;
  }
  // public static getInstance() {
  //   if (!Singleton.instance) {
  //     Singleton.instance = new Singleton();
  //   }

  //   return Singleton.instance;
  // }
}

export { Singleton };
