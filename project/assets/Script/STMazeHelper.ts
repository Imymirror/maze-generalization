import {Singleton} from "./Singleton"
import { MazeData, TILE_TYPE } from "./MazeData";
import Tile from "./Tile";

class STMazeHelper extends Singleton{
  private _tileSpriteFrame:cc.SpriteFrame = null;

  public setTileSpriteFrame(sp:cc.SpriteFrame){
    this._tileSpriteFrame = sp;
  }

  public createTile(pNode:cc.Node, tile:Tile){
    var node = new cc.Node("New Sprite");
    var sprite = node.addComponent(cc.Sprite);
    node.parent = pNode;
    sprite.spriteFrame = this._tileSpriteFrame;

    this.resetTileColor(node,  tile.getType(), tile.getIsMist());

    let TILESIZE = MazeData.TILESIZE;
    node.anchorX = 0;
    node.anchorY = 1;
    node.setContentSize(new cc.Size(TILESIZE, TILESIZE));
    node.x = tile.getY() * TILESIZE;
    node.y = -tile.getX()* TILESIZE;
    return node;
  }
  public resetTileColor(node:cc.Node,  type:TILE_TYPE, isMist:boolean){
    let color = null;

    if(isMist) {
      color = cc.Color.BLACK;
    }else{
      if(type === TILE_TYPE.ROAD) color = cc.Color.WHITE;
      else if(type === TILE_TYPE.WALL) color = cc.Color.BLUE;
      else if(type === TILE_TYPE.PATH) color = cc.Color.RED;
    }

    node.color = color;
  }
  // 递归完毕, 播放查找的过程.
  playProcess(tileNodes:cc.Node[][], process:Tile[], isSleep:boolean = true){
    let self = this;

    async function sleep(ms: number) {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve('');
          }, ms)
      });
    }

    async function playProcess(){
      for (let i = 0; i < process.length; i++) {
        const tile = process[i];
        let node = tileNodes[tile.getX()][tile.getY()];
        self.resetTileColor(node, tile.getType(), tile.getIsMist());
        if(isSleep)
          await sleep(5)
      }
    }
 
    playProcess();
  } 
}

export { STMazeHelper };