'use client'

import { useEffect, useState } from 'react'
import { Button } from "../ui/shadcn/button"
import { Input } from "../ui/shadcn/Input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/shadcn/dropdown-menu"
import { FileJson, Send, Check, Zap, Hammer, GitCompare, Search, Code, ChevronDown } from 'lucide-react'
import ChatHeader from '../components/Header/ChatHeader'
import { createChat, getChatList, IChatListItem, sendMessageToChatGPT } from '../services/chats-service'
import { formatDate } from '../lib/format'


export default function ChatPage() {
    const [chatList, setChatList] = useState<IChatListItem[] | undefined>()
    const [jsonInput, setJsonInput] = useState('')
    const [jsonOutput, setJsonOutput] = useState('')
    const [selectedFeature, setSelectedFeature] = useState('JSON')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await sendMessageToChatGPT(jsonInput)

        setJsonOutput(res.choices[0].message.content)
        setJsonInput('')
    }


    const clearChat = () => {
        setJsonInput('')
        setJsonOutput('')
        setSelectedFeature('JSON')
    }

    const handleFeatureSelect = (feature: string) => {
        setSelectedFeature(feature)
    }

    const getChats = async () => {
        const res = await getChatList('26ABD48E-2902-4C44-87FE-BA2A8760D505')

        setChatList(res.value)
    }

    useEffect(() => {
        try {
            getChats()
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <ChatHeader />

            <main className="flex-grow flex overflow-hidden">
                <div className="hidden min-w-[250px] md:flex md:flex-shrink-0 bg-gray-200 p-4">
                    <nav className="w-full space-y-2">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => createChat()}>
                            <FileJson className="w-4 h-4 mr-2" />
                            Novo Chat
                        </Button>

                        {chatList?.map((chatItem) =>
                            <a href={`/chat?id=${chatItem.id}`} className='flex w-full items-center justify-between p-2 cursor-pointer bg-white hover:bg-gray-100 transition-all rounded-lg'>
                                <span className='text-sm'>{chatItem.title}</span>
                                <span className='text-xs'>{formatDate(chatItem.created_at)}</span>
                            </a>
                        )}
                    </nav>
                </div>

                <div className="flex-grow flex flex-col p-4 overflow-hidden">
                    <div className="flex-grow overflow-auto mb-4 bg-white rounded-lg shadow p-4">
                        {jsonOutput ? (
                            <pre className="whitespace-pre-wrap">{jsonOutput}</pre>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                                <FileJson className="w-16 h-16 mb-4" />
                                <h2 className="text-2xl font-bold mb-2">Bem-vindo ao JSON Genius</h2>
                                <p className="max-w-md">
                                    Use o menu suspenso para selecionar uma funcionalidade específica ou digite sua pergunta sobre JSON abaixo.
                                </p>
                            </div>
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
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect("JSON")}>
                                        <FileJson className="mr-2 h-4 w-4" />
                                        <span>JSON Geral</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect("Validar")}>
                                        <Check className="mr-2 h-4 w-4" />
                                        <span>Validar JSON</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect("Formatar")}>
                                        <Zap className="mr-2 h-4 w-4" />
                                        <span>Formatar JSON</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect("Minificar")}>
                                        <Hammer className="mr-2 h-4 w-4" />
                                        <span>Minificar JSON</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect("Transformar")}>
                                        <Code className="mr-2 h-4 w-4" />
                                        <span>Transformar JSON</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect("Analisar")}>
                                        <Search className="mr-2 h-4 w-4" />
                                        <span>Analisar JSON</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleFeatureSelect("Comparar")}>
                                        <GitCompare className="mr-2 h-4 w-4" />
                                        <span>Comparar JSON</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="flex-grow relative">
                                <Input
                                    value={jsonInput}
                                    onChange={(e) => setJsonInput(e.target.value)}
                                    placeholder={selectedFeature === 'JSON' ? "Digite sua pergunta sobre JSON ou cole seu JSON aqui..." : `${selectedFeature} JSON...`}
                                    className="pr-10"
                                />
                                <Button type="submit" size="sm" className="absolute right-1 top-1 bottom-1">
                                    <Send className="w-4 h-4" />
                                    <span className="sr-only">Enviar</span>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="p-4 text-center text-sm text-gray-500 bg-gray-200">
                © 2023 JSON Genius. Todos os direitos reservados.
            </footer>
        </div>
    )
}