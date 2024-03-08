<template>
  <g class="node-wrapper" ref="nodeWrapper">
    <!-- 添加锚点 -->
    <!-- <anchor :cx="leftX" :cy="leftY" /> -->
    <rect
      :x="left"
      :y="top"
      fill-opacity="0"
      rx="8"
      ry="8"
      stroke="black"
      stroke-width="1"
      stroke-dasharray="2 2"
      :width="borderWidth"
      :height="borderHeight"
    />
    <component ref="graphRef" :is="graphType" :top="top" :left="left" :text="text" :graphProperties="graphProperties" />
  </g>
</template>

<script setup lang="ts">
import start from './components/start.vue'
import state from './components/state.vue'
import condition from './components/condition.vue'
import end from './components/end.vue'
import anchor from './components/anchor.vue'
import type { Canvas, GraphNode } from '@/type/index'
import type { CSSProperties } from 'vue'
import { computed, shallowRef, ref, onMounted } from 'vue'
const props = defineProps<{ node: Canvas.NodeItem; activeId: string }>()
const top = computed(() => props.node.top)
const left = computed(() => props.node.left)
const text = computed(() => props.node.text)
const graphProperties = computed(() => props.node.graphProperties)
console.log("graphProperties",graphProperties);
const graphRef = ref<Element>()

// component 组件枚举
const componentList: GraphNode.ComponentList = {
  start: shallowRef(start),
  state: shallowRef(state),
  condition: shallowRef(condition),
  end: shallowRef(end)
}

const graphType = componentList[props.node.type]

// 锚点位置
const nodeWrapper = ref<Element>()
console.log("nodeWrapper",nodeWrapper);



// 边框相关
const borderWidth = computed(() => props.node.graphProperties.width || props.node.graphProperties.r! *2 || 0)
const borderHeight = computed(() => props.node.graphProperties.height || props.node.graphProperties.r! * 2 || 0)
</script>

<style scoped lang="less">
</style>
