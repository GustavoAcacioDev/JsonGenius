import { ChevronDown, FileJson } from 'lucide-react'
import { Button } from '../../ui/shadcn/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/shadcn/dropdown-menu';
import React from 'react'

function Header() {
    return (
        <header className="flex items-center justify-between p-6 bg-gray-800 text-white">
        <div className="flex items-center space-x-2">
          <FileJson className="w-8 h-8" />
          <h1 className="text-lg tablet:text-3xl font-bold">JSON Genius</h1>
        </div>
        <nav>
          <ul className="h-fit flex space-x-4 text-sm leading-sm font-semibold tablet:text-base">
            <li className='h-fit'><a href="/docs" className="h-fit hover:underline">Docs</a></li>
            <li className='h-fit'><a href="/contact" className="hover:underline">Contato</a></li>
            <li className='h-fit'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" className='text-white p-0 h-fit text-sm leading-sm tablet:h-fit tablet:text-base'>
                    Funções <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <a href="/validar">Validar</a>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <a href="/formatar">Formatar</a>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <a href="/minificar">Minificar</a>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <a href="/transformar">Transformar</a>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <a href="/analisar">Analisar</a>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <a href="/comparar">Comparar</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </header>
    )
}

export default Header