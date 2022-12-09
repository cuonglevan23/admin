import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Link } from "react-router-dom";
import { productData, contextMenuItems, productGrid } from '../data/dummy';
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

function createData(name, id) {
    return { name, id };
}

const Categories = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const handleGetAllProduct = async () => {
        try {
            const res = await axios.get("/categories/get-all")
            setProducts(res.data.categories)
        } catch (error) {
            console.log(error)
        }
    }
    const rows = products?.map((product) => (
        createData(product.name, product._id)
    ))

    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`/categories/${id}`)
            notifySuccess("Xóa danh mục thành công!")
            handleGetAllProduct()
        } catch (error) {
            notifyError("Xóa danh mục thất bại")
        }
    }

    useEffect(() => {
        handleGetAllProduct()   
    }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <ToastContainer />
            <Header category="Trang Quản Lý" title="Sản Phẩm" />
            <Link to="/NewCategory">
                <button className="productAddButton">Thêm</button>
            </Link>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tên</StyledTableCell>
                            <StyledTableCell align="right">Hành động</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>

                                <StyledTableCell align="right" ><CreateIcon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate(`/EditProduct/${row.id}`)} /> <ClearIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteProduct(row.id)} /></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Categories;