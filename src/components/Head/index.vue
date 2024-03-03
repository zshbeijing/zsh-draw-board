<template>
    <div class="head_wrapper">
      <div class="btn_item" v-for="i in btn_list" :key="i.key"> {{ i.label }} </div>
    </div>
</template>

<script setup lang="ts">
import type { Head }  from "@/type/index"
const btn_list:Head.BtnItem[] = [
    {
        key: "import",
        label: "导入"
    },
    {
        key: "export",
        label: "导出"
    }
]
</script>

<style scoped lang="less">
  .head_wrapper {
    width: 100%;
    height: 100%;
  }
</style>