<template>
    <div class="head_wrapper">
      <div class="btn_item" 
        v-for="i in btn_list" :key="i.key"
        @click="btnHandler(i)"
      >
        <antIcon class="icon" :icon="i.icon" />
      <span> {{ i.label }} </span>
      </div>
    </div>
</template>

<script setup lang="ts">
import { antIcon } from '@/components/AntIcon'
import type { Head }  from "@/type/index"
import { inject } from 'vue'
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

const btnHandler = (i:Head.BtnItem) => {
  switch (i.key) {
    case "import":
      importHandler();
  }
}


const importHandler = () => {
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
</style>