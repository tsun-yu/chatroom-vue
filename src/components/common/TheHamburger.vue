<script setup lang="ts">
const isExpand = defineModel('isExpand', {
  type: Boolean
})
</script>

<template>
  <div class="hamburger">
    <input type="checkbox" id="burgerToggle" v-model="isExpand" />
    <label for="burgerToggle">
      <div></div>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.hamburger {
  input {
    display: none;

    &:checked + label > div {
      width: 0;
    }

    &:checked + label > div::before {
      margin-top: 0;
      transform: rotate(-45deg);
    }
    &:checked + label > div::after {
      margin-top: 0;
      transform: rotate(45deg);
    }
  }
  label {
    margin-right: 0.5rem;
    height: 1.375rem;
    width: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;

    div {
      width: 1rem;
      background-color: #555;
      display: block;
      position: absolute;
      height: 0.125rem;
      transition: all 0.3s ease-in;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 1.5rem;
        height: 0.125rem;
        background-color: #555;
        transition: all 0.3s ease-in;
      }
      &::before {
        margin-top: 0.5rem;
      }
      &::after {
        margin-top: -0.5rem;
      }
    }
  }
}
</style>
