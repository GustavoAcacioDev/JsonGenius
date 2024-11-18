import { cn } from '../../../lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'


const buttonVariants = cva(
  'inline-flex items-center box-border justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-gray-800 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/80',
        action:
          'bg-positive-md text-white text-sm leading-sm font-bold hover:bg-positive-md-800 hover:outline hover:outline-gray-800 hover:outline-1 disabled:opacity-50',
        'action-negative':
          'bg-negativePure text-white text-sm leading-sm font-bold hover:bg-negativePure-800 hover:outline hover:outline-gray-800 hover:outline-1 disabled:opacity-50',
        destructive:
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        outline:
          'text-sm border leading-sm text-gray-800 font-bold border-gray-300 bg-white hover:bg-gray-200 hover:text-gray-900 hover:border-gray-800 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        outlineBlue:
          'border-2 border-blue bg-white text-blue hover:ease-in-out hover:duration-300 hover:bg-blue hover:bg-opacity-10 hover:text-blue',
        'outline-red':
          'border-2 border-negativePure bg-white text-negativePure hover:ease-in-out hover:duration-300 hover:bg-negativePure/10',
        fillBlue:
          'bg-blue text-white text-sm leading-sm font-bold hover:bg-blue-hover hover:outline hover:outline-gray-800 hover:outline-1 disabled:opacity-50',
        secondary:
          'bg-white text-slate-900 hover:bg-gray-300 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        ghost:
          'hover:bg-gray-300',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
      },
      size: {
        default: 'h-[40px] tablet:h-[48px] rounded-full px-7',
        sm: 'px-8 h-[40px] rounded-full',
        md: 'px-8 h-[48px] rounded-full',
        full: 'w-full h-[48px] rounded-full text-gray-800 font-bold max-h-[56px] text-lg leading-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
