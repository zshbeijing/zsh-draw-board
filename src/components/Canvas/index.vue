<template>
<div 
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
import { reactive } from 'vue'
import type { Canvas,Material } from '@/type/index'
import { useCreateJson } from '@/hooks/useNodeJson'

const canvasJson = reactive<Canvas.CanvasJson>({
  name: "",
  nodeList: [],
  lineList: []
});

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

const throttle = (fn:Function) => {
  let lock = false
  return function (this:any,...args:any[]) {
    if (lock) return
    lock = true
    window.requestAnimationFrame(() => {
      fn.apply(this,args)
      lock = false
    })
  }
}

const jsonRender = () => {
  
}






</script>

<style scoped lang="less">
.canvas_wrapper {
  width: 100%;
  height: 100%;
}
</style>