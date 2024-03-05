// 选择类型
import { DiamondNode, DiamondNodeModel  } from "@logicflow/core";

class ConditionModel extends DiamondNodeModel {
  initNodeData(data:any) {
    super.initNodeData(data);
    this.rx = 60
    this.ry = 30
  }
}

export default {
  type: "condition",
  view: DiamondNode,
  model: ConditionModel
}