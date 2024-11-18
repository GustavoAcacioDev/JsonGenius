'use client'
import React, { HTMLAttributes } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../shadcn/form'
import { Input } from '../shadcn/Input'

const InputDefault = <TFieldValues extends FieldValues = FieldValues>({
  name,
  placeholder = 'Digite aqui',
  form,
  type = 'text',
  className,
  disabled,
  required,
  inputMode,
  label,
  onChange,
}: {
  name: Path<TFieldValues>
  placeholder?: string
  type?: React.HTMLInputTypeAttribute | undefined
  form: UseFormReturn<TFieldValues>
  label?: string
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  className?: string
  disabled?: boolean
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => string
}) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className={twMerge('relative w-full', className)}>
          {label && (
            <div className="flex w-full items-center justify-between">
              <FormLabel>{label}</FormLabel>
            </div>
          )}
          <FormControl>
            <Input
              {...field}
              required={required}
              type={type}
              placeholder={placeholder}
              inputMode={inputMode}
              disabled={disabled}
              onChange={
                onChange ? (e) => field.onChange(onChange(e)) : field.onChange
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputDefault
