import Intro from '../../components/Intro'
import PopularVideo from '../../components/PopularVideo'
import Slider from '../../components/Slider'

const Home = () => {
  return (
    <main className='space-y-10'>
      <Slider />
      <Intro />
      <PopularVideo />
    </main>
  )
}

export default Home
