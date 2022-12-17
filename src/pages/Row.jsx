import React, { useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { TableCell, tableCellClasses, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

const Row = ({ u, handleAddPoint }) => {
    const inputRef = useRef()
    const [point, setPoint] = useState(0)
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

    const handleClick = () => {
        console.log("value", inputRef.current.value)
    }

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="u">
                {u.name}
            </StyledTableCell>
            <StyledTableCell align="right">{u.email}</StyledTableCell>
            <StyledTableCell align="right">{u.point}</StyledTableCell>
            <StyledTableCell align="right" >
                <TextField inputRef={inputRef} id="outlined-basic" label="Điểm" variant="outlined" /> <Button variant="contained" onClick={() => handleAddPoint(u.id, inputRef.current.value)}>Thêm</Button>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default Row


