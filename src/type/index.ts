// 工具类型，将枚举类型转化为联合类型
export declare type EnumToUnion<T extends string | number> = T extends string ? `${T}` : T

export enum DropKey {
    json = "nodeJson"
}
export enum DefaultText {

}
export enum TypeEnum {
    // 框架默认属性
    矩形 = 'rect',
    圆形 = 'circle',
    椭圆 = 'ellipse',
    多边形 = 'polygon',
    菱形 = 'diamond',
    文本 = "text",
    HTML = "html",
    // 自定义属性
    开始 = 'start',
    状态 = 'state',
    条件 = 'condition',
    结束 = 'end',
}

export enum NodeState {
    未激活 = "no active",
    激活 = "active"
}

export enum LineType {
    直线 = "line",
    折线 = "polyline",
    贝斯曲线 = "bezier"
}

export namespace Head {
    export interface BtnItem {
        key:string
        label:string
        icon:string
    }
}

export namespace Material {
   
    export type MaterialType = EnumToUnion<TypeEnum>
    export interface MaterialItem {
        type:MaterialType
        label:string
        img:string
    }
}

export namespace Canvas {
    export interface NodeItem {
        // 组件唯一标识
        id:string
        // 组件类型
        type: EnumToUnion<TypeEnum>
        // 组件位置
        text:string
        properties:Object
    }

    export interface LineItem {
      sourceNodeId:string
      targetNodeId:string
      text:string
      type: EnumToUnion<LineType>
    }

    export interface CanvasJson {
      nodes:NodeItem[],
      edges:LineItem[]
    } 

    export interface LogicFlowOptions {
        container:HTMLElement
        [propName: string]:any
    }
}