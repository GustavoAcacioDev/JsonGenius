import { FileJson, User } from 'lucide-react'
import { ScrollArea } from './ui/shadcn/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from './ui/shadcn/avatar'
import { Skeleton } from './ui/shadcn/skeleton'
import { useEffect, useRef } from 'react'

interface Message {
    id: string
    user_id: string | null
    chat_id: string
    role: 'assistant' | 'user'
    content: string
    created_at: string
}

interface MessageDisplayProps {
    messages: Message[]
}

export default function MessageDisplay({ messages }: MessageDisplayProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, [messages])
  
    return (
      <ScrollArea ref={scrollAreaRef} className="flex-grow overflow-y-auto bg-white shadow-lg rounded-md h-full">
        <div className="flex flex-col justify-end min-h-[76dvh] p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-4 mb-4 ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="JSON Problem Solver" />
                  <AvatarFallback>
                    <FileJson className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`flex flex-col ${
                  message.role === 'assistant' ? 'items-start' : 'items-end'
                }`}
              >
                <div
                  className={`p-3 rounded-lg text-white ${
                    message.role === 'assistant'
                      ? 'bg-primary'
                      : 'bg-slate-600'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {new Date(message.created_at).toLocaleString('pt-br', { timeZone: 'UTC' })}
                </span>
              </div>
              {message.role === 'user' && (
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Usuário" />
                  <AvatarFallback>
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    )
  }

export function MessageSkeleton() {
    return (
        <ScrollArea className="flex-grow p-4 bg-white rounded-lg shadow">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className={`flex items-start space-x-4 mb-4 ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                        }`}
                >
                    {index % 2 === 0 && (
                        <Avatar className="w-10 h-10">
                            <AvatarFallback>
                                <FileJson className="w-6 h-6" />
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'
                            }`}
                    >
                        <Skeleton className={`h-10 ${index % 2 === 0 ? 'w-64' : 'w-48'} rounded-lg`} />
                        <Skeleton className="h-4 w-24 mt-1" />
                    </div>
                    {index % 2 !== 0 && (
                        <Avatar className="w-10 h-10">
                            <AvatarFallback>
                                <User className="w-6 h-6" />
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))}
        </ScrollArea>
    )
}