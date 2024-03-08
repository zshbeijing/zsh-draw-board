import type { Material } from "@/type"
export const List:Material.MaterialItem[] = [
  {
    type: "start",
    label: "开始",
    img: "start",
    graphProperties: {
      r: 35
    }
  },
  {
    type: "state",
    label: "状态",
    img: "state",
    graphProperties: {
      width: 100,
      height: 70
    }
  },
  {
    type: "condition",
    label: "条件",
    img: "condition",
    graphProperties: {
      width: 100,
      height: 70
    }
  },
  {
    type: "end",
    label: "结束",
    img: "end",
    graphProperties: {
      r: 35
    }
  }
]