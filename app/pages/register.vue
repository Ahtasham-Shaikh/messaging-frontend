<template>
  <div
    class="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden font-sans antialiased">
    <!-- Background effects -->
    <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      <div
        class="absolute w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] -top-20 -left-20 animate-pulse">
      </div>
      <div class="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] bottom-0 right-0 animate-pulse"
        style="animation-duration: 4s; animation-delay: 1s;"></div>
    </div>

    <!-- Register Card -->
    <div class="relative z-10 w-full max-w-md">
      <div class="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50">

        <!-- Logo/Header -->
        <div class="flex flex-col items-center mb-10">
          <div
            class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
              stroke="currentColor" class="w-8 h-8 text-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
          </div>
          <h2
            class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 tracking-tight">
            Create Account
          </h2>
          <p class="text-gray-400 mt-2 text-sm font-medium">Join NextGen Chat today</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-300 ml-1">Username</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input v-model="username" type="text" required
                class="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-gray-600 shadow-inner"
                placeholder="Choose a username" />
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-300 ml-1">Password</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input v-model="password" :type="showPassword ? 'text' : 'password'" required
                class="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-gray-600 shadow-inner"
                placeholder="Create a password" />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-emerald-400 focus:outline-none transition-colors">
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-300 ml-1">Confirm Password</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input v-model="confirmPassword" type="password" required
                class="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-gray-600 shadow-inner"
                placeholder="Confirm your password" />
            </div>
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

          <button type="submit"
            :disabled="isLoading || !username.trim() || !password.trim() || password !== confirmPassword"
            class="w-full bg-gradient-to-r from-emerald-600 to-blue-500 hover:from-emerald-500 hover:to-blue-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-emerald-500 flex justify-center items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none">
            <template v-if="!isLoading">
              <span>Create Account</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
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
              <span>Creating account...</span>
            </template>
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-500 font-medium">
          Already have an account?
          <NuxtLink to="/login" class="text-emerald-400 hover:text-emerald-300 transition-colors font-bold">Sign In
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig, useCookie } from '#imports'

const router = useRouter()
const config = useRuntimeConfig()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const tokenCookie = useCookie('chat_access_token')

onMounted(() => {
  if (tokenCookie.value) {
    router.push('/')
  }
})

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match."
    return
  }

  if (username.value.trim() && password.value.trim()) {
    isLoading.value = true
    errorMessage.value = ''

    try {
      await $fetch(`${config.public.apiUrl}/register`, {
        method: 'POST',
        body: {
          username: username.value.trim(),
          password: password.value.trim()
        }
      })

      // On success, redirect to login with a success message (or just redirect)
      router.push('/login?registered=true')
    } catch (error) {
      if (error.response && error.response.status === 409) {
        errorMessage.value = error.response._data?.message || 'Username already exists. Please choose another.'
      } else if (error.response && error.response.status === 400) {
        errorMessage.value = error.response._data?.message || 'Registration failed. Please check your details.'
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
