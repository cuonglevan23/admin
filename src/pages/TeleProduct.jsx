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

function createData(image, price, id,) {
    return { image, price, id, };
}

const TeleProduct = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const handleGetAllProduct = async () => {
        const res = await axios.get("/tele-product/get-all")
        console.log(res.data.teles)
        setProducts(res.data.teles)
    }
    const rows = products.map((product) => (
        createData(<img src={product.image} style={{ width: 70, height: 70, marginLeft: 'auto' }} />, product.price, product._id,)
    ))

    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    const handleDeleteProduct = async (id) => {

        try {
            await axios.delete(`/products/${id}`)
            notifySuccess("X??a s???n ph???m th??nh c??ng!")
            handleGetAllProduct()
        } catch (error) {
            notifyError("X??a s???n ph???m th???t b???i")
        }
    }


    useEffect(() => {
        handleGetAllProduct()

    }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <ToastContainer />
            <Header category="Trang Qu???n L??" title="S???n Ph???m" />
            <Link to="/NewTeleProduct">
                <button className="productAddButton">Th??m</button>
            </Link>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>

                            <StyledTableCell align="right">H??nh ???nh</StyledTableCell>
                            <StyledTableCell align="right">Gi??</StyledTableCell>
                            <StyledTableCell align="right">H??nh ?????ng</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>

                                <StyledTableCell align="right">{row.image}</StyledTableCell>
                                <StyledTableCell align="right" >{row.price} </StyledTableCell>
                                <StyledTableCell align="right" ><CreateIcon style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate(`/EditTeleProduct/${row.id}`)} /> <ClearIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteProduct(row.id)} /></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TeleProduct;