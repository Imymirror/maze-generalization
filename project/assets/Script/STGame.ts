import {Singleton} from "./Singleton"
import { STMazeHelper } from "./STMazeHelper";
import { MazeData, TILE_TYPE } from "./MazeData";
import Tile from "./Tile";
import Stack from "./algorithm/Stack";
import Queue from "./algorithm/Queue";
import RandomQueue from "./algorithm/RandomQueue";
import RandomQueue2 from "./algorithm/RandomQueue2";
import List from "./algorithm/List";
import { VisualizationType } from "./Maze";

class STGame extends Singleton{
  private _tileNodes:cc.Node [][] = [];
  private _mazeData:MazeData = null;
  private _graphicsNode: cc.Node;

  private d:number [][] = [[-1,0], [0,1], [1,0], [0,-1]]; // 四个方向偏移量

  public loadData(size:number, tilesize:number){
    let N:number = size; 
    let M:number = size;
    if(tilesize != null){
      MazeData.TILESIZE = tilesize;
    }
    this._mazeData = new MazeData(N, M);
  }

  public setTileSpriteFrame(sp:cc.SpriteFrame){
    STMazeHelper.getInstance().setTileSpriteFrame(sp);
  }

  public initGraphicsNode(node:cc.Node){
    this._graphicsNode = node; 

    this._graphicsNode.setContentSize(MazeData.TILESIZE * this._mazeData.N(), MazeData.TILESIZE * this._mazeData.M());

    this._graphicsNode.x = -MazeData.TILESIZE * this._mazeData.N() / 2;
    this._graphicsNode.y = MazeData.TILESIZE * this._mazeData.M() / 2;
  }

  public initMap(){
    let line = this._mazeData.N();
    let row = this._mazeData.M();

    // 绘制地图
    for (let i = 0; i < line; i++) {
      this._tileNodes[i] = [];
      for (let j = 0; j < row; j++) {
        let tile = this._mazeData.getMaze(i, j);

        let node = STMazeHelper.getInstance().createTile(this._graphicsNode, tile);
        this._tileNodes[i][j] = node;
      }        
    } 
  }

  public run(type:number){
    if(type === VisualizationType.递归DFS深度优先寻路过程演示){
      this.dfsRecursion();
      this.findPath();
    }
    else if(type === VisualizationType.非递归DFS深度优先寻路过程演示){
      this.dfsNonRecursion();
      this.findPath();
    }
    else if(type === VisualizationType.非递归DFS寻路过程演示){
      let algo = new Stack<Tile>();
      this.algoNonRecursion(algo); 
      this.findPath();
    }
    else if(type === VisualizationType.非递归BFS寻路过程演示){
      let algo = new Queue<Tile>();
      this.algoNonRecursion(algo); 
      this.findPath();
    }
    else if(type === VisualizationType.非递归BSF基础上随机地图Version1寻路过程演示){
      let algo = new RandomQueue<Tile>();
      this.algoNonRecursion(algo); 
      this.findPath();
    }
    else if(type === VisualizationType.非递归BSF基础上随机地图Version2寻路过程演示){
      let algo = new RandomQueue2<Tile>();
      this.algoNonRecursion(algo); 
      this.findPath();
    }
    else if(type === VisualizationType.非递归DFS地图生成过程演示){
      let algo = new Stack<Tile>();
      this.algoNonRecursion(algo); 
      STMazeHelper.getInstance().playProcess(this._tileNodes, this._mazeData.process, true);
    }
    else if(type === VisualizationType.非递归BFS地图生成过程演示){
      let algo = new Queue<Tile>();
      this.algoNonRecursion(algo); 
      STMazeHelper.getInstance().playProcess(this._tileNodes, this._mazeData.process, true)
    }
    else if(type === VisualizationType.非递归BSF基础上随机地图Version1生成过程演示){
      let algo = new RandomQueue<Tile>();
      this.algoNonRecursion(algo); 
      STMazeHelper.getInstance().playProcess(this._tileNodes, this._mazeData.process, true)
    }
    else if(type === VisualizationType.非递归BSF基础上随机地图Version2生成过程演示){
      let algo = new RandomQueue2<Tile>();
      this.algoNonRecursion(algo); 
      STMazeHelper.getInstance().playProcess(this._tileNodes, this._mazeData.process, true)
    }

    // this.dfsRecursion();
    // this.dfsNonRecursion();
    // let algo = new RandomQueue2<Tile>();
    // this.algoNonRecursion(algo);
    // STMazeHelper.getInstance().playProcess(this._tileNodes, this._mazeData.process, false);
    // STMazeHelper.getInstance().playProcess(this._tileNodes, this._mazeData.process, true);

    // this.findPath();
  }
  private dfsFindPath(x:number, y:number):boolean{

    this._mazeData.visited[x][y] = true;
    this._mazeData.path.push(new Tile(x, y, TILE_TYPE.PATH, false)); 

    if(x === this._mazeData.getExitX() && y === this._mazeData.getExitY()){
      return true;
    }

    for(let i = 0 ; i < 4; i ++){
      let newX = x + this.d[i][0];
      let newY = y + this.d[i][1];
     
      if( this._mazeData.inArea(newX, newY) && 
                    this._mazeData.maze[newX][newY].getType() == TILE_TYPE.ROAD &&
                    !this._mazeData.visited[newX][newY])
        if(this.dfsFindPath(newX, newY)) return true;
    }

    let type = this._mazeData.maze[x][y].getType()
    this._mazeData.path.push(new Tile(x, y, type, false)); 
    return false;
  }
  private findPath(){
    for(let i = 0 ; i < this._mazeData.N(); i ++){
      for(let j = 0 ; j < this._mazeData.M(); j ++){
        this._mazeData.visited[i][j] = false;
      }
    }
    this.dfsFindPath(this._mazeData.getEentranceY(), this._mazeData.getEentranceY());
    STMazeHelper.getInstance().playProcess(this._tileNodes, this._mazeData.path ,true);
  }
  private algoNonRecursion(algo:List<Tile>){
    let queue:List<Tile> = algo;

    let first = new Tile(this._mazeData.getEentranceX(), this._mazeData.getEentranceY() + 1,TILE_TYPE.ROAD, false);
    queue.push(first);
    this._mazeData.visited[first.getX()][first.getY()] = true;
    this._mazeData.openMist(first.getX(), first.getY());

    while(!queue.isEmpty()){
      let curPos = queue.pop();

      let x = curPos.getX();
      let y = curPos.getY();
      for(let i = 0 ; i < 4; i ++){
        let newX = x + this.d[i][0]*2;
        let newY = y + this.d[i][1]*2;
  
        if(this._mazeData.inArea(newX, newY) && !this._mazeData.visited[newX][newY]){
          queue.push(new Tile(newX , newY, TILE_TYPE.ROAD, false))
          this._mazeData.visited[newX][newY] = true;
          this._mazeData.openMist(newX, newY);
          this.setData(curPos.getX() + this.d[i][0] , curPos.getY() + this.d[i][1]);
        }
      } 
    }
  }
  private dfsNonRecursion(){
    let stack:Stack<Tile> = new Stack<Tile>();

    let first = new Tile(this._mazeData.getEentranceX(), this._mazeData.getEentranceY() + 1,TILE_TYPE.ROAD);
    stack.push(first);
    this._mazeData.visited[first.getX()][first.getY()] = true;

    while(!stack.isEmpty()){
      let curPos = stack.pop();

      let x = curPos.getX();
      let y = curPos.getY();
      for(let i = 0 ; i < 4; i ++){
        let newX = x + this.d[i][0]*2;
        let newY = y + this.d[i][1]*2;
  
        if(this._mazeData.inArea(newX, newY) && !this._mazeData.visited[newX][newY]){
          stack.push(new Tile(newX , newY, TILE_TYPE.ROAD))
          this._mazeData.visited[newX][newY] = true;
          this.setData(curPos.getX() + this.d[i][0] , curPos.getY() + this.d[i][1]);
        }
      } 

    }
  }
  private dfsRecursion(){
    this.go(this._mazeData.getEentranceX(), this._mazeData.getEentranceY() + 1);
  }
  private go(x:number, y:number):void{
    if(!this._mazeData.inArea(x, y))
      throw new Error("x,y are out of index in go function!");

    this._mazeData.visited[x][y] = true;

    for(let i = 0 ; i < 4; i ++){
      let newX = x + this.d[i][0]*2;
      let newY = y + this.d[i][1]*2;

      if(this._mazeData.inArea(newX, newY) && !this._mazeData.visited[newX][newY]){
        this.setData(x + this.d[i][0], y + this.d[i][1]);
        this.go(newX, newY);
      }
    }
  }

  private setData(x:number, y:number){
    if(this._mazeData.inArea(x, y)){
      let tile = this._mazeData.maze[x][y];
      tile.setType(TILE_TYPE.ROAD);
      this._mazeData.process.push(new Tile(x, y, TILE_TYPE.ROAD, false));
    }
  }
} 

export { STGame };
