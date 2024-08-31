<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SendHorizontal } from 'lucide-vue-next'
const chatContainerRef = ref<HTMLElement | null>(null)
const typeText = ref<string>('')
const postData = () => {
  console.log('post data')
}
</script>

<template>
  <main>
    <div class="container" ref="chatContainerRef"></div>
    <div class="input__container">
      <input
        type="text"
        id="expenseItem"
        placeholder="Say something ..."
        v-model.trim="typeText"
        @keydown.enter.prevent="postData"
      />
      <button @click="postData">
        <v-icon name="oi-paper-airplane" scale="1.5" />
      </button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-area: main;
  gap: 1rem;

  .container {
    flex: 1 1;
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 1rem;
    overflow: auto;
  }

  .input__container {
    width: 100%;
    flex: 0 0 4rem;
    /* background-color: var(--inputs-bg); */
    background-color: var(--input-secondary);
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-inline: 0.75rem;

    input {
      border: none;
      height: 2.75rem;
      padding-inline: 1.5rem;
      font-size: 1.25rem;
      color: #555;
      background-color: var(--inputs-bg);
      /* border-bottom: 0.125rem solid #ccc; */
      border: none;
      flex: 1 1;
      width: 100%;
      border-radius: 1.5rem;
      outline: 0.125rem solid #ccc;

      &::placeholder {
        color: #ccc;
      }

      &:focus-visible {
        outline: 0.125rem solid var(--input-border-focus);
        background-color: #fff;
      }

      &:not(:focus-visible):hover {
        outline: 0.125rem solid #aaa;
      }
    }

    button {
      flex: 0 0 2.75rem;
      height: 2.75rem;
      border: none;
      cursor: pointer;
      border-radius: 50%;
      background-color: var(--btn-primary);
      font-size: 1.5rem;
      color: #555;
      display: grid;
      place-items: center;

      &:active {
        background-color: #bce1c7;
      }
    }
  }
}
</style>
