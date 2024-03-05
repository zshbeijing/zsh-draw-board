// CustomRectNode.js
import { CircleNode, CircleNodeModel, h } from "@logicflow/core";

// 提供节点 svg dom
class CustomCircleNode extends CircleNode {

    override getShape() {
        const { model, graphModel } = this.props;
        const { x, y, r } = model
        const { fill, stroke, strokeWidth } = model.getNodeStyle()
        return h('g', {},
            [
                h(
                    'circle',
                    {
                        cx: x,
                        cy: y,
                        r,
                        fill,
                        stroke,
                        strokeWidth,
                    }
                ),
                h(
                    'circle',
                    {
                        cx: x,
                        cy: y,
                        r: r - 7,
                        fill:stroke,
                        stroke,
                        strokeWidth,
                    }
                )
            ]
        )
    }

}

// 提供节点的样式
class CustomCircleModel extends CircleNodeModel {

    override initNodeData(data:any) {
       
        /**
         * 实际就是对于图形SVG的属性
         * http://logic-flow.org/guide/basic/node.html#%E8%AE%A4%E8%AF%86logicflow%E7%9A%84%E5%9F%BA%E7%A1%80%E8%8A%82%E7%82%B9
         */
        // 强制节点文本不居中，而是在节点下面
        if (!data.text || typeof data.text === "string") {
          data.text = {
          value: data.text || "",
          x: data.x,
          y: data.y + 30
          }
        }
        super.initNodeData(data);
        this.r = 15;
    }

    override getNodeStyle() {
        const style = super.getNodeStyle();
        style.stroke = '#000';
        style.fill = 'transparent';
        style.strokeWidth = 4;
        return style;
    }
    
    // 自定义连线规则
    override getConnectedSourceRules() {
        const rules = super.getConnectedSourceRules()
        const notAsTarget = {
            message: '终止节点不能作为连线的起点',
            validate: () => false
        }
        rules.push(notAsTarget)
        return rules
    }
}

export default {
    type: "end",
    view: CustomCircleNode,
    model: CustomCircleModel
}