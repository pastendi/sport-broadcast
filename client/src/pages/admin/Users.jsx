import React, { useEffect, useState } from 'react'
import { FaRegDotCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentPage,
  setShowBlockConfirmationModal,
} from '../../redux/slices/appSlice'
import {
  fetchUsers,
  blockUnblock,
  filterUsers,
} from '../../redux/slices/userSlice'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'

const Users = () => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  const userData = useSelector((store) => store?.users)
  const { filteredUsers } = userData
  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(setCurrentPage('Users'))
  }, [dispatch])
  //
  useEffect(() => {
    dispatch(filterUsers(searchText))
  }, [searchText, dispatch])
  return (
    <>
      <div className='flex w-full  justify-between mb-8'>
        <div></div>
        <div className='w-96 flex'>
          <input
            name='searchText'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='search by name or email'
            className='py-2 px-4 w-full rounded-md outline-none focus:border-sky-500  focus:border-2'
          />
          <button className='bg-blue-400 rounded-md text-xl py-2 px-4 font-bold'>
            Search
          </button>
        </div>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  User
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Active
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Status
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
              {filteredUsers
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component='th'
                      scope='row'
                      style={{ width: '25%' }}
                    >
                      {row.firstName + ' ' + row.lastName}
                    </TableCell>
                    <TableCell style={{ width: '35%' }}>{row.email}</TableCell>
                    <TableCell style={{ width: '20%' }}>
                      <p
                        className={`text-xl  pl-6 ${
                          row.isActive ? 'text-emerald-500' : 'text-red-500'
                        }`}
                      >
                        <FaRegDotCircle />
                      </p>
                    </TableCell>
                    <TableCell style={{ width: '10%' }}>
                      {row.isBlocked ? 'Blocked' : 'Member'}
                    </TableCell>
                    <TableCell align='right' style={{ width: '10%' }}>
                      {row.isBlocked ? (
                        <button
                          className='btn bg-green-500'
                          onClick={() =>
                            dispatch(
                              setShowBlockConfirmationModal({
                                user: row,
                                show: true,
                              })
                            )
                          }
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className='btn bg-red-500'
                          onClick={() =>
                            dispatch(
                              setShowBlockConfirmationModal({
                                user: row,
                                show: true,
                              })
                            )
                          }
                        >
                          Block
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component='div'
          count={filteredUsers?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default Users
