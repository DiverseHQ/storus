import React from 'react'
import { useContext } from 'react'
import { StateContext } from '../utils/StateContext'

export default function Home() {
  const {filesToShow} = useContext(StateContext) 
  return (
    <>
    <div className='pt-8'>
      <div className='flex flex-row flex-wrap gap-4'>
        {filesToShow &&   filesToShow.map((file, index) => {
          return <div key={index} className='bg-p-bg rounded-md flex flex-col justify-center items-center'>
            <div className='bg-p-bg rounded-full flex justify-center items-center'>
              <img src={file.url} className='h-52' />
            </div>
            <div className='text-sm mt-2'>{file.name}</div>
            <div className='text-xs text-gray-400'>{file.size}</div>
            <button>Share</button>
            </div>
        })}
      </div>
      </div>      
      </>
  )
}
