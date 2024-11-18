'use client'

import { Form } from '../components/ui/shadcn/form'
import InputDefault from '../components/ui/inputs/InputDefault'
import { Button } from '../components/ui/shadcn/Button'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { loginService } from '../services/login-service'
import { isAuthenticated } from '../Router/PrivateRoute'
import { Navigate, redirect } from 'react-router-dom'
import { FileJson, LogIn } from 'lucide-react'

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

        if (res.success) {
            redirect('/chat ')
        }
    }

    return isAuthenticated() ? <Navigate to="/chat" /> : (
        <main className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <a href="/" className="flex justify-center mb-8">
                    <FileJson className="w-12 h-12 text-primary" />
                </a>
                <h1 className="text-3xl font-bold text-center mb-6">JSON Problem Solver</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <InputDefault form={form} name='email' label='E-mail:' />
                        <InputDefault form={form} name='password' label='Senha:' />
                        <Button type="submit" className="w-full">
                            <LogIn className="w-4 h-4 mr-2" />
                            Entrar
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Não tem uma conta?{' '}
                        <a href="/signup" className="text-primary hover:underline">
                            Cadastre-se
                        </a>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login