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
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
          cumque quaerat sapiente dignissimos autem inventore, laboriosam eum
          labore temporibus perferendis cupiditate quas, qui illo iusto est quo
          nisi architecto nulla. Animi soluta earum accusamus deleniti eos
          fugiat saepe tempora quam at aliquid atque corporis, sed veniam esse a
          ut sint debitis, adipisci corrupti modi impedit voluptatem et ipsa
          odio! Ab fugiat labore provident saepe totam quia velit. Dolore quidem{' '}
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
