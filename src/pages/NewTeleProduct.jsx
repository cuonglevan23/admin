import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "../lib/axios"
import { imageUpload } from '../utils/ImageUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const NewTeleProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams()


    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState([])
    const [categorySelected, setCategorySelected] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    const handleUploadImage = async (file) => {
        setIsLoading(true)
        await new Promise(async () => {
            const image = await imageUpload(file)
            console.log(image)
            setImage(image)
            setIsLoading(false)
        })


    }

    const handleAddNewProduct = async () => {
        try {
            await axios.post("/tele-product/create", {
                image,
                price,
                idServices: categorySelected
            })
            notifySuccess("Thêm sản phẩm thành công")
            setTimeout(() => navigate("/Mặt hàng viễn thông"), 2000)
        } catch (error) {
            notifyError("Thêm sản phẩm thất bại")
        }

    }

    const handleGetAllServices = async () => {
        try {
            const res = await axios.get("/tele-services/get-all")
            setCategory(res.data.teles)
           

        } catch (error) {
            console.log(error)
        }

    }

    const handleUpdateProduct = async () => {

        try {
            await axios.put(`/tele-product/${id}`, {
                idServices: categorySelected,
                image,
                price,
            })
            notifySuccess("Cập nhật thành công")
            setTimeout(() => navigate("/Mặt hàng viễn thông"), 2000)
        } catch (error) {
            console.log(error)
            notifyError("Cập nhật thất bại!")
        }
    }


    const handleSetCategory = (e) => {
        setCategorySelected(e.target.value)
    }
    const handleShowDetailProduct = async (id) => {
        const res = await axios.get(`/tele-product/${id}`)
        const response = res.data.teleservice;
        console.log(res.data)
        setImage(response.image)
        setPrice(response.price)
        setCategorySelected(response.idServices)
    }

    useEffect(() => {
        if (id) {
            handleShowDetailProduct(id)
        }
        handleGetAllServices()

    }, [])

    return (
        <div className="newProduct">
            <ToastContainer />
            <h1 className="addProductTitle">Thêm Sản Phẩm Mới </h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Ảnh</label>
                    <input type="file" id="file" onChange={(e) => handleUploadImage(e.target.files[0])} />
                    {isLoading ? <CircularProgress color='success' /> : (image && <img src={image} style={{ width: 100, height: 100 }} />)}
                </div>
                <div className="addProductItem">
                    <label>Giá</label>
                    <input type="text" onChange={(e) => setPrice(e.target.value)} value={price} />
                </div>
                <div className="addProductItem">
                    <label>Danh mục</label>
                    <select name="active" id="active" onChange={(e) => handleSetCategory(e)} value={categorySelected}>
                        {category.map((cate, index) => (
                            <option key={index} value={cate._id}>{cate.name}</option>
                        ))}
                    </select>
                </div>
                <button className="addProductButton" type='button' style={{ backgroundColor: "darkblue" }} onClick={id ? handleUpdateProduct : handleAddNewProduct}>{id ? "Update" : "Create"}</button>
            </form>
        </div>
    );
};

export default NewTeleProduct;