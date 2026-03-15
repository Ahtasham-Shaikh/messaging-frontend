<template>
  <div class="h-screen flex flex-col bg-gray-900 text-white font-sans antialiased">
    <!-- Header -->
    <header
      class="p-4 bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-700/50 shrink-0 flex items-center justify-between z-10 top-0 sticky">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl shadow-inner shadow-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-6 h-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </div>
        <h1
          class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
          NextGen Chat
        </h1>
      </div>
      <div class="flex items-center gap-4">
        <!-- Logout Button -->
        <button @click="logout" class="text-xs font-semibold text-gray-400 hover:text-white transition-colors">
          Logout
        </button>
        <div class="flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-700">
          <span class="relative flex h-3 w-3">
            <span v-if="isConnected"
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3"
              :class="isConnected ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'"></span>
          </span>
          <span class="text-sm font-medium tracking-wide" :class="isConnected ? 'text-emerald-400' : 'text-rose-400'">
            {{ isConnected ? 'Connected' : 'Disconnected' }}
          </span>
        </div>
      </div>
    </header>

    <!-- Chat Area -->
    <main class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 relative" ref="chatContainer">
      <!-- Empty State -->
      <div v-if="messages.length === 0"
        class="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-4">
        <div class="p-6 bg-gray-800/50 rounded-full border border-gray-700/50 shadow-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-12 h-12 opacity-50">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </div>
        <p class="text-lg font-medium opacity-80">It's quiet here. Send a message to get started!</p>
      </div>

      <!-- Messages -->
      <div v-for="(msg, i) in messages" :key="i" class="flex w-full group transition-all duration-300 transform"
        :class="msg.isSelf ? 'justify-end' : 'justify-start'">
        <div class="max-w-[85%] sm:max-w-[70%] rounded-2xl px-5 py-3 shadow-md relative" :class="msg.isSelf
          ? 'bg-gradient-to-br from-blue-600 to-blue-700 rounded-tr-sm text-white shadow-blue-900/20'
          : 'bg-gray-800 border border-gray-700 rounded-tl-sm text-gray-100 shadow-black/40'">
          <div v-if="!msg.isSelf && msg.sender" class="text-[11px] font-bold tracking-wider uppercase mb-1"
            :class="msg.isSelf ? 'text-blue-200' : 'text-emerald-400'">
            {{ msg.sender }}
          </div>
          <div class="text-[15px] leading-relaxed break-words whitespace-pre-wrap">{{ msg.text }}</div>
          <div class="text-[10px] mt-2 font-medium tracking-wide flex justify-end items-center gap-1"
            :class="msg.isSelf ? 'text-blue-200/80' : 'text-gray-500'">
            <span>{{ formatTime(msg.timestamp) }}</span>
            <svg v-if="msg.isSelf" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              class="w-3 h-3 text-blue-300">
              <path fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Input -->
    <footer class="p-4 bg-gray-900 border-t border-gray-800 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-10">
      <form @submit.prevent="sendMessage" class="flex gap-3 max-w-5xl mx-auto relative group">
        <div class="flex-1 relative">
          <input v-model="newMessage" type="text" placeholder="Write your message..."
            class="w-full bg-gray-800/80 text-white rounded-2xl pl-5 pr-12 py-4 border border-gray-700/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500 shadow-inner"
            :disabled="!isConnected" @keydown.enter.exact.prevent="sendMessage" />
          <div v-if="!isConnected" class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg class="animate-spin h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
        </div>

        <button type="submit" :disabled="!newMessage.trim() || !isConnected"
          class="bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:hover:bg-blue-600 disabled:cursor-not-allowed text-white rounded-2xl px-6 py-4 font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95">
          <span class="hidden sm:block">Send</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isConnected = ref(false)
const messages = ref([])
const newMessage = ref('')
const chatContainer = ref(null)
const currentUser = ref('Anonymous')
let socket = null
let reconnectInterval = null

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(messages, () => {
  scrollToBottom()
}, { deep: true })

const formatTime = (ts) => {
  if (!ts) return ''
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const connectWebSocket = () => {
  // Use protocol prefix correctly based on location.protocol, fallback to unsecure ws://
  let socketUrl = 'ws://localhost:3001/'

  if (import.meta.client && window.location.protocol === 'https:') {
    // If you plan to deploy, use wss
    socketUrl = `wss://${window.location.hostname}:8080/ws`
  }

  try {
    socket = new WebSocket(socketUrl)

    socket.onopen = () => {
      isConnected.value = true
      if (reconnectInterval) {
        clearInterval(reconnectInterval)
        reconnectInterval = null
      }
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        messages.value.push({
          text: data.text || data.message || data.content,
          sender: data.sender || 'Server',
          isSelf: false,
          timestamp: data.timestamp || Date.now()
        })
      } catch (e) {
        messages.value.push({
          text: event.data,
          sender: 'Server',
          isSelf: false,
          timestamp: Date.now()
        })
      }
    }

    socket.onclose = () => {
      isConnected.value = false
      // Attempt to reconnect every 3 seconds
      if (!reconnectInterval) {
        reconnectInterval = setInterval(() => {
          console.log('Attempting to reconnect...')
          connectWebSocket()
        }, 3000)
      }
    }

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error)
      socket.close() // Trigger onclose to start reconnecting
    }
  } catch (err) {
    console.error("Connection failed", err)
    isConnected.value = false
  }
}

onMounted(() => {
  if (import.meta.client) {
    const username = localStorage.getItem('chat_username')
    if (!username) {
      router.push('/login')
      return
    }
    currentUser.value = username
    connectWebSocket()
  }
})

onUnmounted(() => {
  if (reconnectInterval) clearInterval(reconnectInterval)
  if (socket) {
    socket.close()
  }
})

const logout = () => {
  if (import.meta.client) {
    localStorage.removeItem('chat_username')
    router.push('/login')
  }
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !isConnected.value) return

  const messageText = newMessage.value.trim()

  messages.value.push({
    text: messageText,
    isSelf: true,
    timestamp: Date.now()
  })

  try {
    socket.send(JSON.stringify({
      text: messageText,
      sender: currentUser.value,
      timestamp: Date.now()
    }))
  } catch (e) {
    console.error('Failed to send message via WebSocket', e)
  }

  newMessage.value = ''
}
</script>

<style>
/* Smooth scrollbar for messages area */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4B5563;
}
</style>
