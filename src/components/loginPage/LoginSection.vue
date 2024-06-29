<script setup lang="ts">
import { ref } from 'vue'
import CustomBtn from '../CustomBtn.vue'
const username = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const props = defineProps({
  hasMember: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="login">
    <h2><slot name="label"></slot></h2>
    <div className="login__input" v-if="!hasMember">
      <input type="text" id="username" placeholder="Username" v-model="username" />
    </div>
    <div className="login__input">
      <input type="email" id="email" placeholder="Email" v-model="email" />
    </div>
    <div className="login__input">
      <input type="password" id="password" placeholder="Password" v-model="password" />
    </div>
    <div className="login__input" v-if="!hasMember">
      <input type="password" id="confirm" placeholder="Confirm" v-model="confirm" />
    </div>
    <div className="login__input">
      <CustomBtn>{{ hasMember ? 'Login' : 'Signup' }}</CustomBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  /* background-color: var(--bg-secondary); */
  background-color: #fff;
  border-radius: 1.5rem;
  padding: 2rem 2rem 1rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .login__input {
    margin-bottom: 1rem;
    font-size: 1.125rem;

    label {
      display: block;
    }
    input {
      /* background-color: var(--bg-secondary); */
      border: none;
      border-bottom: 2px solid rgba(60, 64, 67, 0.08);
      padding: 0.5rem 0.5rem 0.5rem 0;
      width: 100%;
      transition: 0.3s ease-in;
      font-size: 1.125rem;

      &.error {
        border-bottom: 2px solid var(--color-error);
      }

      &:focus-visible {
        outline: none;
      }

      &:not(.error):focus-visible {
        border-bottom: 2px solid var(--input-secondary);
      }
    }
  }
}
</style>
