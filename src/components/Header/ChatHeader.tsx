import { Button } from '../../ui/shadcn/button'
import { FileJson, Trash2 } from 'lucide-react'
import React from 'react'

function ChatHeader() {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <a href="/">
                <div className="flex items-center space-x-2">
                    <FileJson className="w-6 h-6" />
                    <h1 className="text-2xl font-bold">JSON Genius</h1>
                </div>
            </a>
            <Button variant="secondary" size="sm" className='rounded-lg'>
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar Chat
            </Button>
        </header>
    )
}

export default ChatHeader