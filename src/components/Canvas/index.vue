<template>
<div 
  ref="canvasRef"
  class="canvas_wrapper"
  @drop="dropNow($event)"
  @dragstart="dragStart($event)"
  @dragover="dragOver($event)"
>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <GraphNode
    :id="`${item.id}`" 
    v-for="item in canvasJson.nodeList"
    :node="item"
    :activeId="activeId"
    @click="activeNodeHandler(item)"
    @mousedown="mousedownHandler(item,$event)"
    @mouseup="mouseupHandler(item,$event)"
    /> 
</svg>
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
const moveIndex = ref<number | undefined>()
const isMove = ref<Boolean>(false)
const moveDom = ref<Element>()
const downTop = ref<number>(0)
const downLeft = ref<number>(0)
const viewHeight = ref<number>()
const viewWidth = ref<number>()
const viewTop = ref<number>()
const viewLeft = ref<number>()

onMounted(() => {
  viewLeft.value = canvasRef.value?.getBoundingClientRect().left || 0
  viewTop.value = canvasRef.value?.getBoundingClientRect().top || 0
  viewHeight.value = canvasRef.value?.getBoundingClientRect().height || 0
  viewWidth.value = canvasRef.value?.getBoundingClientRect().width || 0
})

// 新版
const mousedownHandler = (item:Canvas.NodeItem,e:any) => {
  moveIndex.value = canvasJson.nodeList.findIndex(i => i.id === item.id)
  console.log("E",e);
  moveDom.value = document.querySelector(`#${item.id}`) || undefined
  if (!moveDom.value || !item.isDrop) return
  downTop.value = e.clientY - moveDom.value!.getBoundingClientRect().top - (moveDom.value!.getBoundingClientRect().height /2)
  downLeft.value = e.clientX - moveDom.value!.getBoundingClientRect().left - (moveDom.value!.getBoundingClientRect().width /2)
  isMove.value = true
  moveDom.value?.addEventListener("mousemove",mousemoveHandler)
}

const mousemoveHandler = (e:any) => {
  if (!isMove) return
  const pointX = e.clientX - downLeft.value - viewLeft.value!
  const pointY = e.clientY - downTop.value - viewTop.value!
  // console.log("moveIndex",pointX,pointY);
  canvasJson.nodeList[moveIndex.value!].top = pointY
  canvasJson.nodeList[moveIndex.value!].left = pointX
  // console.log("mousemoveHandler",canvasJson.nodeList[moveIndex.value!]);
}

const mouseupHandler = (e:any,item:Canvas.NodeItem) => {
  console.log("mouseupHandler");
  if (!moveDom.value) return
  moveDom.value.removeEventListener("mousemove",mousemoveHandler)
  moveDom.value = undefined
}

// 老版
// const mousedownHandler = (item:Canvas.NodeItem,e:any) => {
  // console.log("mousedownHandler",item,e);
  // const index = canvasJson.nodeList.findIndex((i) => i.id === item.id)
  // moveIndex.value = index
  // downTop.value = e.offsetY
  // downLeft.value = e.offsetX
  // isMove.value = true
// }

// const mousemoveHandler = (item:Canvas.NodeItem,e:any) => {
//   if (!isMove.value || moveIndex.value === undefined || !item.isDrop) return
//   console.log("move",e);
//   const moveX = e.offsetX - downLeft.value
//   const moveY = e.offsetY - downTop.value
//   canvasJson.nodeList[moveIndex.value].top += moveY
//   canvasJson.nodeList[moveIndex.value].left += moveX
// }
// const mousemoveHandler = (item:Canvas.NodeItem,e:any) => {
//   if (!isMove.value || moveIndex.value === undefined || !item.isDrop) return
//   console.log("move",e);
//   const moveX = e.offsetX - downLeft.value
//   const moveY = e.offsetY - downTop.value
//   canvasJson.nodeList[moveIndex.value].top += moveY
//   canvasJson.nodeList[moveIndex.value].left += moveX
// }
// const mouseupHandler = () => {
//   console.log("moveUp");
//   moveIndex.value = undefined
//   isMove.value = false
// }






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