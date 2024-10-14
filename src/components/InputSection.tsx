import { Button } from '../ui/shadcn/Button'
import { Input } from '../ui/shadcn/Input'
import React from 'react'

function InputSection() {
    return (
        <form className='w-full flex flex-col gap-2'>
            <h2 className='text-center text-xl font-semibold text-gray-800'>Como posso ajudar?</h2>
            <Input className='' placeholder='Digite sua pergunta' />
            <Button variant={'default'}>Perguntar</Button>
        </form>
    )
}

export default InputSection