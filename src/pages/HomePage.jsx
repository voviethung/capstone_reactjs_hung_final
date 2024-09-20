import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addProductAction } from '../redux/reducers/cartReducer';
const HomePage = () => {

  const [arrProduct, setArrProduct] = useState([]);
  //hook dispatch dùng để đưa dữ liệu lên store(redux) thông biến action{type,payload}
  const dispatch = useDispatch();
  const getAllProductApi = async () => {
    const res = await axios.get('https://shop.cyberlearn.vn/api/Product');
    //Đưa dữ liệu từ api vào state arrProduct
    setArrProduct(res.data.content)
  }
  useEffect(() => {
    getAllProductApi()
  }, [])
  return (
    <>
      <div className="container-fluid" style={{ position: 'relative'}}>
        <button style={{ position: 'absolute', top: '150px', left: '150px', width: '50px', height: '50px', border: 'none', color: 'white'}}><i className="fa fa-caret-left fs-2"></i></button>
        <button style={{ position: 'absolute', top: '150px', right: '150px', width: '50px', height: '50px', border: 'none', color: 'white'}}><i className="fa fa-caret-right fs-2"></i></button>
        <div className="row">
          <div className="col-md-8 d-flex align-items-center justify-content-center">
            <div id="productCarousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="./img/image 5.png"
                    className="d-block" alt="Product Image" style={{
                      width: '689px',
                      height: '383px',
                      top: '46px',
                      left: '150px',
                    }} />
                </div>
                {/* Thêm các carousel-item khác nếu cần */}
              </div>
            </div>
          </div>



          <div className="col-md-4 d-flex flex-column justify-content-center">
            <h3 className='fw-normal fs-3'>Product name</h3>
            <p>Product description....</p>
            <button className="btn btn-warning w-25 rounded-0">Buy now</button>



          </div>
        </div>
      </div>
      <div className='container'>
        <h3 className='text-start col-md-6 text-white pt-3 ps-3 fs-2' style={{
          background: 'linear-gradient(to right, #F21299 0%, #1B02B5 100%)',
          width: '698px',
          height: '74px',
          top: '44px',
          left: '-4px',
        }}>Product Feature</h3>
        <div className='row'>

          
          {arrProduct.map((item => {
            return <div className='col-4 mt-2' key={item.id}>
              <div className='card m-3'>
                <img src={item.image} alt='...' />
                <div className='card-body'>
                  <h3>{item.name}</h3>
                  <p>{item.shortDescription}</p>
                  <div className='row'>
                    <button className='col-6' onClick={() => {
                      const action = addProductAction({ ...item, quantity: 1 });
                      dispatch(action)
                    }}>Buy now</button>
                    <NavLink to={`/detail/${item.id}`} className={'col-6 btn btn-success rounded-0'}>{item.price}$</NavLink>
                  </div>
                </div>
              </div>
            </div>
          }))}
        </div>
      </div>
    </>
  )
}

export default HomePage