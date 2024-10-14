import * as React from 'react'

import { cn } from '../../lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'ring-offset-background flex max-h-[48px] w-full flex-shrink-0 gap-2 rounded-lg border border-gray-400 p-4 text-sm leading-4 text-gray-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:border-[1px] focus:border-gray-800 focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
                    className,
                )}
                ref={ref}
                {...props}
            />
        )
    },
)
Input.displayName = 'Input'

export { Input }
