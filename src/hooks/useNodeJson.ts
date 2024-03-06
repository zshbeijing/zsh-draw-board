import type { Material, Canvas } from '@/type/index'
import { NodeState } from '@/type/index'

// 根据类型获取物料json
export const useCreateJson = (type:Material.MaterialType, offsetX:number, offsetY:number) => {
  const  getId = (length:number) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    return randomString;
  }
  let obj:Canvas.NodeItem = {
    id:getId(12),
    text: "",
    type:type,
    left:offsetX,
    top:offsetY,
    state: NodeState.未激活,
    properties: {}
  }
  return obj
}