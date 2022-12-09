import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "../lib/axios"
import { imageUpload } from '../utils/ImageUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const NewCategory = () => {

    const { id } = useParams()


    const [image, setImage] = useState("")

    const [imageInvole, setImageInvole] = useState([])

    const [name, setName] = useState("")


    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);




    const handleAddNewProduct = async () => {
        try {

            await axios.post("/categories/create-categories", {
                name,
            })
            notifySuccess("Thêm danh mục thành công")
            setName("")
        } catch (error) {
            notifyError("Thêm danh mục thất bại")
        }
    }

    

    const handleUpdateProduct = async () => {

        try {
            await axios.put(`/categories/${id}`, {
                name,
            })
            notifySuccess("Cập nhật thành công")
        } catch (error) {
            console.log(error)
            notifyError("Cập nhật thất bại!")
        }
    }

    const handleShowDetailProduct = async (id) => {
        const res = await axios.get(`/categories/${id}`)
        const response = res.data.product;
        setName(response.name)

    }

    useEffect(() => {
        if (id) {
            handleShowDetailProduct(id)
        }
    }, [])

    return (
        <div className="newProduct">
            <ToastContainer />
            <h1 className="addProductTitle">Thêm Danh Mục Mới</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Tên</label>
                    <input type="text" placeholder="Apple Airpods" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <button className="addProductButton" type='button' style={{ backgroundColor: "darkblue" }} onClick={id ? handleUpdateProduct : handleAddNewProduct}>{id ? "Update" : "Create"}</button>
            </form>
        </div>
    );
};

export default NewCategory;