<script setup>
const props = defineProps({
  bgColor: String,
});
</script>

<template>
  <div class="content">
    <slot/>
  </div>
</template>


<style lang="scss" scoped>
.content {
    background: v-bind(bgColor);
    display: flex;
    flex: 1;
    flex-direction: row;
    height: 100%;
    overflow: auto;
    width: 100%;
  }
</style>