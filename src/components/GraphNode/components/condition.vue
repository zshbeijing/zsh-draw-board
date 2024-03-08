<template>
  <g transform="translate(-50,-35)">
    <polygon :points="points" fill-opacity="0" stroke="white" stroke-width="2" />
    <text text-anchor="middle" dominant-baseline="middle" :x="textX" :y="textY">{{ text }}</text>
  </g>
</template>

<script setup lang="ts">
import type { Canvas, GraphNode } from '@/type/index'
import { computed } from 'vue'
const props = defineProps<{
  text: string
  left: number
  top: number
}>()
const text = computed(() => props.text)
const textX = computed(() => String(props.left + 50))
const textY = computed(() => String(props.top + 35))
const points = computed(() => {
  let points = `${props.left} ${props.top + 35}, ${props.left + 50} ${props.top},${props.left + 100} ${props.top + 35}, ${props.left + 50} ${props.top + 70}`
  return points
})
</script>

<style scoped lang="less">
text {
  cursor: default;
}
</style>
