import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid, userGrid } from '../data/dummy';
import { Header } from '../components';
import TextField from '@mui/material/TextField';
import axios from "../lib/axios"
import { useState } from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';



const Customers = () => {
  const [user, setUser] = useState([])
  const [users, setUsers] = useState([])
  const [point, setPoint] = useState([])
  const [userSearch, setUserSearch] = useState("")
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  const handleGetUser = async () => {
    try {
      const res = await axios.get("/users/all-user")
      setUsers(res.data)
      setUser(res.data)
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    handleGetUser()
  }, [])



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
    try {
      const res = await axios.post("/users/add-point", {
        id,
        point
      })
      handleGetUser()
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Trang Quản Lý" title="Khách hàng" />
      <TextField id="outlined-basic" label="Type name" variant="outlined" onChange={handleSearchUser} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Điểm</th>
            <th>Thêm điểm</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {user.map((u) => (
            <Row u={u} handleAddPoint={handleAddPoint} style={{ marginTop: 100 }} />
          ))}

        </tbody>
      </Table>
    </div>
  );
};

export default Customers;