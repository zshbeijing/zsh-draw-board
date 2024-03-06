<template>
<div class="element-wrapper">
  <component 
  />
</div>
</template>

<script setup lang="ts">
import circle from "./components/circle.vue"
import type { Canvas } from "@/type/index"
const props = defineProps<Canvas.NodeItem>()

</script>

<style scoped lang="less"></style>