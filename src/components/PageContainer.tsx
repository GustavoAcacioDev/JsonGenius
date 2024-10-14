import React from 'react'
import Header from './Header'

function PageContainer({children}: {children: React.ReactElement}) {
  return (
    <main className='min-h-screen w-full grid grid-cols-1 grid-rows-auto-1fr bg-gray-800'>
      <Header />

      {children}
    </main>
  )
}

export default PageContainer