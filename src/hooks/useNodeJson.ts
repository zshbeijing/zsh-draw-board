import type { Material, Canvas } from '@/type/index'
import { NodeState } from '@/type/index'

// 根据类型获取物料json
export const useCreateJson = (json:Material.MaterialItem, offsetX:number, offsetY:number,viewWidth:number,viewHeight:number) => {
  const  getId = (length:number) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    return randomString;
  }
  let newLeft,newTop
  console.log("viewWidth",viewWidth,viewHeight);
  
  const { r ,width,height } = json.graphProperties
  if (r) {
    newLeft = getCoordinate(offsetX,viewWidth,r)
    newTop = getCoordinate(offsetY,viewHeight, r)
  } else if (width && height) {
    newLeft = getCoordinate(offsetX,viewWidth, width / 2)
    newTop = getCoordinate(offsetY, viewHeight, height / 2)
  }

  function getCoordinate(offset:number,view:number,node:number) {
    let point
    if ( 0< offset - node && offset + node < view ) {
      point = offset - node
    } else if (offset - node < 0) {
      point = 0
    } else {
      point = node * 2
    }
    return point
  }


  let obj:Canvas.NodeItem = {
    id:getId(12),
    text: "节点",
    type: json.type,
    left: newLeft!,
    top:  newTop!,
    state: NodeState.未激活,
    isDrop:true,
    graphProperties: json.graphProperties,
    properties: {
    }
  }
  return obj
}