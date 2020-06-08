import { TILE_TYPE } from "./MazeData";

export default class Tile {

  private x:number;
  private y:number;
  private prev:Tile;
  private type:TILE_TYPE;
  private isMist:boolean;

  public constructor( x:number, y:number, type:TILE_TYPE, isMist?:boolean){
      this.x = x;
      this.y = y;
      this.type = type;
      this.isMist = isMist;
  }

  public getX(){return this.x;}
  public getY(){return this.y;}
  public getPrev():Tile{return this.prev;}
  public getType():TILE_TYPE{return this.type;}
  public setType(type:TILE_TYPE){this.type = type;}
  public getIsMist(){return this.isMist;}
  public setIsMist(b:boolean){this.isMist = b}
}
