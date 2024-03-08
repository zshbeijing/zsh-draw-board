<template>
  <g :transform="`translate(-${(props.graphProperties.width! || 0) / 2},-${(props.graphProperties.height! || 0 )/ 2})`">
    <polygon :points="points" fill-opacity="0" stroke="white" stroke-width="2" />
    <text text-anchor="middle" dominant-baseline="middle" :x="textX" :y="textY">{{ text }}</text>
  </g>
</template>

<script setup lang="ts">
import type { GraphProperties } from '@/type/index'
import { computed } from 'vue'
const props = defineProps<{
  text: string
  left: number
  top: number
  graphProperties:GraphProperties
}>()
const text = computed(() => props.text)
const textX = computed(() => String(props.left + (props.graphProperties.width! || 0) /2))
const textY = computed(() => String(props.top + (props.graphProperties.height! || 0) /2))
const points = computed(() => {
  let points = `${props.left} ${props.top + (props.graphProperties.height! || 0) /2}, ${props.left + (props.graphProperties.width! || 0) /2} ${props.top},${props.left + (props.graphProperties.width! || 0)} ${props.top + (props.graphProperties.height! || 0) /2}, ${props.left + (props.graphProperties.width! || 0) /2} ${props.top + (props.graphProperties.height! || 0)}`
  return points
})
</script>

<style scoped lang="less">
text {
  cursor: default;
}
</style>
