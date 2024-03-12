<template>
    <div class="head_wrapper">
      <div class="btn_item" 
        v-for="i in btn_list" :key="i.key"
        @click="btnHandler(i.key)"
        >
        <antIcon class="icon" :icon="i.icon" />
      <span> {{ i.label }} </span>
      </div>
    </div>
    <div class="modal_wrapper" ref="create_modal">
    <a-modal
    class="modal_box"
    :open="open"
    width="60%"
    :getContainer="() => create_modal"
    :footer="btnKey === 'import' ? undefined : null"
    @cancel="handleCancel"
  >
    <template v-if="btnKey !== 'import'">
      {{ json }}
    </template>
    <template v-else>
      <a-textarea v-model:value="importJson" :autoSize="{minRows: 5, maxRows: 20  }" />
    </template>

    <template #footer>
      <a-button type="primary" @click="handleOk">确认</a-button>
    </template>
  </a-modal>
  </div>
</template>

<script setup lang="ts">
import { antIcon } from '@/components/AntIcon'
import type { Head }  from "@/type/index"
import { ref,inject,nextTick } from 'vue'
import type { Canvas } from '@/type/index'
const open = ref<Boolean>()
const create_modal = ref<HTMLDivElement>()
const btnKey = ref<string>("")
let canvasJson:Canvas.CanvasJson = inject("canvasJson")!
let importCanvas:Function = inject("importCanvas")!
const json = ref<string>("")
const importJson = ref<string>("")


const btn_list:Head.BtnItem[] = [
    {
        key: "import",
        label: "导入",
        icon: "DownloadOutlined"
    },
    {
        key: "export",
        label: "导出",
        icon: "UploadOutlined"
    },
    {
      key: "showJson",
      label: "查看json",
      icon: "SearchOutlined"
    }
]
const btnHandler = (key:string) => {
  btnKey.value = key
  switch (key) {
    case "import":
      importHandler();
    break;
    case "export":
      exportHandler();
    break;
    case "showJson":
    exportHandler();
    break;
  }
}
const exportHandler = () => {
  json.value = JSON.stringify(canvasJson)
  open.value = true
}
const importHandler = () => {
  open.value = true
}
const handleOk = () => {
  nextTick(() => {
    importCanvas(importJson.value)
    open.value = false
    importJson.value = ''
  })
  
}
const handleCancel = () => {
  open.value = false
  json.value = ''
  importJson.value = ''
}

</script>

<style scoped lang="less">
  .head_wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0px 20px;
   .btn_item {
    height: 40px;
    padding: 0px 20px;
    margin-right: 20px;
    border-radius: 5px; 
    border: 1px solid #ccc;
    background-color: #fff;
    color: #111;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
     .icon {
      margin-right : 5px;
     }
   }
  }
  .modal_wrapper {
  width: 100vh;
  height: 100vh;
  :deep(.modal_box) {
    top: 50px ;
    .ant-modal-content {
      max-height: calc(100vh - 100px);
      min-height: 200px;
      .ant-modal-body {
        padding-top: 20px;
      }
    }
  }
}
</style>