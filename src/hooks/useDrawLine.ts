import { getId } from '@/until/index'
import { Canvas } from '@/type/index'
export const useDrawLine = () => {
  function InitLineJson () {
    const json:Canvas.LineItem = {
      id: getId(12),
      fromId: "",
      formDirection: "left",
      toDirection: "left",
      label: "",
      toId: "",
      lineType: "Straight"
    }
    return json
  }
  return {
    InitLineJson
  }
}