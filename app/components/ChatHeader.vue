<template>
  <header
    class="p-4 bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-700/50 shrink-0 flex items-center justify-between z-10 top-0 sticky">
    <div class="flex items-center gap-3">
      <!-- Back button if chatting -->
      <button v-if="chattingWith" @click="$emit('back')" class="mr-2 p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div class="p-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl shadow-inner shadow-white/20">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      </div>
      <h1 class="flex flex-col">
        <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-tight capitalize">
          {{ chattingWith || 'NextGen Chat' }}
        </span>
        <div v-if="chattingWith" class="text-xs font-semibold text-gray-400 flex items-center gap-1.5 mt-0.5">
          <span v-if="recipientStatus" class="flex items-center gap-1.5">
            <span v-if="recipientStatus.is_online" class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
              <span class="text-emerald-400">Online</span>
            </span>
            <span v-else-if="recipientStatus.last_seen" class="text-gray-500 italic">
              Last seen {{ formatLastSeen(recipientStatus.last_seen) }}
            </span>
            <span v-else class="text-gray-500 italic">Offline</span>
          </span>
          <span v-else class="italic opacity-50">Connecting...</span>
        </div>
      </h1>
    </div>
    <div class="flex items-center gap-4">
      <!-- Logout Button -->
      <button @click="$emit('logout')" class="text-xs font-semibold text-gray-400 hover:text-white transition-colors">
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
</template>

<script setup>
defineProps({
  isConnected: {
    type: Boolean,
    default: false
  },
  chattingWith: {
    type: String,
    default: ''
  },
  recipientStatus: {
    type: Object,
    default: null
  }
})
defineEmits(['logout', 'back'])

const formatLastSeen = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>
