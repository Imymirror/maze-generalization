import Tile from "./Tile";

enum TILE_TYPE {
  ROAD,
  WALL,
  PATH,
  // MIST, // 迷雾
};

class MazeData {

  public static  TILESIZE:number = 20;

  private n:number;
  private m:number;
  public maze:Tile[][] = [];
  
  public visited:boolean[][] = [];
  public process:Tile[]; // 查找过程
  public inMist:boolean[][] = [];
  public path:Tile[] = [];

  private entranceX:number
  private entranceY:number;
  private exitX:number;
  private exitY:number;  

  public constructor(N:number, M:number){
   
    if( N%2 === 0 && M%2 === 0)
      throw new Error("Our Maze Generalization Algorihtm requires the width and height of the maze are odd numbers")

    this.n = N;
    this.m = M;

    this.entranceX = 1;
    this.entranceY = 0;
    this.exitX = this.n - 2;
    this.exitY = this.m - 1;

    this.process = [];
    this.path = [];
    for(let i = 0 ; i < N ; i ++) {
      this.maze[i] = [];
      this.visited[i] = [];
      this.inMist[i]= [];
      for(let j = 0 ; j < N ; j ++) {
        if(i%2 === 1 && j%2 === 1)
          this.maze[i][j] = new Tile(i, j, TILE_TYPE.ROAD, true);
        else
          this.maze[i][j] = new Tile(i, j, TILE_TYPE.WALL, true);

        this.visited[i][j] = false;
        this.inMist[i][j] = true;
      }
    }

    this.maze[this.entranceX][this.entranceY] = new Tile(this.entranceX, this.entranceY, TILE_TYPE.ROAD);
    this.maze[this.exitX][this.exitY] = new Tile(this.exitX, this.exitY, TILE_TYPE.ROAD);
  }

  public N(){return this.n;}
  public M(){return this.m;}
  public getEentranceX(){return this.entranceX;}
  public getEentranceY(){return this.entranceY;}
  public getExitX(){return this.exitX;}
  public getExitY(){return this.exitY;}
  public getMaze(i:number, j:number){
    if(!this.inArea(i, j))
      throw new Error("i or j is out of index in getMaze!");

    return this.maze[i][j];
  }

  public  inArea( x:number,  y:number):boolean{
    return x >= 0 && x < this.n && y >= 0 && y < this.m;
  }
  public openMist(x:number, y:number){
    if(!this.inArea(x, y))
      throw new Error("i or j is out of index in getMaze!");

    for(let i = x-1 ; i <= x+1; i ++){
      for(let j = y-1 ; j <= y+1; j ++){
        if(this.inArea(i, j)){
          let tile = this.maze[i][j];
          tile.setIsMist(false);

          this.process.push(new Tile(i, j, tile.getType(), false)); 
        }
          
      }
    } 
  }
}

export { MazeData };
export { TILE_TYPE};