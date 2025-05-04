import React from 'react'

const Welcome = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to the App!</h1>
      <p className='text-lg text-gray-700 mb-8'>This is a simple welcome page.</p>
      <p>
        To test my app, please click
        <a
          href="/auth"
          className='text-underline text-blue-500 hover:text-blue-700 ml-1'
        >
          &nbsp;here
        </a>
      </p>
    </div>
  )
}

export default Welcome;
