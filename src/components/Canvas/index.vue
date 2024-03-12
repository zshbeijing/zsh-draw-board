<template>
  <div ref="canvasRef" class="canvas_wrapper" @drop="dropNow($event)" @dragover="dragOver($event)"
  @dblclick="clearHandler"
  >
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <GraphNode
        :id="`${item.id}`"
        v-for="item in canvasJson.nodeList"
        :node="item"
        :activeId="activeId"
        @click="activeNodeHandler(item)"
        @down="mousedownHandler"
        @up="mouseupHandler"
      />
      <Line 
      :id="`${line.id}`"
      :key="line.id" 
      v-for="line in canvasJson.lineList"
      :line="line"
      />
      <line id="subLine" v-if="subLineVisible" :x1="subLineX1" :y1="subLineY1" :x2="subLineX2" :y2="subLineY2" stroke="#000" stroke-dasharray="3,2" stroke-width="2" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide,inject,type Ref } from 'vue'
import { Canvas, type Material } from '@/type/index'
import { useCreateJson } from '@/hooks/useNodeJson'
import GraphNode from '@/components/GraphNode/index.vue'
import Line from '@/components/Line/index.vue'
import { useDrawLine } from '@/hooks/useDrawLine'

const canvasJson:Canvas.CanvasJson = inject("canvasJson")!
const canvasRef = ref<HTMLDivElement>()

// 物料区拖动
const dropNow = (event: DragEvent) => {
  const { offsetX, offsetY } = event
  const defaultJson = JSON.parse(event.dataTransfer!.getData('nodeJson')) as Material.MaterialItem
  const json = useCreateJson(defaultJson, offsetX, offsetY, viewWidth.value, viewHeight.value)
  canvasJson.nodeList.push(json)
}

const dragOver = (event: DragEvent) => {
  event.preventDefault()
}

// graphNode选中
const activeId:Ref<string> = inject("activeId")!
const activeNodeHandler = (item: Canvas.NodeItem) => {
  if (activeId.value === item.id) return
  activeId.value = item.id!
}

// node移动相关属性
const moveIndex = ref<number | undefined>()
const isMove = ref<Boolean>(false)
const moveDom = ref<Element>()
const downTop = ref<number>(0)
const downLeft = ref<number>(0)
// 视口属性
const viewHeight = ref<number>(0)
const viewWidth = ref<number>(0)
const viewTop = ref<number>(0)
const viewLeft = ref<number>(0)

onMounted(() => {
  viewLeft.value = canvasRef.value?.getBoundingClientRect().left || 0
  viewTop.value = canvasRef.value?.getBoundingClientRect().top || 0
  viewHeight.value = canvasRef.value?.getBoundingClientRect().height || 0
  viewWidth.value = canvasRef.value?.getBoundingClientRect().width || 0
})

// node移动
const mousedownHandler = (item: Canvas.NodeItem, e: any) => {
  moveIndex.value = canvasJson.nodeList.findIndex((i) => i.id === item.id)
  moveDom.value = document.querySelector(`#${item.id}`) || undefined
  if (!moveDom.value || !item.isDrop) return
  downTop.value = e.clientY - moveDom.value!.getBoundingClientRect().top
  downLeft.value = e.clientX - moveDom.value!.getBoundingClientRect().left
  isMove.value = true
  canvasRef.value?.addEventListener('mousemove', mousemoveHandler)
}

const mousemoveHandler = (e: any) => {
  if (!isMove || !moveDom.value) return
  const pointX = e.clientX - downLeft.value - viewLeft.value!
  const pointY = e.clientY - downTop.value - viewTop.value!
  const DomWidth = moveDom.value!.getBoundingClientRect().width
  const DomHeight = moveDom.value!.getBoundingClientRect().height
  const flagX = inBound(pointX, DomWidth, viewWidth.value)
  if (flagX) {
    canvasJson.nodeList[moveIndex.value!].left = pointX
  }
  const flagY = inBound(pointY, DomHeight, viewHeight.value)
  if (flagY) {
    canvasJson.nodeList[moveIndex.value!].top = pointY
  }
}

const mouseupHandler = (e: any, item: Canvas.NodeItem) => {
  if (!moveDom.value) return
  canvasRef.value?.removeEventListener('mousemove', mousemoveHandler)
  moveDom.value = undefined
  isMove.value = false
}

// 移动边界判断
const inBound = (nodeDistance: number, domLength: number, viewLength: number): Boolean => {
  return 0 < nodeDistance && nodeDistance < viewLength - domLength
}

// 连线相关
let drawState = ref<Canvas.LineState>(Canvas.LineState.结束)
let drawJson = ref<Canvas.LineItem>()
let subLineX1 = ref(0)
let subLineY1 = ref(0)
let subLineX2 = ref(100)
let subLineY2 = ref(200)
const subLineVisible = ref<Boolean>(false)
const subLineMoveHandler = (e:any) => {
  const { offsetX,offsetY } = e
  // 添加偏移防止阻挡node的hover事件
    subLineX2.value = offsetX - 2
    subLineY2.value = offsetY - 2
}


const drawStart = (x:number,y:number,id:string,direction:Canvas.Direction) => {
  console.log("drawStart");
  drawState.value = Canvas.LineState.开始
  const { InitLineJson } = useDrawLine()
  const json:Canvas.LineItem = InitLineJson()
  json.fromId = id!
  json.formDirection = direction
  drawJson.value = json
  subLineX1.value = x;
  subLineY1.value = y
  subLineX2.value = x;
  subLineY2.value = y
  subLineVisible.value = true
  canvasRef.value?.addEventListener("mousemove",subLineMoveHandler)
  
}
const drawEnd = () => {
  console.log("drawEnd");
  drawState.value = Canvas.LineState.结束
  drawJson.value =  undefined
  subLineVisible.value = false
  canvasRef.value?.removeEventListener("mousemove",subLineMoveHandler)
}

const drawFinish = (id:string,direction:Canvas.Direction) => {
  console.log("drawFinish");
  drawJson.value!.toId = id
  drawJson.value!.toDirection = direction
  lineRender(drawJson.value!)
  drawEnd()
}

const lineRender = (obj:Canvas.LineItem) => {
  if(canvasJson.lineList.length === 0) {
    canvasJson.lineList.push(obj)
  } else {
    const { filterLine } = useDrawLine()
    let flag = canvasJson.lineList.some(i => {
    return filterLine(obj,i)
    })
    if (flag) return
    canvasJson.lineList.push(obj)
  }
}

provide('drawState', drawState)
provide('drawJson',drawJson)
provide("drawStart",drawStart)
provide("drawEnd",drawEnd)
provide("drawFinish",drawFinish)

// 清除事件
const clearHandler = () => {
  drawEnd()
  activeId.value = ""
}

</script>

<style scoped lang="less">
.canvas_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
