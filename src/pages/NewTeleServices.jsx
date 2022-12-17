import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "../lib/axios"
import { imageUpload } from '../utils/ImageUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const NewTeleServices = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [valueName, setValueName] = useState("")
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
            await axios.post("/tele-services/create", {
                name,
                icon: image,
                ratio: price,
                description,
                valueName
            })
            notifySuccess("Thêm sản phẩm thành công")
            setTimeout(() => navigate("/Ưu đãi viễn thông"), 2000)
        } catch (error) {
            notifyError("Thêm sản phẩm thất bại")
        }
    }
    const handleUpdateProduct = async () => {

        try {
            await axios.put(`/tele-services/${id}`, {
                name,
                icon: image,
                ratio: price,
                description,
                valueName

            })
            notifySuccess("Cập nhật thành công")
            setTimeout(() => navigate("/Ưu đãi viễn thông"), 2000)
        } catch (error) {
            console.log(error)
            notifyError("Cập nhật thất bại!")
        }
    }



    const handleShowDetailProduct = async (id) => {
        const res = await axios.get(`/tele-services/${id}`)
        const response = res.data.teleservice;
        setImage(response.icon)
        setDescription(response.description)
        setName(response.name)
        setPrice(response.ratio)
        setValueName(response.valueName)

    }

    useEffect(() => {
        if (id) {
            handleShowDetailProduct(id)
        }
        // handleGetAllCatetories()
        // console.log("cate", category);
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
                    <label>Tên</label>
                    <input type="text" placeholder="Apple Airpods" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className="addProductItem">
                    <label>Chi tiết</label>
                    <textarea type="text" placeholder="123" onChange={(e) => setDescription(e.target.value)} value={description} />
                </div>
                <div className="addProductItem">
                    <label>Tỉ lệ đổi điểm</label>
                    <input type="text" onChange={(e) => setPrice(e.target.value)} value={price} />
                </div>
                <div className="addProductItem">
                    <label>Tên giá trị</label>
                    <input type="text" onChange={(e) => setValueName(e.target.value)} value={valueName} />
                </div>
                <button className="addProductButton" type='button' style={{ backgroundColor: "darkblue" }} onClick={id ? handleUpdateProduct : handleAddNewProduct}>{id ? "Update" : "Create"}</button>
            </form>
        </div>
    );
};

export default NewTeleServices;