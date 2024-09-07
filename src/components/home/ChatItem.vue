<script setup lang="ts">
defineProps({
  username: String,
  message: String,
  isCurrentUser: Boolean
})
</script>

<template>
  <div class="msg" :class="{ 'msg--right': isCurrentUser }">
    <p class="msg__name">{{ username }}</p>
    <div class="msg__content">{{ message }}</div>
  </div>
</template>

<style lang="scss" scoped>
.msg {
  &.msg--right {
    text-align: end;

    div {
      background-color: var(--card-hover);
    }
  }

  .msg__name {
    margin: 0.5rem;
  }

  .msg__content {
    display: inline-block;
    background-color: var(--input-secondary);
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style>
