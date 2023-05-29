import { AiOutlineClose } from 'react-icons/ai'
const ModalLayout = ({ title, body, close }) => {
  return (
    <div className='z-50 fixed inset-0 flex items-center justify-center  bg-neutral-700 bg-opacity-60'>
      {/* model */}
      <div className='px-10 py-10 h-auto w-full sm:w-4/5 md:w-[60%] max-w-2xl border-0 rounded-lg shadow-lg flex flex-col  bg-[#e5e7eb] outline-none focus:outline-none space-y-4'>
        {/* header */}
        <div className='flex justify-between items-center '>
          <h3 className='text-black text-xl md:text-3xl capitalize font-bold'>
            {title}
          </h3>
          <button
            className='border-0 hover:text-red-600 text-red-500 text-2xl sm:text-3xl '
            onClick={close}
          >
            <AiOutlineClose />
          </button>
        </div>
        {/* body */}
        <div className='flex-auto'>{body}</div>
      </div>
    </div>
  )
}

export default ModalLayout
