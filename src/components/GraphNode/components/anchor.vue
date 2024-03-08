<template>
  <g>
    <circle :cx="cx" :cy="cy" r="35" stroke="white" fill-opacity="0" stroke-width="2" />
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ cx:string, cy:string }>()
const cx = computed(() => props.cx)
const cy = computed(() => props.cy)
</script>

<style scoped lang="less">
</style>