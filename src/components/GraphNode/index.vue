<template>
<g class="node-wrapper" ref="nodeWrapper">
  <!-- 添加锚点 -->
  <!-- <anchor :cx="leftX" :cy="leftY" /> -->
  <rect />
  <component :is="graphType" :top="top" :left="left" :text="text" />
</g>
</template>

<script setup lang="ts">
import start from "./components/start.vue"
import state from './components/state.vue'
import condition from './components/condition.vue'
import end from './components/end.vue'
import anchor from './components/anchor.vue'
import type { Canvas,GraphNode } from "@/type/index"
import type { CSSProperties } from 'vue';
import { computed,shallowRef,ref,onMounted } from 'vue';
const props = defineProps<{ node:Canvas.NodeItem,activeId:string }>()
const top = computed(() => props.node.top)
const left = computed(() => props.node.left)
const text = computed(() => props.node.text)

// component 组件枚举
const componentList:GraphNode.ComponentList = {
  "start": shallowRef(start),
  "state": shallowRef(state),
  "condition": shallowRef(condition),
  "end": shallowRef(end)
}

const graphType = componentList[props.node.type]

// 锚点位置
const nodeWrapper = ref<Element>()

// const leftX = computed(() => props.node.left - nodeWrapper.value!.getBoundingClientRect().width / 2 )
// const leftY = computed(() => props.node.top - nodeWrapper.value!.getBoundingClientRect().height / 2)


const wrapperStyle = computed(() =>  ({
  // position: "absolute",
  // top: `${ props.node.top }px`,
  // left: `${ props.node.left }px`,
  // transform: `translate(-40px,-40px)`,
  border: props.activeId === props.node.id ? "1px dashed #666" : "none"
}) as CSSProperties)

</script>

<style scoped lang="less">
.node-wrapper {

}
</style>