import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/appSlice'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import { getAllMessages } from '../../redux/slices/messageSlice'

const Messages = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  const { messages } = useSelector((store) => store?.messages)
  useEffect(() => {
    dispatch(getAllMessages())
    dispatch(setCurrentPage('Messages'))
  }, [dispatch])
  if (!messages) return <h1>Loading</h1>
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TablePagination
          rowsPerPageOptions={[10]}
          component='div'
          count={messages?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
                  Message
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component='th'
                      scope='row'
                      style={{ width: '20%' }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell style={{ width: '25%' }}>
                      {row.subject}
                    </TableCell>
                    <TableCell style={{ width: '55%' }}>
                      {row.message}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component='div'
          count={messages?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default Messages
