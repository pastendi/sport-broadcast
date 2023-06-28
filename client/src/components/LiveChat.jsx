import React, { useState } from 'react'

const LiveChat = ({ id }) => {
  const [chat, setChat] = useState('')
  return (
    <div className='w-full rounded-lg p-4 h-[25rem] lg:h-[30rem] pb-24 bg-slate-300 relative'>
      <h1 className='text-xl sm:text-2xl font-semibold mb-2 '>Live chats</h1>
      <div className='w-full h-full  bg-slate-200'>Live chat</div>
      <form className='flex p-4 w-full absolute bottom-0 left-0'>
        <input
          type='text'
          value={chat}
          placeholder='what you think...'
          onChange={(e) => setChat(e.target.value)}
          className='flex-1 px-3 py-1 w-full bg-none outline-none rounded-md'
        />
        <button
          className='px-3 py-1 bg-sky-500 btn  hover:bg-opacity-100'
          type='submit'
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default LiveChat
