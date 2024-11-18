import { useForm } from "react-hook-form"
import { Form } from "../components/ui/shadcn/form"
import { FileJson, UserPlus } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../components/ui/shadcn/Button"
import InputDefault from "../components/ui/inputs/InputDefault"
import { signupService } from "../services/login-service"
import { useNavigate } from "react-router-dom"

const signupSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    password: z.string().min(1, 'Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmationPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmationPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmationPassword'], // Highlight the `confirmationPassword` field on error
});

type TSignupFormData = z.infer<typeof signupSchema>

export default function Signup() {
    const navigate = useNavigate()
    
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmationPassword: '',
        }
    })

    const handleSubmit = async (data: TSignupFormData) => {
        try {
            const res = await signupService(data.name, data.email, data.password)

            if(res){
                navigate('/login')
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <a href="/" className="flex justify-center mb-8">
                    <FileJson className="w-12 h-12 text-primary" />
                </a>
                <h1 className="text-3xl font-bold text-center mb-6">Crie sua conta</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <InputDefault form={form} name='name' label='Nome:'/>
                        <InputDefault form={form} name='email' label='E-mail:' />
                        <InputDefault form={form} name='password' label='Senha:' type="password"  />
                        <InputDefault form={form} name='confirmationPassword' label='Confirme a senha:' type="password"  />
                        <Button type="submit" className="w-full">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Cadastrar
                        </Button>
                    </form>
                </Form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Já tem uma conta?{' '}
                        <a href="/login" className="text-primary hover:underline">
                            Faça login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}