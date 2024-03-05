<template>
<div 
  id="canvas"
  class="canvas_wrapper"
>
</div>
</template>

<script setup lang="ts">
import { reactive,onMounted,ref,watch,inject } from 'vue'
import type { Canvas,Material } from '@/type/index'
import "@logicflow/core/dist/style/index.css";
import { useLogicFlow } from '@/hooks/useLogicFlow'
import type { Ref } from 'vue'

const canvasJson = reactive<Canvas.CanvasJson>({
  nodes: [],
  edges: []
});

const lf:Ref<any> = inject("lf")!

onMounted(() => {
  lf.value = useLogicFlow({
    container: document.querySelector("#canvas")!,
    grid: true
  })
  jsonRender()
})

const jsonRender = () => {
  lf.value.render(canvasJson);
}

watch(canvasJson.nodes,() => {
  jsonRender()
},
{
  deep: true
}
)


</script>

<style scoped lang="less">
.canvas_wrapper {
  width: 100%;
  height: 100%;
}
</style>