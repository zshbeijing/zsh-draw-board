<template>
<div class="wrapper">
    <div class="header">
        <Head />
    </div>
    <div class="main">
        <div class="material">material</div>
        <div class="canvas">canvas</div>
        <div class="operation">operation</div>
    </div>
</div>
</template>

<script setup lang="ts">
import Head from '@/components/Head/index.vue'

</script>

<style scoped lang="less">
.wrapper {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    .header {
        height: 64px;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #999;
    }
    .main {
        flex: 1;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: calc(100% - 64px);
        background-color: #ccc;
        .material {
            flex-shrink: 0;
            width: 240px;
            height: 100%;
            background-color: #53d641;
        }
        .operation {
            flex-shrink: 0;
            width: 240px;
            height: 100%;
            background-color: #ee9816;
        }
        .canvas {
            flex: 1;
            height: 100%;
            background-color: #48a9eb;
        }
    }
}
</style>
