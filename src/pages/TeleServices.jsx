import React from 'react';
import { Link } from "react-router-dom";
import { Header } from '../components';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../lib/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, image, description, ratio, id,) {
    return { name, image, description, ratio, id, };
}

const TeleServices = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const handleGetAllProduct = async () => {
        const res = await axios.get("/tele-services/get-all")
        console.log(res.data.teles)
        setProducts(res.data.teles)
    }
    const rows = products.map((product) => (
        createData(product.name, <img src={product.icon} style={{ width: 70, height: 70, marginLeft: 'auto' }} />, product.description, product.ratio, product._id,)
    ))

    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    const handleDeleteProduct = async (id) => {

        try {
            await axios.delete(`/tele-services/${id}`)
            notifySuccess("Xóa sản phẩm thành công!")
            handleGetAllProduct()
        } catch (error) {
            notifyError("Xóa sản phẩm thất bại")
        }
    }


    useEffect(() => {
        handleGetAllProduct()

    }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <ToastContainer />
            <Header category="Trang Quản Lý" title="Sản Phẩm" />
            <Link to="/NewTeleServices">
                <button className="productAddButton">Thêm</button>
            </Link>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tên</StyledTableCell>
                            <StyledTableCell align="right">Hình ảnh</StyledTableCell>
                            <StyledTableCell align="right">Chi tiết</StyledTableCell>
                            <StyledTableCell align="right">Tỉ lệ</StyledTableCell>
                            <StyledTableCell align="right">Hành động</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.image}</StyledTableCell>
                                <StyledTableCell align="right" >{row.description}</StyledTableCell>
                                <StyledTableCell align="right" >{row.ratio} </StyledTableCell>
                                <StyledTableCell align="right" ><CreateIcon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate(`/EditTeleServices/${row.id}`)} /> <ClearIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteProduct(row.id)} /></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TeleServices;