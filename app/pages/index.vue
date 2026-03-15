<template>
  <div class="h-screen flex flex-col bg-gray-900 text-white font-sans antialiased">
    <!-- Header -->
    <ChatHeader :isConnected="isConnected" @logout="logout" />

    <!-- Contacts Main Area -->
    <main class="flex-1 overflow-y-auto p-4 sm:p-6 pb-20">
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Welcome Section -->
        <div class="bg-gray-800/60 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-700/50">
          <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Welcome back, {{ currentUser }}!
          </h2>
          <p class="text-gray-400 mt-2">Who would you like to message today?</p>

          <!-- Start New Chat -->
          <form @submit.prevent="startNewChat" class="mt-6 flex gap-3 relative">
            <input v-model="newRecipient" type="text" placeholder="Enter a username to start chatting..."
              class="flex-1 bg-gray-900/50 text-white rounded-xl pl-4 pr-12 py-3.5 border border-gray-700/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500 shadow-inner" />
            <button type="submit" :disabled="!newRecipient.trim()"
              class="bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-6 font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2">
              <span>Chat</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-4 h-4 hidden sm:block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>
        </div>

        <!-- Recent Contacts -->
        <div>
          <h3 class="text-xl font-semibold text-gray-200 mb-4 px-2 tracking-tight">Recent Contacts</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="contact in recentContacts" :key="contact.username" @click="openChat(contact.username)"
              class="bg-gray-800/40 hover:bg-gray-800/80 border border-gray-700/50 hover:border-gray-600 rounded-2xl p-5 cursor-pointer transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-lg font-bold text-white shadow-inner"
                    :class="contact.color">
                    {{ contact.username.charAt(0).toUpperCase() }}
                  </div>
                  <span class="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-gray-800"
                    :class="contact.online ? 'bg-emerald-500' : 'bg-gray-500'"></span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-white font-semibold truncate group-hover:text-blue-400 transition-colors">
                    {{ contact.username }}
                  </h4>
                  <p class="text-sm text-gray-500 truncate">
                    {{ contact.online ? 'Active now' : `Last seen ${contact.lastSeen}` }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const config = useRuntimeConfig()
const tokenCookie = useCookie('chat_access_token')

// Initialize the chat composable to maintain WebSocket connection and Auth states
const { isConnected, logout, currentUser } = useChat()

const newRecipient = ref('')
const contactsList = ref([])

onMounted(async () => {
  if (import.meta.client && tokenCookie.value) {
    try {
      const data = await $fetch(`${config.public.apiUrl}/users/contacts`, {
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`
        }
      })
      if (Array.isArray(data.contacts)) {
        contactsList.value = data.contacts
      }
    } catch (error) {
      console.error('Failed to load contacts:', error)
    }
  }
})

// Compute recent contacts dynamically avoiding the current user
const recentContacts = computed(() => {
  return contactsList.value
    .filter(c => c.username !== currentUser.value)
    .map(c => ({
      ...c,
      online: true, // Optionally swap with actual presence data
      color: getUserColor(c.username || c.id)
    }))
})

const startNewChat = () => {
  const target = newRecipient.value.trim()
  if (target) {
    if (target === currentUser.value) {
      alert("You cannot chat with yourself!")
      return
    }
    openChat(target)
  }
}

const openChat = (username) => {
  router.push(`/chat/${encodeURIComponent(username)}`)
}
</script>

<style scoped>
/* Scoped overrides if needed */
</style>
