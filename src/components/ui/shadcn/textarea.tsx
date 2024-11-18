import * as React from 'react'

import { cn } from '../../lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-gray-400 p-4 text-sm leading-5 text-gray-800 ring-offset-white placeholder:text-gray-500 focus:border-[1px] focus:border-gray-800 focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
