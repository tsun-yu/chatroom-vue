<script setup lang="ts">
import IconReact from '@/components/icons/IconReact.vue'
import IconVue from '@/components/icons/IconVue.vue'
import IconSvelte from '@/components/icons/IconSvelte.vue'
</script>

<template>
  <nav>
    <a href="https://chatroom-react-nu.vercel.app/" target="_blank">
      <p>
        <IconReact />
      </p>
      React
    </a>
    <a class="aside__link--active">
      <p>
        <IconVue />
      </p>
      Vue3
    </a>
    <a href="">
      <p>
        <IconSvelte />
      </p>
      Svelte (Coming soon)
    </a>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  margin-right: 1rem;
  overflow: hidden;
  grid-area: aside;

  a {
    text-decoration: none;
    color: #555;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    padding: 0.75rem 1.25rem;
    border-radius: 2rem;
    white-space: nowrap;

    p {
      display: flex;
      align-items: center;
      margin-right: 1.125rem;
      font-size: 1.5rem;
    }

    &:hover:not(.aside__link--active) {
      background-color: var(--link-hover);
    }
  }
  .aside__link--active {
    background-color: var(--btn-secondary);
    font-weight: 700;
    color: #222;
  }
}
</style>
