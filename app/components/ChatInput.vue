<template>
  <footer class="p-4 bg-gray-900 border-t border-gray-800 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-10">
    <form @submit.prevent="handleSubmit" class="flex gap-3 max-w-5xl mx-auto relative group">
      <div class="flex-1 relative">
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="text" placeholder="Write your message..."
          class="w-full bg-gray-800/80 text-white rounded-2xl pl-5 pr-12 py-4 border border-gray-700/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500 shadow-inner"
          :disabled="!isConnected" @keydown.enter.exact.prevent="handleSubmit" />
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

      <button type="submit" :disabled="!modelValue.trim() || !isConnected"
        class="bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:hover:bg-blue-600 disabled:cursor-not-allowed text-white rounded-2xl px-6 py-4 font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95">
        <span class="hidden sm:block">Send</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  </footer>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  isConnected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'send'])

const handleSubmit = () => {
  if (props.modelValue.trim() && props.isConnected) {
    emit('send')
  }
}
</script>
