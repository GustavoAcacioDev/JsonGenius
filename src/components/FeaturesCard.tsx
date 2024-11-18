import { LucideIcon } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/shadcn/card'

export type TFeaturesCardProp = { 
    title: string, 
    description: string, 
    Icon: LucideIcon, 
    color: 'yellow' | 'green' | 'blue' | 'purple' | 'indigo' | 'red' 
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
                <Icon className={twMerge("w-8 h-8 mb-2", color && `text-${color}-500`)} />
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
            </CardContent>
        </Card>
    )
}
