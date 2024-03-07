<template>
<div 
  ref="canvasRef"
  class="canvas_wrapper"
  @drop="dropNow($event)"
  @dragstart="dragStart($event)"
  @dragover="dragOver($event)"
>
  <GraphNode 
    v-for="item in canvasJson.nodeList"
    :node="item"
    :activeId="activeId"
    @click="activeNodeHandler(item)"
    @mousedown="mousedownHandler(item,$event)"
    @mousemove="mousemoveHandler(item,$event)"
    @mouseup="mouseupHandler"
    /> 
</div>
</template>

<script setup lang="ts">
import { reactive,ref,onMounted } from 'vue'
import type { Canvas,Material } from '@/type/index'
import { useCreateJson } from '@/hooks/useNodeJson'
import GraphNode from '@/components/GraphNode/index.vue'

const canvasJson = reactive<Canvas.CanvasJson>({
  nodeList: [],
  lineList: []
});
const canvasRef = ref<HTMLDivElement>()

// graphNode选中
const activeId = ref<string>("")
const activeNodeHandler = (item:Canvas.NodeItem) => {
  if (activeId.value === item.id) return
  activeId.value = item.id!
  console.log("activeId",activeId.value);
}

// graphNode移动
const moveIndex = ref<number | undefined>(0)
const isMove = ref<Boolean>(false)
const downTop = ref<number>(0)
const downLeft = ref<number>(0)

const mousedownHandler = (item:Canvas.NodeItem,e:any) => {
  console.log("mousedownHandler",item,e);
  const index = canvasJson.nodeList.findIndex((i) => i.id === item.id)
  moveIndex.value = index
  downTop.value = e.offsetY
  downLeft.value = e.offsetX
  isMove.value = true
}
const mousemoveHandler = (item:Canvas.NodeItem,e:any) => {
  if (!isMove.value || moveIndex.value === undefined || !item.isDrop) return
  console.log("move",e);
  canvasJson.nodeList[moveIndex.value].top += e.offsetY - downTop.value
  canvasJson.nodeList[moveIndex.value].left += e.offsetX - downLeft.value
}
const mouseupHandler = () => {
  console.log("moveUp");
  moveIndex.value = undefined
  isMove.value = false
}




const dropNow = (event:DragEvent) => {
  const { offsetX, offsetY } = event
  const nodeType = event.dataTransfer!.getData("nodeJson") as Material.MaterialType
  const json = useCreateJson(nodeType,offsetX,offsetY)
  canvasJson.nodeList.push(json)
  console.log("canvasJson",canvasJson);
}

const dragStart = (event:DragEvent) => {
  console.log("dragStart",event);
}

const dragOver = (event:DragEvent) => {
  event.preventDefault()
  // console.log("dragOver",event);
}

const jsonRender = () => {
  
}






</script>

<style scoped lang="less">
.canvas_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>