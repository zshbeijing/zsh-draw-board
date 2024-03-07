<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="70">
   <polygon 
    points="0 35, 50 0, 100 35, 50 70"
    fill-opacity="0" 
    stroke="white"
    stroke-width="2"
   />
   <text dominant-baseline="middle" x="35" y="35">{{ text }}</text>
 </svg>
 </template>
 
 <script setup lang="ts">
 import type { Canvas,GraphNode } from "@/type/index"
 const props = defineProps<Canvas.NodeItem>()
 import { computed } from "vue";
 const text = computed(() => props.text)
 
 </script>
 
 <style scoped lang="less">
 text {
  cursor: default;
 }
 </style>