const { ccclass, property } = cc._decorator;
import { STGame } from "./STGame";

let VisualizationType = cc.Enum({
  "递归DFS深度优先寻路过程演示": 0,
  "非递归DFS深度优先寻路过程演示": 1,
  "非递归DFS寻路过程演示" : 3,
  "非递归BFS寻路过程演示" : 4,
  "非递归BSF基础上随机地图Version1寻路过程演示" : 5,
  "非递归BSF基础上随机地图Version2寻路过程演示" : 6,
  "非递归DFS地图生成过程演示" : 7,
  "非递归BFS地图生成过程演示" : 8,
  "非递归BSF基础上随机地图Version1生成过程演示" : 9,
  "非递归BSF基础上随机地图Version2生成过程演示" : 10,
});

@ccclass
export default class Maze extends cc.Component {

  @property(cc.Sprite)
  graphics: cc.Sprite = null;
  
  @property(cc.SpriteFrame)
  tileSpriteFrame: cc.SpriteFrame = null;

  @property
  地图规模 = 11;

  @property
  地图格子大小 = 20;

  @property({type : cc.Enum(VisualizationType)})
  visualType = VisualizationType["非递归BSF基础上随机地图Version2生成过程演示"];


  onLoad () {
    cc.log('onLoad..')

    let size = this.地图规模;
    if(size % 2 === 0) size += 1;

    STGame.getInstance().loadData(size,this.地图格子大小);
    STGame.getInstance().setTileSpriteFrame(this.tileSpriteFrame);
    STGame.getInstance().initGraphicsNode(this.graphics.node);
    STGame.getInstance().initMap();
    STGame.getInstance().run(this.visualType);
    
  }


  start() {
    
  }
  // update (dt) {}
}

export {VisualizationType};