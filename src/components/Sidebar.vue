<script setup>
import { ref, computed } from "vue";
import color from 'color';
//import { useRouter, useRoute } from "vue-router";

// Component setup
const emit = defineEmits(["sidebarToggle"]);
const props = defineProps({
  backgroundShade: String,
  boxShadowColor: String,
  bgColor: String,
  fontColor: String,
  isMobile: Boolean,
  menuItems: {
    type: Array,
    required: true,
  },
  sidebarOpen: Boolean,  
  primaryColor: String,  
  useRouteInstance: Object,
  useRouterInstance: Object,
  width: String
});

// Color transformations
const optionsBlockTitleColor = computed(() => {
  if(color(props.bgColor).isLight()) return color(props.fontColor).lighten(0.5).hex()
  else return color(props.fontColor).darken(0.3).hex()
}); //For options block titles

const activeButtonGlowColor = computed(() => color(props.primaryColor).alpha(0.6).hexa()); //For options block titles

// Sidebar
function toggleSidebar() {
  emit("sidebarToggle");
}

// Sidebar - Menu
const activeRoute = computed(() => {
  if(props.useRouteInstance) return props.useRouteInstance.path.startsWith(item.to)
  else return '/app/expenses' 
})

function handleListItemClick(pageTo) {
  if(props.useRouterInstance) props.useRouterInstance.push({ path: pageTo });
  props.isMobile && emit("sidebarToggle"); // Close sidebar if mobile size
}

</script>

<template>
  <div :class="['sidebar', sidebarOpen ? '' : 'sidebar--closed']">
    <div class="sidebar-header">
      <slot />
    </div>
    <div class="sidebar-menu">
      <div class="options-blocks-container">
        <div v-for="section in props.menuItems" :key="section.section" class="options-block">
          <p class="options-block__title">{{ section.section }}</p>
          <ul class="options-block__content">
            <div v-for="item in section.options" :key="item.id" class="menu-button-wrapper">
              <!-- case of option with subchildren -->
              <li v-if="item.children && item.children.length > 0" class="suboptions-container">
                <input class="suboptions-toggle" type="checkbox" :name="item.displayText" :id="item.displayText" />
                <label :for="item.displayText" class="menu-button">
                  <ion-icon v-if="item.ionIcon" class="menu-button__icon" :name="item.ionIcon" />
                  <p class="menu-button__text">{{ item.displayText }}</p>
                  <ion-icon class="menu-button__chevron" name="chevron-forward-outline" />
                </label>
                <ul v-if="item.children && item.children.length > 0" class="suboptions-block">
                  <li v-for="child in item.children" :key="child.displayText" class="menu-button" @click="handleListItemClick(child.to)">
                    <ion-icon v-if="child.ionIcon" class="menu-button__icon" :name="child.ionIcon" />
                    <p class="menu-button__text">{{ child.displayText }}</p>
                  </li>
                </ul>
              </li>
              <!-- case of option without subchildren -->
              <li v-else @click="handleListItemClick(item.to)" :class="[
              activeRoute == item.to ? 'menu-button__active' : 'menu-button',]">
                <ion-icon v-if="item.ionIcon" class="menu-button__icon" :name="item.ionIcon" />
                <p class="menu-button__text">{{ item.displayText }}</p>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div :class="['backdrop', sidebarOpen && isMobile ? '' : 'backdrop--hidden']" @click="toggleSidebar"></div>
</template>



<style lang="scss" scoped>
// v-binds
$activeButtonGlowColor: v-bind(activeButtonGlowColor);
$backgroundShade: v-bind(backgroundShade);
$bgColor: v-bind(bgColor);
$boxShadowColor: v-bind(boxShadowColor);
$optionsBlockTitleColor: v-bind(optionsBlockTitleColor);
$primaryColor: v-bind(primaryColor);
$sidebarWidth: v-bind(width);

/* Sidebar */
.sidebar {
  background: $bgColor;
  box-shadow: 0 4px 15px 0 $boxShadowColor;
  height: 100%;
  position: fixed;
  overflow: hidden;
  transition: transform 0.3s;
  width: $sidebarWidth;
  z-index: 50;

  &.sidebar--closed {
    transform: translateX(-250px);
  }
}

.sidebar-header {
  height: 3.5rem;
}

/* Menu */
.sidebar-menu {
  height: calc(100% - 3.5rem);
  overflow: hidden;
  width: 100%;
}

.options-blocks-container{
  height: 100%;
  margin-top: 1.25rem;
  overflow: auto;
  width: 100%;
}

.options-block {
  margin-bottom: 1.25rem;
}

.options-block__content {
  margin-top: 0.75rem;
}

.options-block__title {
  color: $optionsBlockTitleColor;
  font-size: 0.75rem;
  font-weight: 600;
  padding-left: 0.75rem;
  text-transform: uppercase;
}

.menu-button-wrapper{
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.menu-button__base {
  align-items: center;
  display: flex;
  cursor: pointer;
  height: 100%;
  padding: 0.625rem;
  transition: 0.15s padding ease-out;
  width: 100%;
}

.suboptions-container {
  @extend .menu-button__base;
  padding: 0px;
  flex-direction: column;
}

.menu-button {
  @extend .menu-button__base;

  &:hover {
    padding-left: 0.75rem;
  }
}

.menu-button__active {
  @extend .menu-button__base;
  background: $primaryColor;
  //box-shadow: 0 0 10px 1px rgba($primaryColor, 60%);
  box-shadow: 0 0 5px 1px $activeButtonGlowColor;
  border-radius: 4px;
  padding: 0.6rem;

  & * {
    color: #f7f7f7;
    font-weight: 600;
  }
}

.menu-button__icon {
  margin-right: 0.5rem;
}

.menu-button__text {
  flex: 1 1 auto;
  font-size: 0.875rem;
  font-weight: 500;
}

.menu-button__chevron {
  flex: 0 0 1;
  font-size: 1.125rem;
  transition: transform 0.25s ease;
}

.suboptions-toggle {
  display: none; // keep hidden

  &:checked+label>.menu-button__chevron {
    transform: rotate(90deg);
  }
}

.suboptions-block {
  align-self: center;
  background: $backgroundShade;
  border-radius: 5px;
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.25s cubic-bezier(0, 1, 0, 1);
  width: 100%;
}

.suboptions-toggle:checked~.suboptions-block {
  overflow: auto;
  max-height: 1000px;
  transition: max-height 1s ease;
}

/* Backdrop */
.backdrop {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  transition: opacity 0.25s ease;
  opacity: 1;
  z-index: 30;

  &.backdrop--hidden {
    height: 0px;
    width: 0px;
    opacity: 0;
  }

}
</style>