import type { Material, Canvas } from '@/type/index'
import {  TypeEnum } from '@/type/index'

import { NodeState } from '@/type/index'

// 根据类型获取物料json
export const useCreateJson = (type:Material.MaterialType) => {
  const  getId = (length:number) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    return randomString;
  }
  // 获取对应枚举类型的key
  let text = ""
  switch (type) {
    case TypeEnum.开始:
      text = "开始";
      break;
    case TypeEnum.结束:
      text = "结束";
      break;
    case TypeEnum.条件:
      text = "条件";
      break;
    case TypeEnum.状态:
      text =  "状态";
      break;
    default:
      text = "节点"
      break;
  }
  let obj:Canvas.NodeItem = {
    id:getId(12),
    type:type,
    text,
    properties:{}
  }
  return obj
}