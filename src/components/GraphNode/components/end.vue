<template>
  <g transform="translate(-35,-35)">
    <circle :cx="polygonX" :cy="polygonY" :r="`${(props.graphProperties.r! - 7 || 0)}`" stroke="white" fill="white" stroke-width="2"  />
    <circle :cx="polygonX" :cy="polygonY" :r="props.graphProperties.r" stroke="white" fill-opacity="0" stroke-width="5"  />
    <text text-anchor="middle" dominant-baseline="middle" :x="textX" :y="textY">{{ text }}</text>
  </g>
 </template>
 
 <script setup lang="ts">
 import type { GraphProperties } from "@/type/index"
 const props = defineProps<{ text: string; left: number; top: number,graphProperties:GraphProperties }>()
 const polygonX = computed(() => String(props.left + props.graphProperties.r! || 0))
 const polygonY = computed(() => String(props.top + props.graphProperties.r! || 0))
 const textX = computed(() => String(props.left + props.graphProperties.r! || 0))
 const textY = computed(() => String(props.top + props.graphProperties.r! || 0)) 
 import { computed } from "vue";
 const text = computed(() => props.text)
 
 </script>
 
 <style scoped lang="less">
 text {
  cursor: default;
 }
 </style>