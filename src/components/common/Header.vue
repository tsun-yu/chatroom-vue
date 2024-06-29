<script setup lang="ts">
import Hamburger from '@/components/common/Hamburger.vue'
import IconFirebase from '@/components/icons/IconFirebase.vue'
import { CircleUser } from 'lucide-vue-next'

const isExpand = defineModel('isExpand', {
  type: Boolean
})
</script>

<template>
  <header>
    <div>
      <Hamburger v-model:isExpand="isExpand" />
      <h1 class="header__logo"><IconFirebase />Chatroom - React</h1>
    </div>
    <div class="header__member">
      <CircleUser />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: header;
  padding-left: 1.125rem;

  div {
    display: flex;
    align-items: center;

    .header__logo {
      font-size: 1.5rem;
      color: #555;
      display: flex;
      align-items: center;
    }
  }
  .header__member {
    font-size: 1.5rem;
    color: #555;
    cursor: pointer;
  }
}
</style>
