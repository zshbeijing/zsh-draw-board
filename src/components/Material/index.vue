<template>
  <div class="material_list">
    <div class="material_item" 
    v-for="i in materList" 
    :key="i.type"
    draggable="true" 
    @dragstart="drag(i,$event)"
    >
      <SvgIcon class="svg_icon" :name="i.img" />
      <span class="material_label">{{ i.label }}</span>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Material } from '@/type/index.ts'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { List } from './config'


const materList = ref(List)

// 拖拽
const drag = (i:Material.MaterialItem ,event:DragEvent) => {
  console.log("drag",i);
  event.dataTransfer!.setData('nodeJson',JSON.stringify(i))
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