<script setup lang="ts">
import { ref } from 'vue'
import CustomBtn from '../CustomBtn.vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
// import { errorMessages } from 'src/util/errorMessages'
import { auth } from '../../util/firebase'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('admin@gmail.com')
const password = ref('admin1234')
const confirm = ref('')
const props = defineProps({
  hasMember: {
    type: Boolean,
    required: true
  }
})

const router = useRouter()

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    router.push('/')
  } catch (error: any) {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // const customErrorMessage =
    //   errorMessages[errorCode] || `${errorCode}: ${errorMessage}`;
    // setErrMsg(customErrorMessage);
  }
}

const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await updateProfile(user, {
      displayName
    })
    router.push('/')
  } catch (error: any) {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // const customErrorMessage =
    //   errorMessages[errorCode] || `${errorCode}: ${errorMessage}`;
    // setErrMsg(customErrorMessage);
  }
}
</script>

<template>
  <div class="login">
    <h2><slot name="label"></slot></h2>
    <div className="login__input" v-if="!hasMember">
      <input type="text" id="username" placeholder="Username" v-model.trim="username" />
    </div>
    <div className="login__input">
      <input type="email" id="email" placeholder="Email" v-model.trim="email" />
    </div>
    <div className="login__input">
      <input type="password" id="password" placeholder="Password" v-model.trim="password" />
    </div>
    <div className="login__input" v-if="!hasMember">
      <input type="password" id="confirm" placeholder="Confirm" v-model.trim="confirm" />
    </div>
    <div className="login__input">
      <CustomBtn @click="signIn(email, password)" v-show="hasMember">Login</CustomBtn>
      <CustomBtn @click="signUp(email, password, username)" v-show="!hasMember">Signup</CustomBtn>
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
