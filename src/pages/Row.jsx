import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const Row = ({ u, handleAddPoint }) => {
    const [point, setPoint] = useState(0)
    return (
        <tr>
            <td style={{ textAlign: "center" }}>{u.firstName} {u.lastName}</td>
            <td style={{ textAlign: "center" }}>{u.email}</td>
            <td style={{ textAlign: "center" }}>{u.point}</td>
            <td style={{ textAlign: "center" }}> <TextField id="outlined-basic" label="Điểm" variant="outlined" value={point} onChange={(e) => setPoint(e.target.value)} /> <Button variant="contained" onClick={() => handleAddPoint(u._id, point)}>Thêm</Button> </td>
        </tr>
    )
}

export default Row