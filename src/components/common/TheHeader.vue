<script setup lang="ts">
import TheHamburger from '@/components/common/TheHamburger.vue'
import IconFirebase from '@/components/icons/IconFirebase.vue'
import { signOut } from 'firebase/auth'
import { auth } from '../../util/firebase'

const isExpand = defineModel('isExpand', {
  type: Boolean
})

const logOut = async () => {
  await signOut(auth)
}
</script>

<template>
  <header>
    <div>
      <TheHamburger v-model:isExpand="isExpand" />
      <h1 class="header__logo"><IconFirebase />Chatroom - Vue</h1>
    </div>
    <div class="header__member" @click="logOut">
      <v-icon name="bi-person-circle" scale="1.5" />
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
