import { LucideIcon } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/shadcn/card'

export type TFeaturesCardProp = { 
    title: string, 
    description: string, 
    Icon: LucideIcon, 
    color: 'text-yellow-500' | 'text-green-500' | 'text-blue-500' | 'text-purple-500' | 'text-indigo-500' | 'text-red-500' 
}

export default function FeaturesCard({ 
    title, 
    description, 
    Icon, 
    color 
}: TFeaturesCardProp) {
    return (
        <Card>
            <CardHeader>
                <Icon className={twMerge("w-8 h-8 mb-2", color)} />
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    )
}
