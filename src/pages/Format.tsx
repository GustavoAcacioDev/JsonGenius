import MainBox from '../components/MainBox'
import PageContainer from '../components/PageContainer'
import React from 'react'
import { Button } from '../ui/shadcn/Button'
import { Textarea } from '../ui/shadcn/textarea'

function Format() {
  return (
    <PageContainer>
      <section className="flex items-center min-h-screen">
        <MainBox size='lg'>
          <h1 className="text-center font-bold text-3xl text-gray-800">Formatação de JSON</h1>

          <form className='w-full flex flex-col gap-2'>
            <h2 className='text-xl font-semibold text-gray-800'>Informe o JSON a ser formatado</h2>
            <Textarea className='' />
            <Button variant={'default'}>Formatar</Button>
          </form>
        </MainBox>
      </section>
    </PageContainer>
  )
}

export default Format