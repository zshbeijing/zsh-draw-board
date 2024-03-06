<template>
  <div class="head_wrapper">
    <div class="control_box" v-show="false">
      <div class="control_item" 
        v-for="item in control_list" 
        :key="item.key"
        :title="item.label"
        @click="controlHandler(item.key)"
      >
        <antIcon class="icon" :icon="item.icon" />
      </div>
    </div>
    <div class="btn_box">
      <div class="btn_item" v-for="i in btn_list" :key="i.key" @click="btnHandler(i)">
        <antIcon class="icon" :icon="i.icon" />
        <span> {{ i.label }} </span>
      </div>
    </div>
  </div>
  <div class="modal_wrapper" ref="create_modal">
    <a-modal
    class="modal_box"
    :open="open"
    width="60%"
    :getContainer="() => create_modal"
    :footer="btnKey === 'import' ? undefined : null"
    @ok="handleOk"
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
import type { Head } from '@/type/index'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
const lf: Ref<any> | undefined = inject('lf')
const btnKey = ref<string>('')
const open = ref<Boolean>(false)
const json = ref<string>('')
const importJson = ref<string>('')
// 获取挂在窗口的dom
const create_modal = ref<HTMLDivElement>()
const handleOk = () => {
  if (!lf || !lf.value) return
  console.log('importJson', importJson.value)
  lf?.value.render(JSON.parse(importJson.value))
  open.value = false
  importJson.value = ''
}
const handleCancel = () => {
  open.value = false
  json.value = ''
  importJson.value = ''
}

// 右此按钮
const btn_list: Head.BtnItem[] = [
  {
    key: 'import',
    label: '导入',
    icon: 'DownloadOutlined'
  },
  {
    key: 'export',
    label: '导出',
    icon: 'UploadOutlined'
  },
  {
    key: 'showJson',
    label: '查看json',
    icon: 'SearchOutlined'
  }
]
const btnHandler = (i: Head.BtnItem) => {
  if (!lf || !lf.value) return
  btnKey.value = i.key
  console.log('btnKey', btnKey)
  switch (i.key) {
    case 'import':
      importHandler()
    case 'export':
      exportHandler()
    case 'showJson':
      exportHandler()
  }
}

const importHandler = () => {
  open.value = true
}
const exportHandler = () => {
  json.value = lf?.value.getGraphData()
  open.value = true
}

// 左侧控制按钮
const control_list = [
  {
    key: 'undo',
    label: '上一步',
    icon: 'SwapLeftOutlined'
  },
  {
    key: 'redo',
    label: '下一步',
    icon: 'SwapRightOutlined'
  },
  {
    key: 'upSize',
    label: '放大',
    icon: 'PlusCircleOutlined'
  },
  {
    key: 'downSize',
    label: '缩小',
    icon: 'MinusCircleOutlined'
  },
  {
    key: 'fitView',
    label: '适应',
    icon: 'FullscreenExitOutlined'
  },
  {
    key: 'clear',
    label: '清空',
    icon: 'DeleteOutlined'
  }
]

const controlHandler = (key:string) => {
  if (!lf || !lf.value) return
}


</script>

<style scoped lang="less">
.head_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  .control_box {
    display: flex;
    justify-items: center;
    .control_item {
      height: 40px;
      padding: 0px 20px;
      margin-right: 20px;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: #fff;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
  }
  .btn_box {
    display: flex;
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
      margin-right: 5px;
    }
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
