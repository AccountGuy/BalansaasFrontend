import { useEffect, useRef } from 'react'
// @ts-ignore
import { createConsumer } from '@rails/actioncable'
import { useLoginStore } from '@/stores/authStore'
import { config } from '@/config'

const useActionCableHook = (channelName: string, receivedCallback: (message: any) => any) => {
  const cableRef = useRef<any | null>(null)
  const channelRef = useRef<any | null>(null)
  const { token } = useLoginStore()

  useEffect(() => {
    // Create the consumer (WebSocket connection)
    cableRef.current = createConsumer(`${config.wsBaseUrl}?token=${token}`)

    // Create the subscription to the specified channel
    channelRef.current = cableRef.current.subscriptions.create(
      { channel: channelName },
      {
        received: receivedCallback,
        connected() {
          console.log(`Connected to ${channelName} channel`)
        },
        disconnected() {
          console.log(`Disconnected from ${channelName} channel`)
        },
      }
    )

    // Cleanup function to disconnect from the WebSocket
    return () => {
      if (channelRef.current) {
        cableRef.current.subscriptions.remove(channelRef.current)
        console.log(`Unsubscribed from ${channelName} channel`)
      }
    }
  }, [channelName, receivedCallback])
}

export default useActionCableHook
