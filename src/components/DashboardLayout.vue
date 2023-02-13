<script setup>
import { ref, computed, onBeforeMount, onUnmounted } from "vue";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import Content from "./Content.vue";
import { dummyMenu } from "../dummy";
import color from 'color';


// Component setup
const emit = defineEmits(["sidebarToggle"]);
const props = defineProps({
  menu: {
    type: Array,
    default: dummyMenu
  },
  routerInstance: Object,
  mobileBreakpoint: {
    type: Number,
    default: 1024
  },
  backgroundColor: {
    type: String,
    default: '#fff'//'#222b45'
  },
  contentBackgroundShade: {
    type: Number,
    default: -0.025
  },
  primaryColor: {
    type: String,
    default: '#4361ee'
  },
  fontColor: {
    type: String,
    default: '#6a707c'//'#bac8d3' 
  },
  sidebarWidth: {
    type: String,
    default: '15rem'
  }
});


// Common color transformations
const backgroundShade = computed(() => color(props.backgroundColor).lighten(props.contentBackgroundShade).hex()); // For content and sidebar child items blocks
const boxShadowColor = computed(() => color(props.backgroundColor).darken(0.5).alpha(color(props.backgroundColor).isLight() ? 0.2 : 0.5).hexa()); // For sidebar and header


// Sidebar state
const sidebarOpen = ref(null);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}


// Screen size listener
const isMobile = ref(null);

function handleResize() {
  if (window.innerWidth < props.mobileBreakpoint) {
    sidebarOpen.value = false;
    isMobile.value = true;
  } else {
    sidebarOpen.value = true;
    isMobile.value = false;
  }
}

onBeforeMount(() => {
  window.addEventListener("resize", handleResize);

  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

</script>

<template>
  <div class="layout-container">
    <Sidebar 
      :sidebarOpen="sidebarOpen"
      :isMobile="isMobile"
      :width="props.sidebarWidth"
      :menuItems="props.menu"
      :bgColor="props.backgroundColor"
      :primaryColor="props.primaryColor"
      :fontColor="props.fontColor"
      :backgroundShade="backgroundShade"
      :boxShadowColor="boxShadowColor"
      @sidebarToggle="toggleSidebar" 
      >
      <slot name="sidebar-logo" />
    </Sidebar>
    <div :class="[
      'dshb-layout',
      (sidebarOpen && !isMobile) ? 'dshb-layout--sidebar-padding' : '',
    ]">
      <Header @sidebarToggle="toggleSidebar" :bgColor="props.backgroundColor" :boxShadowColor="boxShadowColor">
        <slot name="header" />
      </Header>
      <Content :bgColor="backgroundShade">
        <slot name="content" />
      </Content>
    </div>
  </div>
</template>

<style lang="scss">
// v-binds
$backgroundShade: v-bind(backgroundShade);
$fontColor: v-bind(fontColor);
$sidebarWidth: v-bind(sidebarWidth);

.layout-container{
  background-color: backgroundShade;
  height: 100vh;
  overflow: hidden;
  width: 100vw;  

  & * {
    color: $fontColor;
    font-family: 'Montserrat';
  }
  
  // Begin reset
  & * {
    box-sizing: border-box;
  }

  & *:before,
  *:after {
    box-sizing: inherit;
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  & ol,
  ul {
    list-style: none;
  }
  // End reset
}

.dshb-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  padding-left: 0px;
  width: 100vw;
  transition: padding 0.3s;

  &.dshb-layout--sidebar-padding {
    padding-left: $sidebarWidth;
  }
}
</style>