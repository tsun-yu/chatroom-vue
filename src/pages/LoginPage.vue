<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LoginSection from '../components/loginPage/LoginSection.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../util/firebase'

const isLogin = ref(true)
const hasMember = ref(true)

const hasMemeberToggle = () => {
  hasMember.value = !hasMember.value
}
const checkSignedStatus = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLogin.value = true
      return
    }
    isLogin.value = false
  })
}

onMounted(() => {
  checkSignedStatus()
})
</script>

<template>
  <div class="container">
    <div class="login">
      <h1 v-if="isLogin">Logged in</h1>
      <template v-else>
        <div class="switch">
          <div class="switch__option" :class="{ active: hasMember }" @click="hasMemeberToggle">
            Log In
          </div>
          <div class="switch__option" :class="{ active: !hasMember }" @click="hasMemeberToggle">
            Sign Up
          </div>
        </div>
        <LoginSection v-model:hasMember="hasMember">
          <template #label>
            {{ hasMember ? 'Login' : 'Signup' }}
          </template>
        </LoginSection>
        <!-- {hasMember ? (
        <LoginSection label="Login" hasMember="{hasMember}" />
        ) : (
        <LoginSection label="Signup" hasMember="{hasMember}" />
        )} -->
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: var(--bg-secondary);
  /* width: 100vw; */
  height: 100vh;
  display: flex;
  justify-content: center;

  .login {
    width: min(100%, 400px);

    > h1 {
      text-align: center;
    }

    .switch {
      background-color: var(--input-secondary);
      border-radius: 2rem;
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      .switch__option {
        flex: 1 1 100%;
        display: flex;
        justify-content: center;
        font-size: 1.25rem;
        font-weight: 600;
        border-radius: 2rem;
        padding: 1rem;
        cursor: pointer;

        &.active {
          background-color: var(--card-hover);
          color: var(--color-primary);
        }

        &:hover:not(.active) {
          background: linear-gradient(0deg, rgba(68, 71, 70, 0.08), rgba(68, 71, 70, 0.08));
        }
      }
    }
  }
}
</style>
