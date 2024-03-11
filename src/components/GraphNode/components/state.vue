<template>
  <g>
   <rect 
    :x="polygonX" 
    :y="polygonY" 
    :width="props.graphProperties.width" 
    :height="props.graphProperties.height" 
    fill-opacity="0" 
    stroke="white"
    stroke-width="2"
    rx="8"
    ry="8" />
   <text class="hoverAble" text-anchor="middle" dominant-baseline="middle" :x="textX" :y="textY">{{ text }}</text>
  </g>
 </template>
 
 <script setup lang="ts">
 import type { GraphProperties } from "@/type/index"
 import { computed } from "vue";

 const props = defineProps<{ text: string; left: number; top: number,graphProperties:GraphProperties  }>()
 const polygonX = computed(() => props.left)
 const polygonY = computed(() => props.top)
 const textX = computed(() => String(props.left + (props.graphProperties.width! || 0) /2))
 const textY = computed(() => String(props.top + (props.graphProperties.height! || 0) /2))
 const text = computed(() => props.text)
 </script>
 
 <style scoped lang="less">
 text {
  cursor: default;
 }
 </style>