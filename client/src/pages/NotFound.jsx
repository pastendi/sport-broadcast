import { Link } from 'react-router-dom'
import img from '../assets/not-found.svg'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-10 space-y-4'>
      <img src={img} alt='not found' className='w-full max-w-xl block mb-8' />
      <h3>Ohh! page not found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to='/'>
        <button className='bg-sky-400 text-white px-6 py-2 rounded-lg text-lg'>
          Back home
        </button>
      </Link>
    </div>
  )
}

export default NotFound
