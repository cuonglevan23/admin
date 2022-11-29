import React from 'react';

const NewProduct = () => {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm Sản Phẩm Mới </h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Ảnh</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Tên</label>
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className="addProductItem">
          <label>Số Lượng</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Loại</label>
          <input type="text" placeholder="Hoa Quả" />
        </div>
        <div className="addProductItem">
          <label>Số Điểm</label>
          <input type="text" placeholder="100.000 điểm" />
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
};

export default NewProduct;