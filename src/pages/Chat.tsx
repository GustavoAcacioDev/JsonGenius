'use client'

import { useEffect, useState, useRef } from 'react'
import { FileJson, Send, Check, Zap, Hammer, GitCompare, Search, Code, ChevronDown } from 'lucide-react'
import ChatHeader from '../components/Header/ChatHeader'
import { createChat, getChatList, getChatMessages, sendMessageToChatGPT } from '../services/chats-service'
import { formatDate } from '../lib/format'
import { Button } from '../components/ui/shadcn/Button'
import { Input } from '../components/ui/shadcn/Input'
import { getToken } from '../lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import MessageDisplay, { MessageSkeleton } from '../components/MessageDisplay'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/shadcn/dropdown-menu'
import { twMerge } from 'tailwind-merge'

export default function ChatPage() {
    const [jsonInput, setJsonInput] = useState('');
    const [selectedFeature, setSelectedFeature] = useState('JSON');
    const [messages, setMessages] = useState<any[]>([]); // Local state for messages
    const [isSending, setIsSending] = useState(false); // State to disable input during submission
    const [searchParams] = useSearchParams();
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const userId = getToken()?.userId || '';
    const chatId = searchParams.get('id') || '';

    const { data: chatList, refetch } = useQuery({
        queryKey: ['get-chat-list', userId],
        enabled: Boolean(userId),
        queryFn: () => getChatList(userId),
    });

    const { data: chatMessages, isLoading: isLoadingMessages, refetch: refetchMessages } = useQuery({
        queryKey: ['get-chat-messages', chatId],
        enabled: Boolean(chatId),
        queryFn: () => getChatMessages(chatId),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newMessage = {
            content: jsonInput,
            chatId,
            userId,
            role: 'user',
            created_at: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setJsonInput('');
        setIsSending(true);

        try {
            await sendMessageToChatGPT(`${selectedFeature}: ${jsonInput}`, chatId, userId);
            refetchMessages();
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsSending(false);
        }
    };

    const handleFeatureSelect = (feature: string) => {
        setSelectedFeature(feature);
    };

    const handleCreateNewChat = async () => {
        const res = await createChat();
        if (res) refetch();
    };

    useEffect(() => {
        if (chatContainerRef.current && chatMessages) {
            setMessages(chatMessages.value)
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    if (isLoadingMessages) return <MessageSkeleton />;

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <ChatHeader chatId={chatId} />

            <main className="flex-grow flex overflow-hidden">
                <div className="hidden min-w-[250px] md:flex md:flex-shrink-0 bg-gray-200 p-4">
                    <nav className="w-full space-y-2">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => handleCreateNewChat()}>
                            <FileJson className="w-4 h-4 mr-2" />
                            Novo Chat
                        </Button>

                        {chatList?.value.map((chatItem) => (
                            <a
                                key={chatItem.id}
                                href={`/chat?id=${chatItem.id}`}
                                className={twMerge("flex w-full items-center justify-between p-2 cursor-pointer bg-white hover:bg-gray-100 transition-all rounded-lg", chatItem.id === chatId && "bg-gray-300/80")}
                            >
                                <span className="text-sm">{chatItem.title}</span>
                                <span className="text-xs">{formatDate(chatItem.created_at)}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="flex-grow flex flex-col p-4 gap-3 overflow-hidden">
                    <div ref={chatContainerRef} className="flex-grow overflow-y-auto">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <FileJson className="w-16 h-16 mb-4" />
                                <h2 className="text-2xl font-bold mb-2">Bem-vindo ao JSON Genius</h2>
                                <p className="text-center max-w-md">
                                    Comece uma nova conversa selecionando uma funcionalidade e digitando sua pergunta ou colando seu JSON abaixo.
                                </p>
                            </div>
                        ) : (
                            <MessageDisplay messages={messages} />
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-40 rounded-lg">
                                        {selectedFeature} <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect('JSON')}>
                                        <FileJson className="mr-2 h-4 w-4" />
                                        <span>JSON Geral</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect('Validar')}>
                                        <Check className="mr-2 h-4 w-4" />
                                        <span>Validar JSON</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect('Formatar')}>
                                        <Zap className="mr-2 h-4 w-4" />
                                        <span>Formatar JSON</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect('Minificar')}>
                                        <Hammer className="mr-2 h-4 w-4" />
                                        <span>Minificar JSON</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect('Transformar')}>
                                        <Code className="mr-2 h-4 w-4" />
                                        <span>Transformar JSON</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect('Analisar')}>
                                        <Search className="mr-2 h-4 w-4" />
                                        <span>Analisar JSON</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect('Comparar')}>
                                        <GitCompare className="mr-2 h-4 w-4" />
                                        <span>Comparar JSON</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="flex-grow relative">
                                <Input
                                    value={jsonInput}
                                    onChange={(e) => setJsonInput(e.target.value)}
                                    placeholder={
                                        selectedFeature === 'JSON'
                                            ? 'Digite sua pergunta sobre JSON ou cole seu JSON aqui...'
                                            : `${selectedFeature} JSON...`
                                    }
                                    className="pr-10"
                                    disabled={isSending}
                                />
                                <Button type="submit" size="sm" className="absolute right-1 top-1 bottom-1" disabled={isSending}>
                                    <Send className="w-4 h-4" />
                                    <span className="sr-only">Enviar</span>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="p-4 text-center text-sm text-gray-500 bg-gray-200">
                © 2024 JSON Genius. Todos os direitos reservados.
            </footer>
        </div>
    );
}