<template>
  <div class="operation_wrapper">
  <div class="operation_item" v-if="activeId">
  <a-row>
   <a-col :span="5">
    <span>文本:</span>
   </a-col>
   <a-col :span="19">
    <a-input v-model:value="text" @change="changeHandler"/>
   </a-col>
  </a-row>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref,inject,watch,type Ref } from 'vue'
import { type Canvas } from '@/type/index'
const activeId:Ref<string> = inject("activeId")!
const canvasJson:Canvas.CanvasJson = inject("canvasJson")!
const changeText:Function = inject("changeText")!
const getText = (newVal:string) => {
  const activeNode = canvasJson.nodeList.find(i => i.id === newVal)
  console.log("activeNode",activeNode);
  if(activeNode) {
    console.log("text",activeNode.text);
    return  activeNode.text
  }
}
const text = ref<string>("")

const changeHandler = (e:any) => {
  changeText(e.target.value,activeId.value)
}
watch(() => activeId.value,(newVal) => {
  console.log("watch");
  if (newVal) {
    console.log("newVal",newVal);
    text.value = getText(newVal) || ""
    console.log("textRef",text.value);
    
  }
})


</script>

<style scoped lang="less">
.operation_wrapper {
  width: 100%;
  height: 100%;
  padding: 15px;
  .operation_item {
    line-height: 32px;
    span {
      font-weight: 700;
      font-size: 15px;
    }
  }
}
</style>