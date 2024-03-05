<template>
  <div class="material_list">
    <div class="material_item" 
    v-for="i in materList" 
    :key="i.type"
    @mousedown="mousedownHandler(i)"
    >
      <SvgIcon class="svg_icon" :name="i.img" />
      <span class="material_label">{{ i.label }}</span>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import { ref,inject } from 'vue'
import type { Material } from '@/type/index.ts'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useCreateJson } from '@/hooks/useNodeJson'
import { List } from './config'


const materList = ref(List)
const lf:any = inject("lf")

// 拖拽
const mousedownHandler = (i:Material.MaterialItem) => {
  if (!lf.value) return
  lf.value.dnd.startDrag(useCreateJson(i.type))
}

// 生成默认json
</script>

<style scoped lang="less">
.material_list {
  width: 100%;
  .material_item {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 20px 0px;
    cursor: pointer;
    .svg_icon {
     flex: 1;
    }
    .material_label {
      flex: 1;
      font-weight: 700;
    }
  }
}
</style>