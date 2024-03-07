<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="72" height="72">
   <circle cx="36" cy="36" r="23" stroke="white" fill="white" stroke-width="2"  />
   <circle cx="36" cy="36" r="31" stroke="white" fill-opacity="0" stroke-width="5"  />
   <text text-anchor="middle" dominant-baseline="middle" x="35" y="35">{{ text }}</text>
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