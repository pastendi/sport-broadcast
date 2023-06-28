import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { baseUrl } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { addChat, getChats } from '../redux/slices/chatSlice'
let socket = io.connect(baseUrl)
const LiveChat = ({ id }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const messagesRef = useRef(null)

  const { chats } = useSelector((store) => store.chats)

  const sendMessage = async (e) => {
    e.preventDefault()
    dispatch(addChat({ message, video: id }))
    socket.emit('newChat', message)
    setMessage('')
  }
  useEffect(() => {
    scrollToBottom()
  }, [chats])

  const scrollToBottom = () => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }
  useEffect(() => {
    dispatch(getChats(id))
  }, [dispatch, id])
  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(getChats(id))
    })
  })
  return (
    <div className='w-full rounded-lg p-4 h-[25rem] lg:h-[30rem] pb-24 bg-slate-300 relative'>
      <h1 className='text-xl sm:text-2xl font-semibold mb-2 '>Live chats</h1>
      <div
        className='w-full h-full space-y-3 overflow-y-scroll'
        ref={messagesRef}
      >
        {chats.map((x, index) => {
          return (
            <div key={index}>
              <p className='text-sm text-blue-600 font-semibold underline'>
                {x.user.email}
              </p>
              <p className='text-xs'>{x.message}</p>
            </div>
          )
        })}
      </div>
      <form className='flex p-4 w-full absolute bottom-0 left-0'>
        <input
          type='text'
          value={message}
          required
          placeholder='what you think...'
          onChange={(e) => setMessage(e.target.value)}
          className='flex-1 px-3 py-1 w-full bg-none outline-none rounded-md'
        />
        <button
          className='px-3 py-1 bg-sky-500 btn  hover:bg-opacity-100'
          type='submit'
          onClick={sendMessage}
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default LiveChat
