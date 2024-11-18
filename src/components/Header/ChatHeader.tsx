import { FileJson, LogOut, Settings, Trash2, User } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/shadcn/Button'
import { deleteChatMessages } from '../../services/chats-service'
import { useQueryClient } from '@tanstack/react-query'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/shadcn/dropdown-menu'
import { redirect } from 'react-router-dom'

function ChatHeader({chatId}: {chatId: string}) {
    const queryClient = useQueryClient()

    const handleDelete = async () => {
        const res = await deleteChatMessages(chatId)
        if (res) queryClient.refetchQueries({queryKey: ['get-chat-messages']})
    }

    const handleLogout = () => {
        document.cookie = `authToken=''; max-age=0; Secure`;
        redirect('/')
    }

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <a href="/">
                <div className="flex items-center space-x-2">
                    <FileJson className="w-6 h-6" />
                    <h1 className="text-2xl font-bold">JSON Genius</h1>
                </div>
            </a>

            <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" className='rounded-lg' onClick={() => handleDelete()}>
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar Chat
            </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm">
                <User className="w-4 h-4 mr-2" />
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </header>
    )
}

export default ChatHeader