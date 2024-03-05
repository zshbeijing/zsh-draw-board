<template>
<div class="wrapper">
    <div class="header">
        <Head />
    </div>
    <div class="main">
        <div class="material">
          <Material />
        </div>
        <div class="canvas">
            <Canvas />
        </div>
        <div class="operation">operation</div>
    </div>
</div>
</template>

<script setup lang="ts">
import Head from '@/components/Head/index.vue'
import Material from '@/components/Material/index.vue'
import Canvas from '@/components/Canvas/index.vue'
import { provide, ref } from 'vue';

const lf = ref()
provide("lf",lf)

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
            width: 140px;
            height: 100%;
            padding: 10px;
            background-color: #53d641;
        }
        .operation {
            flex-shrink: 0;
            width: 340px;
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
