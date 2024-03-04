<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="{ width: width + 'px', height: height + 'px', color: color }"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>
 
<script lang="ts" setup>
import { computed } from 'vue'
interface Props {
  name:string
  prefix:string
  color:string
  width:string
  height:string
}
const props = withDefaults(defineProps<Props>(),{
  prefix:'icon',
  color: "#fff",
  height: "30",
  width: "30"
})

const symbolId = computed(() => `#${props.name}`)

</script>
 
<style scope>
.svg-icon {
  fill: currentColor;
}
</style>