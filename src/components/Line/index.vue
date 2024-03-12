<template>
  <g>
    <line class="line" :x1="x1" :y1="y1" :x2="x2" :y2="y2" stroke="#000" stroke-width="2" />
  </g>
</template>

<script setup lang="ts">
import type { Canvas } from '@/type/index'
import { inject,computed } from "vue"
  const props = defineProps<{ line:Canvas.LineItem }>()
  const canvasJson:Canvas.CanvasJson = inject("canvasJson")!
  const getCoordinate = (id:string,direction:string,canvasJson:Canvas.CanvasJson) => {
    const idJson = canvasJson.nodeList.find(i => i.id === id)
    if (!idJson) return
    const { width,height,r,top,left} = idJson
    let x,y
    if (r) {
      switch (direction) {
        case "left":
          x = left
          y = top + r
          break;
        case "right":
          x = left + 2*r
          y = top + r
          break;
        case "top":
          x = left + r
          y = top
          break
        case "bottom":
          x = left + r
          y = top + 2*r
        break;
      }
      return { x,y }
    } else if (width && height) {
      switch (direction) {
        case "left":
          x = left
          y = top + height/2
          break;
        case "right":
          x = left + width
          y = top + height /2
          break;
        case "top":
          x = left + width /2
          y = top
          break
        case "bottom":
          x = left + width /2
          y = top + height
        break;
      }
      return { x,y }
    }
  }
  const x1 = computed(() => {
    const { x }  = getCoordinate(props.line.fromId,props.line.formDirection,canvasJson)!
    return x
  })
  const y1 = computed(() => getCoordinate(props.line.fromId,props.line.formDirection,canvasJson)!.y)
  const x2 = computed(() => getCoordinate(props.line.toId,props.line.toDirection,canvasJson)!.x)
  const y2 = computed(() => getCoordinate(props.line.toId,props.line.toDirection,canvasJson)!.y)

  
</script>

<style scoped lang="less"></style>
