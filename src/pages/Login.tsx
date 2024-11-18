'use client'

import { Form } from '../components/ui/shadcn/form'
import InputDefault from '../components/ui/inputs/InputDefault'
import { Button } from '../components/ui/shadcn/Button'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import loginService from '../services/login-service'
import { isAuthenticated } from '../Router/PrivateRoute'
import { Navigate } from 'react-router-dom'

const loginSchema = z.object({
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    password: z.string().min(1, 'Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type TLoginFormData = z.infer<typeof loginSchema>

function Login() {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: TLoginFormData) => {
        const res = await loginService(data.email, data.password)

        if(res.success){
            alert('login done')
        }
    }

    return isAuthenticated() ? <Navigate to="/chat" /> : (
        <main className='min-h-screen w-full flex justify-center items-center'>
            <Form {...form}>
                <form className='max-w-[455px] w-full p-6 border rounded-lg border-gray-300 flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                    <h1 className='font-bold text-2xl leading-2xl text-gray-800'>Login JSON Genius</h1>
                    <InputDefault form={form} name='email' label='E-mail:' />
                    <InputDefault form={form} name='password' label='Senha:' />
                    <Button>Login</Button>
                </form>
            </Form>
        </main>
    )
}

export default Login