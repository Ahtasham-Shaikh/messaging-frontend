import { ref, onUnmounted } from 'vue'
import { useRuntimeConfig, useCookie } from '#imports'

export const useWebSocket = () => {
  const config = useRuntimeConfig()
  const tokenCookie = useCookie('chat_access_token')
  
  const isConnected = ref(false)
  let socket: WebSocket | null = null
  let reconnectInterval: any = null
  
  // Callback for when a message is received
  const onMessageHandler = ref<(data: any) => void>()

  const connect = () => {
    if (!import.meta.client) return
    
    const accessToken = tokenCookie.value
    if (!accessToken) return

    let socketUrl = config.public.wsUrl
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
        if (onMessageHandler.value) {
          try {
            const data = JSON.parse(event.data)
            onMessageHandler.value(data)
          } catch (e) {
            onMessageHandler.value(event.data)
          }
        }
      }

      socket.onclose = () => {
        isConnected.value = false
        if (!reconnectInterval) {
          reconnectInterval = setInterval(() => {
            console.log('Attempting to reconnect...')
            connect()
          }, 3000)
        }
      }

      socket.onerror = (error) => {
        console.error('WebSocket Error:', error)
        if (socket) socket.close()
      }
    } catch (err) {
      console.error("Connection failed", err)
      isConnected.value = false
    }
  }

  const send = (payload: any) => {
    if (socket && isConnected.value) {
      socket.send(JSON.stringify(payload))
      return true
    }
    return false
  }

  const disconnect = () => {
    if (reconnectInterval) clearInterval(reconnectInterval)
    if (socket) {
      socket.close()
    }
  }

  onUnmounted(() => {
    disconnect()
  })

  return {
    isConnected,
    connect,
    send,
    disconnect,
    onMessage: (handler: (data: any) => void) => {
      onMessageHandler.value = handler
    }
  }
}
