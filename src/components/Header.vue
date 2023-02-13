<script setup>
const emit = defineEmits(["sidebarToggle"]);
const props = defineProps({
  bgColor: String,
  boxShadowColor: String,
});


function toggleSidebar() {
  emit('sidebarToggle');
}
</script>

<template>
  <div class="header">
    <ion-icon class="header__toggle-sidebar" name="menu-outline"  @click="toggleSidebar"/>
    <slot />
  </div>
</template>


<style scoped lang="scss">
// v-binds
$bgColor: v-bind(bgColor);
$boxShadowColor: v-bind(boxShadowColor);

.header {
  align-items: center;
  background: $bgColor;
  box-shadow: 0 0 15px 0 $boxShadowColor;
  display: flex;
  padding-right: 1.5rem;
  height: 3.5rem;
  width: 100%;
  z-index: 10;

  .header__toggle-sidebar {
    cursor: pointer;
    font-size: 1.5rem;
    padding: 1.5rem;
  }
}
</style>