<script setup lang="ts">
import { computed, ref } from 'vue'
import CustomBtn from '../CustomBtn.vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { auth } from '../../util/firebase'
import { useRouter } from 'vue-router'
import { errorMessages } from '@/util/errorMessages'

const username = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const errMsg = ref('')
const emailInputErr = computed(() => {
  return (
    errMsg.value === "Account doesn't exist" ||
    errMsg.value === 'That Email is taken. Try another.' ||
    errMsg.value === 'Wrong Email or Password'
  )
})
const passwordInputErr = computed(() => {
  return (
    errMsg.value === 'Wrong Password' ||
    errMsg.value === "Passwords didn't match. Try again." ||
    errMsg.value === 'Wrong Email or Password'
  )
})
const confirmInputErr = computed(() => {
  return errMsg.value === "Passwords didn't match. Try again."
})

const props = defineProps({
  hasMember: {
    type: Boolean,
    required: true
  }
})

const router = useRouter()

const handleLoginClick = () => {
  if (props.hasMember) {
    signIn(email.value, password.value)
    return
  }

  if (password.value !== confirm.value) {
    errMsg.value = "Passwords didn't match. Try again."
    return
  }
  signUp(email.value, password.value, username.value)
}
const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    router.push('/')
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    const customErrorMessage = errorMessages[errorCode] || `${errorCode}: ${errorMessage}`
    errMsg.value = customErrorMessage
  }
}
const signUp = async (email: string, password: string, displayName: string) => {
  if (password !== confirm.value) {
    errMsg.value = "Passwords didn't match. Try again."
    return
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await updateProfile(user, {
      displayName
    })
    router.push('/')
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    const customErrorMessage = errorMessages[errorCode] || `${errorCode}: ${errorMessage}`
    errMsg.value = customErrorMessage
  }
}
</script>

<template>
  <div class="errMsg" v-if="errMsg">{{ errMsg }}</div>
  <div class="login">
    <h2><slot name="label"></slot></h2>
    <div className="login__input" v-if="!hasMember">
      <input
        type="text"
        id="username"
        placeholder="Username"
        v-model.trim="username"
        @keydown.enter="handleLoginClick"
      />
    </div>
    <div className="login__input">
      <input
        type="email"
        id="email"
        :class="{ error: emailInputErr }"
        placeholder="Email"
        v-model.trim="email"
        @keydown.enter="handleLoginClick"
      />
    </div>
    <div className="login__input">
      <input
        type="password"
        id="password"
        :class="{ error: passwordInputErr }"
        placeholder="Password"
        v-model.trim="password"
        @keydown.enter="handleLoginClick"
      />
    </div>
    <div className="login__input" v-if="!hasMember">
      <input
        type="password"
        id="confirm"
        :class="{ error: confirmInputErr }"
        placeholder="Confirm"
        v-model.trim="confirm"
        @keydown.enter="handleLoginClick"
      />
    </div>
    <div className="login__input">
      <CustomBtn @click="handleLoginClick" v-show="hasMember">Login</CustomBtn>
      <CustomBtn @click="handleLoginClick" v-show="!hasMember">Signup</CustomBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.errMsg {
  width: 100%;
  border-radius: 1.5rem;
  background-color: var(--color-error-container);
  color: var(--color-error);
  font-size: 1.125rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
}
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
