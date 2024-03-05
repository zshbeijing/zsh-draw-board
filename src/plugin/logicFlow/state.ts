// 状态类型
import { RectNode, RectNodeModel } from "@logicflow/core";

class StateModel extends RectNodeModel {
  initNodeData(data:any) {
    super.initNodeData(data);
    this.radius = 8
    this.width = 100
    this.height = 80
  }
}

export default {
  type: "state",
  view: RectNode,
  model: StateModel
}