import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VideoList from '../../components/VideoList'
import {
  fetchVideosAction,
  filterVideos,
  showLatest,
  showPopular,
} from '../../redux/slices/videoSlice'
import { MenuItem, Select } from '@mui/material'
import { fetchSportCategory } from '../../redux/slices/sportSlice'

const Videos = () => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [sport, setSport] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const { filteredList, loading, appErr } = useSelector(
    (state) => state?.videos
  )
  const { sports } = useSelector((store) => store.sports)
  const MenuProps = {
    PaperProps: {
      style: {
        width: 100,
        maxHeight: 200,
      },
    },
  }
  const changeSport = (e) => {
    setSearchText('')
    setSport(e.target.value)
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch(fetchVideosAction())
    dispatch(fetchSportCategory())
  }, [dispatch])
  useEffect(() => {
    dispatch(filterVideos({ text: searchText, sport }))
  }, [searchText, sport, dispatch])
  if (loading) return <h1>loading...</h1>
  return (
    <main>
      <div className='flex justify-between items-center py-10'>
        <div className='w-full flex flex-col lg:flex-row gap-4 justify-between'>
          <div className='w-full lg:w-96'>
            <input
              name='searchText'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder='search'
              className='py-2 px-4  w-full text-lg rounded-md outline-none focus:border-sky-500  focus:border-[1px]'
            />
          </div>
          <div className='flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:gap-8 '>
            <div className='flex space-x-2  items-center'>
              <p className='text-sm sm:text-base lg:text-lg font-semibold'>
                Sport
              </p>
              <Select
                sx={{ width: 150, maxHeight: 100 }}
                size='small'
                name='sport'
                value={sport}
                required
                onChange={changeSport}
                MenuProps={MenuProps}
              >
                <MenuItem value={'all'}>All</MenuItem>
                {sports?.map((sport, index) => (
                  <MenuItem key={index} value={sport._id}>
                    {sport.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className='flex items-center space-x-2'>
              <p className='text-sm sm:text-base lg:text-lg font-semibold'>
                Sort by
              </p>
              <Select
                sx={{ width: 150, maxHeight: 100 }}
                size='small'
                name='sortBy'
                value={sortBy}
                required
                onChange={(e) => setSortBy(e.target.value)}
                MenuProps={MenuProps}
              >
                <MenuItem
                  value={'latest'}
                  onClick={() => dispatch(showLatest())}
                >
                  Latest
                </MenuItem>
                <MenuItem
                  value={'popularity'}
                  onClick={() => dispatch(showPopular())}
                >
                  Popularity
                </MenuItem>
              </Select>
            </div>
          </div>
        </div>
      </div>
      {filteredList.length === 0 ? (
        <h1 className='text-4xl font-semibold text-center'>
          Sorry but nothing to show for you search.
        </h1>
      ) : (
        <VideoList list={filteredList} />
      )}
    </main>
  )
}

export default Videos
