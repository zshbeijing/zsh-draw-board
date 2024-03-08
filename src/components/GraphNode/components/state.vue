<template>
  <g transform="translate(-50,-35)">
   <rect 
    :x="polygonX" 
    :y="polygonY" 
    width="100" 
    height="70" 
    fill-opacity="0" 
    stroke="white"
    stroke-width="2"
    rx="8"
    ry="8" />
   <text class="hoverAble" text-anchor="middle" dominant-baseline="middle" :x="textX" :y="textY">{{ text }}</text>
  </g>
 </template>
 
 <script setup lang="ts">
 import type { Canvas,GraphNode } from "@/type/index"
 import { computed } from "vue";

 const props = defineProps<{ text: string; left: number; top: number }>()
 const polygonX = computed(() => props.left)
 const polygonY = computed(() => props.top)
 const textX = computed(() => String(props.left + 50))
 const textY = computed(() => String(props.top + 35))
 const text = computed(() => props.text)
 
 </script>
 
 <style scoped lang="less">
 text {
  cursor: default;
 }
 </style>