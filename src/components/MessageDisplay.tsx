'use client'

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

const extractJsonFromString = (str: string) => {
  const startIndex = str.indexOf('{');
  const endIndex = str.lastIndexOf('}');
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    return str.substring(startIndex, endIndex + 1);
  }
  return null;
}

const formatJsonWithSyntaxHighlighting = (jsonString: string) => {
  try {
    const obj = JSON.parse(jsonString);
    return Object.entries(obj).map(([key, value], index) => (
      <div key={index} className="ml-4">
        <span className="text-emerald-300">&quot;{key}&quot;</span>
        <span className="text-white">: </span>
        {typeof value === 'object' ? (
          <>
            <span className="text-white">{Array.isArray(value) ? '[' : '{'}</span>
            {formatJsonWithSyntaxHighlighting(JSON.stringify(value))}
            <span className="text-white">{Array.isArray(value) ? ']' : '}'}</span>
          </>
        ) : (
          <span className={
            typeof value === 'string'
              ? 'text-amber-300'
              : typeof value === 'number'
                ? 'text-blue-300'
                : 'text-red-300'
          }>{typeof value === 'string' ? `"${value}"` : String(value)}</span>
        )}
        {index < Object.entries(obj).length - 1 && <span className="text-white">,</span>}
      </div>
    ));
  } catch (e) {
    return jsonString;
  }
};

export default function MessageDisplay({ messages }: MessageDisplayProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const renderMessageContent = (content: string) => {
    const jsonPart = extractJsonFromString(content);
    if (jsonPart) {
      const textBeforeJson = content.substring(0, content.indexOf(jsonPart));
      const textAfterJson = content.substring(content.indexOf(jsonPart) + jsonPart.length);
      return (
        <div className="space-y-2">
          {textBeforeJson && <p className="text-sm text-white">{textBeforeJson}</p>}
          <pre className="bg-gray-900 p-3 rounded-md text-white overflow-x-auto text-xs">
            <span className="text-white">{'{'}</span>
            {formatJsonWithSyntaxHighlighting(jsonPart)}
            <span className="text-white">{'}'}</span>
          </pre>
          {textAfterJson && <p className="text-sm text-white">{textAfterJson}</p>}
        </div>
      );
    }
    return <p className="text-sm text-white">{content}</p>;
  }

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-grow overflow-y-auto bg-white shadow-lg rounded-md h-full">
      <div className="flex flex-col justify-end min-h-[76dvh] p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FileJson className="w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Bem-vindo ao JSON Genius</h2>
            <p className="text-center max-w-md">
              Comece uma nova conversa selecionando uma funcionalidade e digitando sua pergunta ou colando seu JSON abaixo.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-4 mb-4 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'
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
                className={`flex flex-col max-w-[80%] ${message.role === 'assistant' ? 'items-start' : 'items-end'
                  }`}
              >
                <div
                  className={`p-3 max-w-[650px] rounded-lg ${message.role === 'assistant'
                      ? 'bg-blue-600'
                      : 'bg-slate-600'
                    }`}
                >
                  {renderMessageContent(message.content)}
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
          ))
        )}
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