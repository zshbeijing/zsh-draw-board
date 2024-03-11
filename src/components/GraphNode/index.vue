<template>
  <g class="node-wrapper" ref="nodeWrapper"
  @mouseenter="mouseenterHandler"
  @mouseleave="mouseleaveHandler"
  >
    <component
      ref="graphRef"
      :is="graphType"
      :top="top"
      :left="left"
      :text="text"
      :graphProperties="graphProperties"
      @mousedown="mousedownHandler($event)"
      @mouseup="mouseupHandler($event)"
    />
     <!-- 添加锚点 -->
    <anchor anchorDirection="left"  :class="`${props.node.id} node-border`" :cx="leftAnchorX" :cy="leftAnchorY" :node="props.node" />
    <anchor anchorDirection="right"  :class="`${props.node.id} node-border`" :cx="rightAnchorX" :cy="rightAnchorY" :node="props.node"  />
    <anchor anchorDirection="top"  :class="`${props.node.id} node-border`" :cx="topAnchorX" :cy="topAnchorY" :node="props.node"  />
    <anchor anchorDirection="bottom"  :class="`${props.node.id} node-border`" :cx="bottomAnchorX" :cy="bottomAnchorY" :node="props.node"  />
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
import { computed, shallowRef, ref, onMounted, watch, nextTick } from 'vue'
const props = defineProps<{ node: Canvas.NodeItem; activeId: string }>()
const top = computed(() => props.node.top)
const left = computed(() => props.node.left)
const text = computed(() => props.node.text)
const graphProperties = computed(() => props.node.graphProperties)
console.log('graphProperties', graphProperties)
const graphRef = ref<Element>()

// component 组件枚举
const componentList: GraphNode.ComponentList = {
  start: shallowRef(start),
  state: shallowRef(state),
  condition: shallowRef(condition),
  end: shallowRef(end)
}

const graphType = componentList[props.node.type]



// 边框相关
const borderWidth = computed(
  () => (props.node.graphProperties.width || props.node.graphProperties.r! * 2 || 0)
)
const borderHeight = computed(
  () => (props.node.graphProperties.height || props.node.graphProperties.r! * 2 || 0)
)

// 是否选中
const flag = computed(() => props.activeId === props.node.id)
watch(
  () => props.activeId,
  () => {
    nextTick(() => {
      const border = document.querySelectorAll(`.${props.node.id}`)
      border.forEach(i => {
        i.style.visibility = flag.value ? 'visible' : 'hidden'
      })
     
    })
  },
  {
    immediate: true
  }
)

// 锚点相关
const leftAnchorX = computed(() => props.node.left)
const leftAnchorY = computed(() => props.node.top +  borderHeight.value / 2)
const rightAnchorX = computed(() => props.node.left + borderWidth.value)
const rightAnchorY = computed(() => props.node.top + borderHeight.value / 2)
const topAnchorX = computed(() => props.node.left + borderWidth.value /2)
const topAnchorY = computed(() => props.node.top)
const bottomAnchorX = computed(() => props.node.left + borderWidth.value / 2)
const bottomAnchorY = computed(() => props.node.top + borderHeight.value)

const mouseenterHandler = () => {
  if (!flag.value) {
    const border = document.querySelectorAll(`.${props.node.id}`)
    border.forEach(i => {
        i.style.visibility = 'visible'
      })
  }
}
const mouseleaveHandler = () => {
  if (!flag.value) {
    const border = document.querySelectorAll(`.${props.node.id}`)
    border.forEach(i => {
        i.style.visibility = 'hidden'
      })
  }
}

// 移动事件
const emit = defineEmits(["down","up"])
const mousedownHandler = (e:any) => {
  emit("down",props.node,e)
}
const mouseupHandler = (e:any) => {
  emit("up",props.node,e)
}

</script>

<style scoped lang="less">
.node-wrapper:hover {
  z-index: 100;
  .node-border {
    visibility: visible;
  }
}
</style>
