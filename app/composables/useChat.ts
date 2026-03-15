import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig, useCookie } from '#imports'

export const useChat = (recipientUser = 'testuser') => {
  const router = useRouter()
  const config = useRuntimeConfig()
  
  const tokenCookie = useCookie('chat_access_token')
  const userCookie = useCookie('chat_username')
  
  const isConnected = ref(false)
  const messages = ref([])
  const currentUser = ref('Anonymous')
  
  let socket = null
  let reconnectInterval = null

  const connectWebSocket = () => {
    if (!import.meta.client) return
  
    const accessToken = tokenCookie.value
    const username = userCookie.value
  
    if (!accessToken || !username) {
      router.push('/login')
      return
    }
  
    // Use runtime config for WebSocket URL
    let socketUrl = config.public.wsUrl
    
    // Append the JWT token as a query parameter
    const separator = socketUrl.includes('?') ? '&' : '?'
    socketUrl += `${separator}token=${encodeURIComponent(accessToken)}`
  
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

  const sendMessage = (messageText) => {
    if (!messageText.trim() || !isConnected.value) return
  
    messages.value.push({
      text: messageText,
      isSelf: true,
      timestamp: Date.now()
    })
  
    try {
      socket.send(JSON.stringify({
        type: 'direct_message',
        recipient: recipientUser,
        content: messageText,
        sender: currentUser.value,
        timestamp: Date.now()
      }))
    } catch (e) {
      console.error('Failed to send message via WebSocket', e)
    }
  }

  const logout = () => {
    if (import.meta.client) {
      tokenCookie.value = null
      userCookie.value = null
      router.push('/login')
    }
  }

  onMounted(() => {
    if (import.meta.client) {
      if (!tokenCookie.value || !userCookie.value) {
        router.push('/login')
        return
      }
      currentUser.value = userCookie.value
      connectWebSocket()
    }
  })
  
  onUnmounted(() => {
    if (reconnectInterval) clearInterval(reconnectInterval)
    if (socket) {
      socket.close()
    }
  })

  return {
    isConnected,
    messages,
    currentUser,
    sendMessage,
    logout
  }
}
