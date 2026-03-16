import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig, useCookie } from '#imports'
import { useWebSocket } from './useWebSocket'

interface Message {
  text: string
  sender: string
  isSelf: boolean
  timestamp: string | number
}

interface ChatHistoryResponse {
  messages: Array<{
    id: number
    sender_id: number
    receiver_id: number
    content: string
    created_at: string
    sender_name: string
  }>
}

export const useChat = (recipientUser?: string) => {
  const router = useRouter()
  const config = useRuntimeConfig()
  
  const tokenCookie = useCookie('chat_access_token')
  const userCookie = useCookie('chat_username')
  
  const messages = ref<Message[]>([])
  const currentUser = ref('Anonymous')
  const isHistoryLoading = ref(false)
  const recipientStatus = ref<{ is_online: boolean; last_seen: string | null } | null>(null)

  // Use the simplified WebSocket composable
  const { isConnected, connect, send, onMessage } = useWebSocket()

  const fetchMessageHistory = async () => {
    if (!tokenCookie.value || !recipientUser) return
    
    isHistoryLoading.value = true
    try {
      const response = await $fetch<ChatHistoryResponse>(`${config.public.apiUrl}/users/chat/${recipientUser}`, {
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`
        }
      })
      
      if (response && response.messages) {
        messages.value = response.messages.map(m => ({
          text: m.content,
          sender: m.sender_name,
          isSelf: m.sender_name === userCookie.value,
          timestamp: m.created_at
        }))
      }
    } catch (error) {
      console.error('Failed to fetch message history:', error)
    } finally {
      isHistoryLoading.value = false
    }
  }

  const fetchRecipientStatus = async () => {
    if (!tokenCookie.value || !recipientUser) return
    
    try {
      // Use the new usernames[] query parameter to fetch ONLY the recipient's status
      const response = await $fetch<{ contacts: any[] }>(`${config.public.apiUrl}/users/contacts`, {
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`
        },
        params: {
          'usernames[]': [recipientUser]
        }
      })
      
      if (response && response.contacts && response.contacts.length > 0) {
        const contact = response.contacts[0]
        recipientStatus.value = {
          is_online: contact.is_online,
          last_seen: contact.last_seen
        }
      }
    } catch (error) {
      console.error('Failed to fetch recipient status:', error)
    }
  }

  const sendMessage = (messageText: string) => {
    if (!messageText.trim() || !isConnected.value) return
  
    // Add to local state
    messages.value.push({
      text: messageText,
      sender: currentUser.value,
      isSelf: true,
      timestamp: Date.now()
    })
  
    // Send via WebSocket
    send({
      type: 'direct_message',
      recipient: recipientUser,
      content: messageText,
      sender: currentUser.value,
      timestamp: Date.now()
    })
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
      
      // Configure message handler
      onMessage((data) => {
        messages.value.push({
          text: data.text || data.message || data.content || String(data),
          sender: data.sender || 'Server',
          isSelf: data.sender === currentUser.value,
          timestamp: data.timestamp || Date.now()
        })
      })

      connect()
      
      if (recipientUser) {
        fetchMessageHistory()
        fetchRecipientStatus()
      }
    }
  })

  return {
    isConnected,
    isHistoryLoading,
    recipientStatus,
    messages,
    currentUser,
    sendMessage,
    logout
  }
}
