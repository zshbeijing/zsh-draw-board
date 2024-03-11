<template>
  <g>
    <circle :cx="cx" :cy="cy" r="10" stroke="white" fill-opacity="0.3" stroke-width="1" fill="black" stroke-opacity="0" />
    <circle class="anchor-point" :cx="cx" :cy="cy" r="4" stroke="white" fill="white" stroke-width="2"  />
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ cx:number, cy:number }>()
const cx = computed(() => props.cx)
const cy = computed(() => props.cy)
</script>

<style scoped lang="less">
.anchor-point {
  cursor: crosshair;
}
</style>