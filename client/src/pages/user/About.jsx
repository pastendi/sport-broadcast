import { ImQuotesLeft } from 'react-icons/im'
import { ourGroups } from '../../constants'
import { useEffect } from 'react'
const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return (
    <main>
      <h1 className='title mt-10'>Olympic Games</h1>
      <div>
        <img
          src='https://img.olympicchannel.com/images/image/private/t_13-5_1560-600/f_auto/v1643714847/primary/ihys9yfdeqs9yexatayp'
          alt=''
        />
      </div>
      <p className='text-justify my-6 text-sm sm:text-base md:text-xl'>
        The Olympic Games, the world's most prestigious and celebrated sporting
        event, capture the hearts and minds of people across the globe. Held
        every four years, this extraordinary event brings together athletes from
        all corners of the world to showcase their incredible talents and
        dedication to the pursuit of excellence. Join us as we embark on a
        journey to explore the magic and inspiration of the Olympic Games.
        <br />
        The Olympic Games have a rich and storied history that dates back over
        two millennia. Originating in ancient Greece, the Games were held in
        honor of the gods and aimed to promote physical fitness, competition,
        and unity among the city-states. With the passage of time, the Olympic
        Games evolved into a global spectacle, transcending borders and
        cultures.
        <br />
        Get ready to be captivated by the spirit of the Olympic Games. Together,
        let's celebrate the triumphs, share the joy, and be inspired by the
        extraordinary achievements that unfold on this global stage. Welcome to
        the world of the Olympic Games!
      </p>
      <h1 className='title'>FunOlympic</h1>
      <p className='text-justify my-6 text-sm sm:text-base md:text-xl'>
        Welcome to FunOlympic, the premier web application that brings you the
        thrill and excitement of the Olympic Games right at your fingertips.
        With our cutting-edge broadcasting platform, we offer live streaming of
        the Games, allowing you to witness every exhilarating moment as it
        happens. Additionally, our curated collection of highlights ensures that
        you never miss out on the most remarkable performances and breathtaking
        displays of athleticism. Our main aim is to provide entertainment to
        people across the globe, transcending borders and uniting fans in their
        shared love for the Olympics. Join us on FunOlympic and immerse yourself
        in the global celebration of sports and inspiration.
      </p>
      <h1 className='title'>Our teams</h1>
      <div className='relative flex flex-col mt-10 lg:mt-20 w-full space-y-6 lg:flex-row lg:space-y-0 lg:space-x-12'>
        <div className='absolute left-1 -top-8 w-10 lg:-top-16 lg:w-20'>
          <ImQuotesLeft className='text-3xl lg:text-6xl ' />
        </div>
        {ourGroups.map((x, index) => {
          const { image, text, name, post } = x
          return (
            <div
              className='flex flex-col p-10 space-y-6 rounded-lg bg-gray-300 lg:w-1/3'
              key={index}
            >
              <p className='text-sm leading-5 lg:text-lg'>{text}</p>
              <div className='flex space-x-4'>
                <img src={image} alt='' className='w-20 h-20 rounded-full' />
                <div className='flex flex-col items-start justify-center'>
                  <h5 className='text-sm font-semibold'>{name}</h5>
                  <p className='text-xs font-extralight'>{post}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default About
