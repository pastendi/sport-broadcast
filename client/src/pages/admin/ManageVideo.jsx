import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentPage,
  setShowAddVideoModal,
  setShowEditVideoModal,
  setShowDeleteVideoModal,
} from '../../redux/slices/appSlice'
import { useEffect } from 'react'
import {
  fetchVideosAction,
  filterVideos,
  sortByLengthOf,
  sortByView,
  sortByDate,
} from '../../redux/slices/videoSlice'
import { useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import AddVideoModal from '../../components/AddVideoModal'
import EditVideoModal from '../../components/EditVideoModal'
import { fetchSportCategory } from '../../redux/slices/sportSlice'
import DeleteVideoModal from '../../components/DeleteVideoModal'
import { MenuItem, Select } from '@mui/material'

const ManageVideos = () => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [sport, setSport] = useState('all')
  const [page, setPage] = useState(0)
  const [videosPerPage, setVideosPerPage] = useState(10)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const videoStore = useSelector((store) => store.videos)
  const { filteredList } = videoStore
  const appStore = useSelector((store) => store.app)
  const { showAddVideoModal, showEditVideoModal, showDeleteVideoModal } =
    appStore
  const sportData = useSelector((store) => store.sports)
  const { sports } = sportData
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
  }, [page])
  useEffect(() => {
    dispatch(setCurrentPage('Videos'))
    dispatch(fetchVideosAction())
    dispatch(fetchSportCategory())
  }, [dispatch])
  useEffect(() => {
    dispatch(filterVideos({ text: searchText, sport }))
  }, [searchText, sport, dispatch])
  if (!filteredList) return <h1>Nothing to show</h1>
  return (
    <>
      {showAddVideoModal && <AddVideoModal />}
      {showEditVideoModal && <EditVideoModal />}
      {showDeleteVideoModal && <DeleteVideoModal />}
      <div className='flex flex-col space-y-2'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2'>
            <div className='w-72'>
              <input
                name='searchText'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder='search'
                className='py-2 px-4  w-full text-lg rounded-md outline-none focus:border-sky-500  focus:border-[1px]'
              />
            </div>
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
          <div>
            <button
              className='btn bg-emerald-600 hover:bg-emerald-500'
              onClick={() => dispatch(setShowAddVideoModal(true))}
            >
              Add video
            </button>
          </div>
        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size='small'
              aria-label='a dense table'
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                    Video
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                    onClick={() => dispatch(sortByDate())}
                  >
                    Age
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                    onClick={() => dispatch(sortByView())}
                  >
                    Views
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                    onClick={() => dispatch(sortByLengthOf('likes'))}
                  >
                    Likes
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                    onClick={() => dispatch(sortByLengthOf('dislikes'))}
                  >
                    Dislikes
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                    onClick={() => dispatch(sortByLengthOf('comments'))}
                  >
                    Comments
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredList
                  ?.slice(
                    page * videosPerPage,
                    page * videosPerPage + videosPerPage
                  )
                  .map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      className='hover:bg-slate-300 overflow-hidden'
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        style={{ width: '30%' }}
                      >
                        <div className='flex space-x-2 w-full'>
                          <div className='w-36 h-20 relative'>
                            <img src={row.thumbnail} alt='video thumbnail' />
                            {row.live && (
                              <p className='absolute bottom-1 flex right-1 px-2 py-0 text-lg  text-white rounded-md bg-red-500'>
                                Live
                              </p>
                            )}
                          </div>
                          <div className='flex-1'>{row.title}</div>
                        </div>
                      </TableCell>
                      <TableCell align='right' style={{ width: '10%' }}>
                        {formatDistanceToNowStrict(new Date(row.createdAt))}
                      </TableCell>
                      <TableCell align='right' style={{ width: '10%' }}>
                        {row.views}
                      </TableCell>
                      <TableCell align='right' style={{ width: '10%' }}>
                        {row.likes?.length || 0}
                      </TableCell>
                      <TableCell align='right' style={{ width: '10%' }}>
                        {row.dislikes?.length || 0}
                      </TableCell>
                      <TableCell
                        align='right'
                        style={{ width: '10%' }}
                        className='flex flex-col space-y-1'
                      >
                        <p className='text-right'>
                          {row.comments?.length || 0}
                        </p>
                        <button className='btn  bg-orange-600 hover:bg-orange-500 block float-right'>
                          Show
                        </button>
                      </TableCell>
                      <TableCell
                        align='right'
                        className='w-full flex flex-col  space-y-2'
                        style={{ width: '10%' }}
                      >
                        <button
                          className='btn bg-sky-600 hover:bg-sky-500 block float-right'
                          onClick={() =>
                            dispatch(
                              setShowEditVideoModal({ video: row, show: true })
                            )
                          }
                        >
                          update
                        </button>
                        <button
                          className='btn bg-red-600 hover:bg-red-500 block float-right'
                          onClick={() =>
                            dispatch(
                              setShowDeleteVideoModal({
                                video: row,
                                show: true,
                              })
                            )
                          }
                        >
                          delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component='div'
            rowsPerPageOptions={[5]}
            count={filteredList?.length || 0}
            rowsPerPage={videosPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Paper>
      </div>
    </>
  )
}

export default ManageVideos
