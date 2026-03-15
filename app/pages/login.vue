<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden font-sans antialiased">
    <!-- Background effects -->
    <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      <div class="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -top-20 -left-20 animate-pulse"></div>
      <div class="absolute w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] bottom-0 right-0 animate-pulse" style="animation-duration: 4s; animation-delay: 1s;"></div>
    </div>

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md">
      <div class="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50">
        
        <!-- Logo/Header -->
        <div class="flex flex-col items-center mb-10">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">
            Welcome Back
          </h2>
          <p class="text-gray-400 mt-2 text-sm font-medium">Sign in to continue to NextGen Chat</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-300 ml-1">Username</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input 
                v-model="username" 
                type="text" 
                required
                class="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600 shadow-inner"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-300 ml-1">Password</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                v-model="password" 
                type="password" 
                required
                class="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600 shadow-inner"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" class="rounded border-gray-600 text-blue-500 focus:ring-blue-500/50 bg-gray-900 w-4 h-4 transition-all" />
              <span class="text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Remember me</span>
            </label>
            <a href="#" class="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors" @click.prevent="">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading || !username.trim() || !password.trim()"
            class="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 flex justify-center items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
          >
            <template v-if="!isLoading">
              <span>Sign In</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </template>
            <template v-else>
              <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Signing in...</span>
            </template>
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-500 font-medium">
          Don't have an account? 
          <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors" @click.prevent="">Create an account</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const isLoading = ref(false)

onMounted(() => {
  // Check if we are already logged in
  if (import.meta.client && localStorage.getItem('chat_username')) {
    router.push('/')
  }
})

const handleLogin = async () => {
  if (username.value.trim() && password.value.trim()) {
    isLoading.value = true
    
    // Simulate minor network delay for feedback effect
    await new Promise(resolve => setTimeout(resolve, 600))
    
    if (import.meta.client) {
      localStorage.setItem('chat_username', username.value.trim())
    }
    
    router.push('/')
  }
}
</script>

<style scoped>
/* Scoped styles */
</style>
