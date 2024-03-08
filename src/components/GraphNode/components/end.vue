<template>
  <g transform="translate(-35,-35)">
    <circle :cx="polygonX" :cy="polygonY" r="23" stroke="white" fill="white" stroke-width="2"  />
    <circle :cx="polygonX" :cy="polygonY" r="31" stroke="white" fill-opacity="0" stroke-width="5"  />
    <text text-anchor="middle" dominant-baseline="middle" :x="textX" :y="textY">{{ text }}</text>
  </g>
 </template>
 
 <script setup lang="ts">
 import type { Canvas,GraphNode } from "@/type/index"
 const props = defineProps<{ text: string; left: number; top: number }>()
 const polygonX = computed(() => String(props.left + 35))
 const polygonY = computed(() => String(props.top + 35))
 const textX = computed(() => String(props.left + 35))
 const textY = computed(() => String(props.top + 35)) 
 import { computed } from "vue";
 const text = computed(() => props.text)
 
 </script>
 
 <style scoped lang="less">
 text {
  cursor: default;
 }
 </style>