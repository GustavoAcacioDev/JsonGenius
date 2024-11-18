import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { ChevronDown, FileJson } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/shadcn/Button'

function Header() {
    return (
        <header className="flex items-center justify-between p-6 bg-gray-800 text-white">
        <div className="flex items-center space-x-2">
          <FileJson className="w-8 h-8" />
          <h1 className="text-lg tablet:text-3xl font-bold">JSON Genius</h1>
        </div>
        <nav>
          <ul className="h-fit flex space-x-4 text-sm leading-sm font-semibold tablet:text-base">
            <li className='h-fit'><a href="/login" className="h-fit hover:underline">Login</a></li>
          </ul>
        </nav>
      </header>
    )
}

export default Header