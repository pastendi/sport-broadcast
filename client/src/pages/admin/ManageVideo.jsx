import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/appSlice'
import { useEffect } from 'react'
import { fetchVideosAction } from '../../redux/slices/videoSlice'
import { useState } from 'react'
const ManageVideos = () => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [filtered, setFiltered] = useState([])
  const [page, setPage] = useState(0)
  const [videosPerPage, setVideosPerPage] = useState(5)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const store = useSelector((store) => store.videos)
  const { videoList } = store
  useEffect(() => {
    dispatch(setCurrentPage('Videos'))
    dispatch(fetchVideosAction())
  }, [dispatch])
  useEffect(() => {
    if (videoList) {
      setFiltered([...videoList])
    }
  }, [videoList])
  useEffect(() => {
    setFiltered(
      videoList?.filter((video) =>
        video.title.toLowerCase().startsWith(searchText)
      )
    )
  }, [searchText])
  return (
    <div className='flex flex-col space-y-1'>
      <div className='flex justify-between items-center'>
        <div className='w-72'>
          <input
            name='searchText'
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='search'
            className='py-1 px-4  w-full rounded-md outline-none focus:border-sky-500  focus:border-[1px]'
          />
        </div>
        <div>
          <button className='btn bg-emerald-600'>Add video</button>
        </div>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Video
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                >
                  Views
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}
                >
                  Likes
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
              {filtered
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
                    <TableCell align='right'>{row.views}</TableCell>
                    <TableCell align='right'>{row.likes}</TableCell>
                    <TableCell align='right'>
                      <button className='btn btn-update'>View comments</button>
                      <button className='btn btn-update'>update</button>
                      <button className='btn btn-delete'>delete</button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component='div'
          rowsPerPageOptions={[5]}
          count={filtered?.length || 0}
          rowsPerPage={videosPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </div>
  )
}

export default ManageVideos
