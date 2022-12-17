import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "../lib/axios"
import { imageUpload } from '../utils/ImageUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const NewProduct = () => {

  const { id } = useParams()


  const [image, setImage] = useState("")
  const [imagePreview, setImagePreview] = useState()
  const [imageInvole, setImageInvole] = useState([])
  const [imageInvolePreview, setImageInvolePreview] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [introduction, setIntroduction] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [active, setActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingInv, setIsLoadingInv] = useState(false)
  const [byPoint, setByPoint] = useState(false)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState()
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const handleUploadImage = async (file) => {
    setIsLoading(true)
    await new Promise(async () => {
      const image = await imageUpload(file)
      setImage(image)
      setIsLoading(false)
    })


  }

  const handleUploadImageInvolve = async (files) => {
    let array = []
    setIsLoadingInv(true)
    if (files.length > 3) {
      notifyError("Tạo tối đa 3 file ảnh!")
      files = null
      setIsLoadingInv(false)
    }
    else {
      Array.from(files).map(async (file) => {
        await new Promise(async () => {
          const image = await imageUpload(file)
          array.push(image)
        })
      })
      setImageInvole(array)
    }
    setIsLoadingInv(false)
  }
  const handleAddNewProduct = async () => {
    try {
      await axios.post("/products/create-product", {
        name,
        imgProduct: image,
        imgInvoled: imageInvole,
        price,
        introduction,
        description,
        quantity,
        categoryId: category,
        byPoint,
        isActive: active
      })
      notifySuccess("Thêm sản phẩm thành công")
    } catch (error) {
      notifyError("Thêm sản phẩm thất bại")
    }
  }
  const handleGetAllCatetories = async () => {
    try {
      const res = await axios.get("/categories/get-all")
      setCategories(res.data.categories)
      setCategory(res.data.categories[0]._id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateProduct = async () => {

    try {
      await axios.put(`/products/${id}`, {
        name,
        imgProduct: image,
        price,
        introduction,
        description,
        quantity,
        byPoint,
        categoryId: category,
        isActive: true
      })

      notifySuccess("Cập nhật thành công")

    } catch (error) {
      console.log(error)
      notifyError("Cập nhật thất bại!")
    }
  }

  const handleSetCategory = e => {
    setCategory(e.target.value)
  }

  const handleShowDetailProduct = async (id) => {
    const res = await axios.get(`/products/${id}`)
    const response = res.data.product;
    setImage(response.imgProduct)
    setImageInvole(response.imgInvoled)
    setDescription(response.description)
    setIntroduction(response.introduction)
    setName(response.name)
    setActive(response.isActive)
    setPrice(response.price)
    setQuantity(response.quantity)
  }

  useEffect(() => {
    if (id) {
      handleShowDetailProduct(id)
    }
    handleGetAllCatetories()
    console.log("cate", category);
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
          <label>Số Lượng</label>
          <input type="text" placeholder="123" onChange={(e) => setQuantity(e.target.value)} value={quantity} />
        </div>
        <div className="addProductItem">
          <label>Giới thiệu</label>
          <textarea type="text" placeholder="123" onChange={(e) => setIntroduction(e.target.value)} value={introduction} />
        </div>
        <div className="addProductItem">
          <label>Chi tiết</label>
          <textarea type="text" placeholder="123" onChange={(e) => setDescription(e.target.value)} value={description} />
        </div>
        <div className="addProductItem">
          <label>Số Điểm</label>
          <input type="text" placeholder="100.000 điểm" onChange={(e) => setPrice(e.target.value)} value={price} />
        </div>
        <div className="addProductItem">
          <label>Danh mục</label>
          <select name="active" id="active" onChange={(e) => handleSetCategory(e)} value={category}>
            {categories.map((category, index) => (
              <option key={index} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Thanh toán bằng</label>
          <select name="active" id="active" onChange={(e) => {
            setByPoint(e.target.value === "true" ? true : false)
          }} value={byPoint}>
            <option value={true}>Điểm</option>
            <option value={false}>Tiền</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active" onChange={(e) => setActive(e.target.value)} value={active}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button className="addProductButton" type='button' style={{ backgroundColor: "darkblue" }} onClick={id ? handleUpdateProduct : handleAddNewProduct}>{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default NewProduct;