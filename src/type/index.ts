import type { Component } from 'vue'

// 工具类型，将枚举类型转化为联合类型
export declare type EnumToUnion<T extends string | number> = T extends string ? `${T}` : T

export enum DropKey {
    json = "nodeJson"
}
export enum TypeEnum {
    开始 = 'start',
    状态 = 'state',
    条件 = 'condition',
    结束 = 'end'
}

export enum NodeState {
    未激活 = "no active",
    激活 = "active"
}

export enum LineType {
    直线 = "Straight",
    折线 = "Broken",
    贝斯曲线 = "Bezier"
}

export namespace Head {

  
    export interface BtnItem {
        key:string
        label:string
        icon:string
    }
}

export interface GraphProperties {
    r?:number
    width?:number
    height?:number
}
export namespace Material {
   
    export type MaterialType = EnumToUnion<TypeEnum>
    export interface MaterialItem {
        type:MaterialType
        label:string
        img:string
        graphProperties:GraphProperties 
    }
}

export namespace Canvas {
    export type LineStateEnum = EnumToUnion<LineState>
    export interface NodeItem {
        // 组件唯一标识
        id?:string
        // 组件内容
        text:string
        // 组件类型
        type: EnumToUnion<TypeEnum>
        // 组件位置
        left:number
        top:number
        // 组件状态
        state:NodeState
        // 是否可移动
        isDrop:Boolean
        graphProperties:GraphProperties
        properties:Object
    }

    export enum DirectionEnum {
        上 = 'top',
        下 = 'bottom',
        左 = 'left',
        右 = 'right'
    }
    export type Direction = EnumToUnion<DirectionEnum>

    export interface LineItem {
      id:string
      fromId:string
      formDirection:Direction
      toId:string
      toDirection:Direction
      label:string
      lineType: EnumToUnion<LineType>
    }

    export interface CanvasJson {
      nodeList:NodeItem[],
      lineList:LineItem[]
    } 

    export enum LineState {
      开始 = "drawStart",
      进行 = "drawIng",
      结束 = "drawEnd",
    }
}

export namespace GraphNode {
    export interface ComponentList {
        [propName:string]:Component
      }
}