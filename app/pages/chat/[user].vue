<template>
  <div class="h-screen flex flex-col bg-gray-900 text-white font-sans antialiased">
    <!-- Header -->
    <ChatHeader 
      :isConnected="isConnected" 
      @logout="logout" 
      @back="goBack"
      :chattingWith="recipientParam"
    />

    <!-- Chat Area -->
    <ChatMessages 
      :messages="messages" 
    />

    <!-- Footer Input -->
    <ChatInput 
      v-model="newMessage" 
      :isConnected="isConnected" 
      @send="handleSend" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useChat } from '#imports'

const route = useRoute()
const router = useRouter()

// Get the user from the dynamic URL route (e.g. /chat/alice -> 'alice')
const recipientParam = route.params.user

const newMessage = ref('')
const { isConnected, messages, sendMessage, logout } = useChat(recipientParam)

const handleSend = () => {
  if (newMessage.value.trim()) {
    sendMessage(newMessage.value.trim())
    newMessage.value = ''
  }
}

const goBack = () => {
  router.push('/')
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
