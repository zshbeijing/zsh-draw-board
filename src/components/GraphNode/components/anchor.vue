<template>
  <g
    @mousedown="mousedownHandler($event)"
  >
    <circle :cx="cx" :cy="cy" r="10" stroke="white" fill-opacity="0.3" stroke-width="1" fill="black" stroke-opacity="0" />
    <circle class="anchor-point" :cx="cx" :cy="cy" r="4" stroke="white" fill="white" stroke-width="2"  />
  </g>
</template>

<script setup lang="ts">
import { computed,inject,type Ref } from 'vue'
import { Canvas } from '@/type/index'
import { useDrawLine } from '@/hooks/useDrawLine'
const props = defineProps<{ cx:number, cy:number, anchorDirection:Canvas.Direction, node:Canvas.NodeItem }>()
const cx = computed(() => props.cx)
const cy = computed(() => props.cy)

const drawState:Ref<Canvas.LineStateEnum> = inject("drawState")!
const drawJson:Ref<Canvas.LineItem> = inject("drawJson")!
const drawStart:Function = inject("drawStart")!
const drawEnd:Function = inject("drawEnd")!
const drawFinish:Function = inject("drawFinish")!



const mousedownHandler = (e:any) => {
  e.stopPropagation();
  console.log("mousedownHandler",drawState.value);
  if (drawState.value === Canvas.LineState.结束) {
    drawStart(props.cx,props.cy,props.node.id,props.anchorDirection)
  } else if (drawState.value === Canvas.LineState.进行 && drawJson.value) {
    if (props.node.id === drawJson.value.fromId) {
      drawEnd()
      return
    } else {
      drawFinish(props.node.id,props.anchorDirection)
    }
  } else {

  }
}

</script>

<style scoped lang="less">
.anchor-point {
  cursor: crosshair;
}
</style>