<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TheHeader from '@/components/common/TheHeader.vue'
import SidebarItem from './components/common/SidebarItem.vue'

const isExpand = ref(false)
</script>

<template>
  <div id="root" :class="{ expand: isExpand }">
    <TheHeader v-model:isExpand="isExpand" />
    <SidebarItem />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
#root {
  width: 100%;
  height: 100dvh;
  display: grid;
  grid-template-rows: 4rem minmax(0, 1fr);
  grid-template-columns: 4.875rem minmax(0, 1fr);
  transition: 0.3s ease-in;
  overflow: hidden;
  padding: 0 2rem 2rem 0.75rem;

  grid-template-areas:
    'header header'
    'aside main ';

  &.expand {
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}
</style>
