<template>
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
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})

const chatContainer = ref(null)

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(() => props.messages, () => {
  scrollToBottom()
}, { deep: true })

const formatTime = (ts) => {
  if (!ts) return ''
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>
