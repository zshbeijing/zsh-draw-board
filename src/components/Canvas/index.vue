<template>
<div 
  id="canvas"
  class="canvas_wrapper"
  @drop="dropNow($event)"
  @dragstart="dragStart($event)"
  @dragover="dragOver($event)"
  @dragleave="dragLeave($event)"
>
  {{ JSON.stringify(canvasJson) }}
</div>
</template>

<script setup lang="ts">
import { reactive,onMounted,ref } from 'vue'
import type { Canvas,Material } from '@/type/index'
import { useCreateJson } from '@/hooks/useNodeJson'
import "@logicflow/core/dist/style/index.css";
import { useLogicFlow } from '@/hooks/useLogicFlow'


const canvasJson = reactive<Canvas.CanvasJson>({
  name: "",
  nodeList: [],
  lineList: []
});

const lf = ref()

onMounted(() => {
  lf.value = useLogicFlow({
    container: document.querySelector("#canvas")!,
    grid: false
  })
  jsonRender()
  
})



const dropNow = (event:DragEvent) => {
  const { offsetX, offsetY } = event
  const nodeType = event.dataTransfer!.getData("nodeJson") as Material.MaterialType
  const json = useCreateJson(nodeType,offsetX,offsetY)
  canvasJson.nodeList.push(json)
  console.log(typeof(offsetX));
}

const dragStart = (event:DragEvent) => {
  console.log("dragStart",event);
}

const dragOver = (event:DragEvent) => {
  event.preventDefault()
  // console.log("dragOver",event);
}

const dragLeave = (event:DragEvent) => {
  console.log("dragLeave",event);
}

const jsonRender = () => {
  lf.value.render({
  nodes: [
    {
      id: "1",
      type: "start",
      x: 100,
      y: 100,
      text: "开始",
    },
    {
      id: "2",
      type: "state",
      x: 300,
      y: 200,
      text: "节点2",
    },
    {
      id: '3',
      type: "condition",
      x: 400,
      y: 200,
      text: "节点3",
    },
    {
      id: '4',
      type: "end",
      x: 500,
      y: 100,
      text: "节点4"
    }
  ],
  edges: [
    {
      sourceNodeId: "1",
      targetNodeId: "2",
      type: "polyline",
      text: "连线",
    },
  ],
});
}


</script>

<style scoped lang="less">
.canvas_wrapper {
  width: 100%;
  height: 100%;
}
</style>