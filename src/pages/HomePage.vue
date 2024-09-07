<script setup lang="ts">
import ChatItem from '@/components/home/ChatItem.vue'
import { ref, onMounted, onUpdated } from 'vue'
import { auth, db } from '../util/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { child, onValue, push, ref as fbRef, update } from 'firebase/database'
import { useRouter } from 'vue-router'

const router = useRouter()

const chatContainerRef = ref<HTMLElement | null>(null)
const messages = ref<Array<MessagesType>>([])
const email = ref('')
const displayName = ref('')

const typeText = ref<string>('')

interface MessagesType {
  email: string
  id: string | null
  message: string
  username: string
}

const getData = async () => {
  const userRef = fbRef(db, 'chatroom/')
  onValue(userRef, (snapshot) => {
    const data = snapshot.val()
    const dataArray = Object.keys(data).map((key) => {
      return data[key]
    }) as Array<MessagesType>
    messages.value = dataArray
  })
}
const postData = async () => {
  if (typeText.value === '') return

  const newKey = push(child(fbRef(db), 'chatroom/')).key

  const updates: { [key: string]: MessagesType } = {}
  updates['/chatroom/' + newKey] = {
    username: displayName.value,
    email: email.value,
    message: typeText.value,
    id: newKey
  }

  await update(fbRef(db), updates)
  typeText.value = ''
}
const checkSignedStatus = async () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) router.push('/login')
    email.value = user?.email ? user.email : ''
    displayName.value = user?.displayName ? user.displayName : ''
  })
}

onMounted(async () => {
  await checkSignedStatus()
  await getData()
})
onUpdated(async () => {
  if (chatContainerRef.value) {
    chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
  }
})
</script>

<template>
  <main>
    <div class="container" ref="chatContainerRef">
      <ChatItem
        v-for="msg in messages"
        :key="msg.id"
        :username="msg.username"
        :message="msg.message"
        :isCurrentUser="msg.username === displayName"
      />
    </div>
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
