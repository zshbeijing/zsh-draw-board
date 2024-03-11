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
    @down="mousedownHandler"
    @up="mouseupHandler"
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

// 新版
const mousedownHandler = (item:Canvas.NodeItem,e:any) => {
  moveIndex.value = canvasJson.nodeList.findIndex(i => i.id === item.id)
  moveDom.value = document.querySelector(`#${item.id}`) || undefined
  if (!moveDom.value || !item.isDrop) return
  downTop.value = e.clientY - moveDom.value!.getBoundingClientRect().top
  downLeft.value = e.clientX - moveDom.value!.getBoundingClientRect().left
  isMove.value = true
  canvasRef.value?.addEventListener("mousemove",mousemoveHandler)
}

const mousemoveHandler = (e:any) => {
  if (!isMove || !moveDom.value) return
  const pointX = e.clientX - downLeft.value - viewLeft.value!
  const pointY = e.clientY - downTop.value - viewTop.value!
  const DomWidth = moveDom.value!.getBoundingClientRect().width
  const DomHeight = moveDom.value!.getBoundingClientRect().height
  const flagX = inBound(pointX,DomWidth,viewWidth.value)
  if (flagX) {
    canvasJson.nodeList[moveIndex.value!].left = pointX
  }
  const flagY = inBound(pointY,DomHeight,viewHeight.value)
  if (flagY) {
    canvasJson.nodeList[moveIndex.value!].top = pointY
  }
}

const inBound = (nodeDistance:number,domLength:number,viewLength:number):Boolean => {
  return 0 < nodeDistance  && nodeDistance <   (viewLength - domLength)
}

const mouseupHandler = (e:any,item:Canvas.NodeItem) => {
  if (!moveDom.value) return
  canvasRef.value?.removeEventListener("mousemove",mousemoveHandler)
  moveDom.value = undefined
  isMove.value = false
}






const dropNow = (event:DragEvent) => {
  const { offsetX, offsetY } = event
  const defaultJson = JSON.parse(event.dataTransfer!.getData("nodeJson")) as Material.MaterialItem
  console.log("defaultJson",defaultJson);
  
  const json = useCreateJson(defaultJson,offsetX,offsetY, viewWidth.value, viewHeight.value)
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






</script>

<style scoped lang="less">
.canvas_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>