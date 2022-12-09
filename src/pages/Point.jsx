import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import axios from '../lib/axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import Row from './Row';
import "react-toastify/dist/ReactToastify.css";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


function createData(name, email, point, id) {
  return { name, email, point, id, };
}


const Point = () => {
  const [user, setUser] = useState([])
  const [users, setUsers] = useState([])
  const [point, setPoint] = useState([])
  const handleGetUser = async () => {
    try {
      const res = await axios.get("/users/all-user")
      setUsers(res.data)
      setUser(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const rows = user.map((u) => (
    createData(`${u.firstName} ${u.lastName}`, u.email, u.point, u._id)
  ))


  useEffect(() => {
    handleGetUser()
  }, [])

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const handleSearchUser = (e) => {
    let hi = []
    if (e.target.value === "") {
      hi = []
      return setUser(users)
    }

    users.map((u, i) => {
      if (`${u.firstName} ${u.lastName}`.includes(e.target.value)) {
        hi.push(u)
        setUser(hi)
      }

    })
  }

  const handleAddPoint = async (id, point) => {
    console.log(id, point)
    try {
      const res = await axios.post("/users/add-point", {
        id,
        point
      })
      notifySuccess("Thêm điểm thành công!")
      handleGetUser()
    } catch (error) {
      console.log(error)
      notifyError("Thêm điểm thất bại")
    }

  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <ToastContainer />
      <Header category="Trang Quản Lý" title="Điểm" />
      <TextField id="outlined-basic" label="Type name" variant="outlined" onChange={handleSearchUser} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Tên</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Điểm</StyledTableCell>
              <StyledTableCell align="right">Thêm điểm</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Row key={index} u={row} handleAddPoint={handleAddPoint} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Point;