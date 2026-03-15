<template>
  <div
    class="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden font-sans antialiased">
    <!-- Background effects -->
    <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      <div class="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -top-20 -left-20 animate-pulse">
      </div>
      <div
        class="absolute w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] bottom-0 right-0 animate-pulse"
        style="animation-duration: 4s; animation-delay: 1s;"></div>
    </div>

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md">
      <div class="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50">

        <!-- Logo/Header -->
        <div class="flex flex-col items-center mb-10">
          <div
            class="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
              stroke="currentColor" class="w-8 h-8 text-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <h2
            class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">
            Welcome Back
          </h2>
          <p class="text-gray-400 mt-2 text-sm font-medium">Sign in to continue to NextGen Chat</p>
          
          <!-- Success message if just registered -->
          <div v-if="route.query.registered" class="mt-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-xs font-bold rounded-full animate-bounce">
            Registration successful! Please sign in.
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-300 ml-1">Username</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input v-model="username" type="text" required
                class="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600 shadow-inner"
                placeholder="Enter your username" />
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-300 ml-1">Password</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input v-model="password" :type="showPassword ? 'text' : 'password'" required
                class="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600 shadow-inner"
                placeholder="••••••••" />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-400 focus:outline-none transition-colors">
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox"
                class="rounded border-gray-600 text-blue-500 focus:ring-blue-500/50 bg-gray-900 w-4 h-4 transition-all" />
              <span class="text-sm text-gray-400 font-medium group-hover:text-gray-300 transition-colors">Remember
                me</span>
            </label>
            <a href="#" class="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              @click.prevent="">Forgot password?</a>
          </div>

          <!-- Error message display -->
          <div v-if="errorMessage"
            class="bg-rose-500/10 border border-rose-500/50 text-rose-400 text-sm font-medium rounded-xl p-4 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 shrink-0">
              <path fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd" />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>

          <button type="submit" :disabled="isLoading || !username.trim() || !password.trim()"
            class="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 flex justify-center items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none">
            <template v-if="!isLoading">
              <span>Sign In</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </template>
            <template v-else>
              <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <span>Signing in...</span>
            </template>
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-500 font-medium">
          Don't have an account?
          <NuxtLink to="/register" class="text-blue-400 hover:text-blue-300 transition-colors font-bold">Create an account</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRuntimeConfig, useCookie } from '#imports'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// Initialize cookies with 7-day expiration, secure, and lax same-site policy for better security than localStorage
const tokenCookie = useCookie('chat_access_token', { maxAge: 60 * 60 * 24 * 7, sameSite: 'lax', secure: import.meta.env?.PROD })
const userCookie = useCookie('chat_username', { maxAge: 60 * 60 * 24 * 7, sameSite: 'lax', secure: import.meta.env?.PROD })

onMounted(() => {
  if (tokenCookie.value) {
    router.push('/')
  }
})

const handleLogin = async () => {
  if (username.value.trim() && password.value.trim()) {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const response = await $fetch(`${config.public.apiUrl}/login`, {
        method: 'POST',
        body: {
          username: username.value.trim(),
          password: password.value.trim()
        }
      })

      // On success status 200, assume we get the access token
      if (import.meta.client) {
        tokenCookie.value = response.accessToken || response.token || 'mock_token'
        userCookie.value = username.value.trim() 
      }

      router.push('/')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        errorMessage.value = error.response._data?.message || error.response._data?.error || 'Invalid credentials. Please try again.'
      } else {
        errorMessage.value = 'Failed to connect to the server. Please try again later.'
      }
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<style scoped>
/* Scoped styles */
</style>
