import MainBox from '../components/MainBox'
import PageContainer from '../components/PageContainer'
import React from 'react'
import { Button } from '../ui/shadcn/Button'
import { Textarea } from '../ui/shadcn/textarea'

function Validate() {
  return (
    <PageContainer>
      <section className="flex items-center min-h-screen">
        <MainBox size='lg'>
          <h1 className="text-center font-bold text-3xl text-gray-800">Validação de JSON</h1>

          <form className='w-full flex flex-col gap-2'>
            <h2 className='text-xl font-semibold text-gray-800'>Informe o JSON a ser validado</h2>
            <Textarea className='' />
            <Button variant={'default'}>Validar</Button>
          </form>
        </MainBox>
      </section>
    </PageContainer>
  )
}

export default Validate