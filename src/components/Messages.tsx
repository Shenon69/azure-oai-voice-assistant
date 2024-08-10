import React from 'react'
import { Message } from '@/app/page'
import { ChevronDownCircle } from 'lucide-react'
import LoadingMessage from './LoadingMessage';

interface Props {
  messages: Message[]
}

function Messages({ messages }: Props) {
  const reversedMessages = [...messages].reverse();

  return (
    <div className={`${messages?.length > 0 ? "pb-96" : "pb-52"} flex flex-col min-h-screen pt-20`}>

      <LoadingMessage />

      {!messages?.length && (
        <div className='flex flex-col space-y-10 flex-1 items-center justify-end pl-6'>
          <p className='text-gray-500 animate-pulse'>
            Start a conversation with the voice assistant
          </p>
          <ChevronDownCircle size={64} className='animate-bounce text-gray-500' />
        </div>
      )}

      <div className='p-5'>
        {
          reversedMessages.map(message => (
            <div key={message.id} className='flex gap-3 py-4 flex-col'>
              {/* Sender */}
              <div className='flex justify-end'>
                <p className='message text-left ml-auto rounded-br-none'>
                  {message.sender}
                </p>
              </div>

              {/* Reciever */}
              <div className=''>
                <p className='message max-w-[85%] bg-gray-800 rounded-bl-none'>
                  {message.response}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Messages
