import { useNavigate } from 'react-router-dom'
const Intro = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col-reverse md:flex-row gap-4 py-6 '>
      <div className='flex-1 h-80'>
        <img
          src='https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg):focal(621x415:623x413)/origin-imgresizer.eurosport.com/2017/10/31/2200309-45925490-2560-1440.jpg'
          alt='intro'
        />
      </div>
      <div className='flex-1 space-y-4'>
        <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl'>
          Olympic games
        </h1>
        <p className='text-justify  lg:text-lg'>
          The Olympic Games, the world's most prestigious and celebrated
          sporting event, capture the hearts and minds of people across the
          globe. Held every four years, this extraordinary event brings together
          athletes from all corners of the world to showcase their incredible
          talents and dedication to the pursuit of excellence. Join us as we
          embark on a journey to explore the magic and inspiration of the
          Olympic Games. The Olympic Games have a rich and storied history that
          dates back over two millennia. Originating in ancient Greece, the{' '}
          <span
            className='text-sky-600 cursor-pointer'
            onClick={() => navigate('/about')}
          >
            Read more...
          </span>
        </p>
      </div>
    </div>
  )
}

export default Intro
