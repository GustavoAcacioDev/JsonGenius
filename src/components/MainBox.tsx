import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IMainBoxProps {
  children: React.ReactNode
  size?: 'lg'
  className?: string
}

function MainBox({ children, className, size }: IMainBoxProps) {
  return (
    <div className={twMerge('max-w-[700px] mx-auto bg-white p-6 rounded max-h-[700px] h-fit flex flex-col gap-4', size === "lg" && 'w-[700px]', className)}>{children}</div>
  )
}

export default MainBox