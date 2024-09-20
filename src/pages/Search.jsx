import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';

const Search = () => {
  const [tuKhoa, setTuKhoa] = useState('');
  //useSearchParam: Lưu giá trị người dùng nhập lên url
  const [search, setSearchParam] = useSearchParams();
  //state danh sách sản phẩm từ api
  const [arrProduct,setArrayProduct] = useState([]);
  const valueKeyword = search.get('k');
  const getProductByKeyword = async () => {
   
    if(valueKeyword) {
      //Gọi api
      const res = await fetch(`https://shop.cyberlearn.vn/api/Product?keyword=${valueKeyword}`);

      const data = await res.json();
      console.log('arrProduct',data.content);
      setArrayProduct(data.content);
    }
  }
  useEffect(()=>{
    getProductByKeyword(); //gọi api dựa trên keyword
  },[valueKeyword]); //Nếu mà valueKeyword thay đổi thì useEffect này sẽ chạy lại

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    //Đưa giá trị nhập liệu lên url
    setSearchParam({
      k: tuKhoa,
      // filter:'orderbyDesc'
    });

  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h3 className='mt-2'>Search</h3>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="product name..." aria-label="Recipient's username" aria-describedby="basic-addon2" onInput={(e) => {
            setTuKhoa(e.target.value);
          }} />
          <button type='submit' className="input-group-text btn btn-dark mt-2 ms-4 px-5 py-3" id="basic-addon2" style={{ cursor: 'pointer', borderRadius:'30px', backgroundColor: '#6200EE', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)'}}>SEARCH</button>
        </div>
      </form>
      
      <h3 className='text-start text-white py-3 ps-3 fs-1 mt-4' style={{
          background: 'linear-gradient(to right, #F21299 0%, #1B02B5 100%)',
          // width: '698px',
          // height: '74px',
          // top: '44px',
          // left: '-4px',
        }}>Search result</h3>
      <div className='row'>
        {arrProduct.map((prod)=>{
          return  <div className='col-3 mt-2' key={prod.id}>
          <div className='card' style={{height:200}} >
            <img alt='...' src={prod.image} className='h-100 object-fit-cover'  />
          </div>
          <div className='card-body'>
            <h3>{prod.name}</h3>
            <p>{prod.price}</p>
            <NavLink to={`/detail/${prod.id}`} className='btn btn-dark'>View detail</NavLink>
          </div>
        </div>
        })}
       
      </div>
    </div>
  )
}

export default Search