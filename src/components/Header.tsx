import { ChevronDown } from 'lucide-react'
import { Button } from '../ui/shadcn/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/shadcn/DropdownMenu'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className='absolute w-full h-10 flex justify-end items-center px-10 py-10 text-gray-300'>
            <Link to='/' className='text-sm font-medium header-item'>Home</Link>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button asChild variant={'ghost'} className='cursor-pointer transition-all duration-200 ease-in [&[data-state=open]>svg]:rotate-180'>
                        <div className='flex gap-2'>
                            <span>Ferramentas</span>
                            <ChevronDown />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit p-4 shadow-none flex flex-col gap-3 text-gray-200">
                    <Link to="/format" className='header-item'>Formatação de JSON</Link>
                    <Link to="/validate" className='header-item'>Validação de JSON</Link>
                    <Link to="/minify" className='header-item'>Minificação de JSON</Link>

                    {/* IDEIAS A SEREM IMPLEMENTADAS */}
                    {/* <Link to="/format" className='header-item'>Preenchimento Automático (Populate)</Link>
                    <Link to="/format" className='header-item'>Extração de Tipos</Link>
                    <Link to="/format" className='header-item'>Conversão entre Formatos</Link>
                    <Link to="/format" className='header-item'>Diferença entre JSONs</Link>
                    <Link to="/format" className='header-item'>Merge de JSONs</Link>
                    <Link to="/format" className='header-item'>Reformatação de Chaves</Link>
                    <Link to="/format" className='header-item'>Validação de Esquema</Link>
                    <Link to="/format" className='header-item'>Geração de Mock APIs</Link> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}

export default Header