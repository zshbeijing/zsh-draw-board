<template>
<div class="node-wrapper" ref="nodeWrapper" :style="wrapperStyle">
  <component :is="graphType" v-bind="props.node" />
</div>
</template>

<script setup lang="ts">
import start from "./components/start.vue"
import state from './components/state.vue'
import condition from './components/condition.vue'
import end from './components/end.vue'
import type { Canvas,GraphNode } from "@/type/index"
import type { CSSProperties } from 'vue';
import { computed,shallowRef } from 'vue';
const props = defineProps<{ node:Canvas.NodeItem }>()

// component 组件枚举
const componentList:GraphNode.ComponentList = {
  "start": shallowRef(start),
  "state": shallowRef(state),
  "condition": shallowRef(condition),
  "end": shallowRef(end)
}

const graphType = componentList[props.node.type]
console.log("");


const wrapperStyle = computed(() =>  ({
  position: "absolute",
  top: `${ props.node.top }px`,
  left: `${ props.node.left }px`,
  transform: `translate(-40px,-40px)`
}) as CSSProperties)

</script>

<style scoped lang="less">
.node-wrapper {
  border: 1px dashed #666;
  padding: 5px;
  border-radius: 5px;
  // background-color: #fff;
}
</style>