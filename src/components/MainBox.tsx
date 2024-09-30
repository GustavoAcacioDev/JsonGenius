import React from 'react'

interface IMainBoxProps {
    children: React.ReactNode
}

function MainBox({children}: IMainBoxProps) {
  return (
    <div className='w-100 m-auto bg-white p-4 rounded' style={{maxWidth: '700px'}}>{children}</div>
  )
}

export default MainBox