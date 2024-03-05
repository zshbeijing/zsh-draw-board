// 开始类型
import { CircleNode, CircleNodeModel  } from '@logicflow/core'

class StartModel extends CircleNodeModel {
  initNodeData(data:any) {
    // 强制节点文本不居中，而是在节点下面
    if (!data.text || typeof data.text === "string") {
      data.text = {
        value: data.text || "",
        x: data.x,
        y: data.y + 30
      }
    }
    super.initNodeData(data);
    // 设置节点半径
    this.r = 15
  }
}

export default {
  type: "start",
  view: CircleNode,
  model: StartModel
}

