import React from 'react'
import { Table } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProductAction, changeQuantityProductAction } from '../redux/reducers/cartReducer';
import axios from 'axios';

const Cart = () => {
  //selector: lấy dữ liệu về
  const cartStore = useSelector(state => state.cartSliceReducer.cart);
  const userLogin = useSelector(state => state.userReducer.userRegister);
  // const state = useSelector(state => state);
  // console.log(state)

  //dispatch: gửi dữ liệu lên redux (handleEvent)
  const dispatch = useDispatch();


  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Chuẩn bị dữ liệu theo cấu trúc của API
    const orderInfo = cartStore.map(item => ({
      productId: item.id,  // API yêu cầu `productId` là ID của sản phẩm
      quantity: item.quantity  // Số lượng sản phẩm
    }));

    // Giả sử email của người dùng đã đăng nhập có trong state hoặc localStorage
    const userLoginData = JSON.parse(localStorage.getItem('userLogin'));
    const email = userLoginData?.email;
    // const email = userLogin?.email || localStorage.getItem('userEmail'); // Lấy email từ state hoặc localStorage
    const orderData = {
      orderDetail: orderInfo,
      email: email
    };

    // Gửi dữ liệu lên API
    try {
      const res = await axios.post('https://shop.cyberlearn.vn/api/Users/order', orderData);
      alert('Submit Order thành công');
    } catch (err) {
      console.log(err);
      alert('Submit Order thất bại');
    }
  };


  const columns = [
    {
      title: '', // Tiêu đề cột, có thể để trống hoặc đặt tên tùy ý
      dataIndex: 'checkbox', // Tên dataIndex để xác định cột này
      render: (value, record) => (
        <input type="checkbox" /> // Hiển thị checkbox trong cột
      )
    },
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: 'img',
      dataIndex: 'image',
      render: (value, record) => {
        return <img src={record.image} width={50} alt="..." />
      }
    },
    {
      title: 'name',
      dataIndex: 'name'
    },

    {
      title: 'price',
      dataIndex: 'price'
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
      render: (value, record) => {
        return <>
          <button className={'btn btn-dark me-2'} onClick={() => {
            //Tạo ra action bằng hàm action được export từ reducer (rxslice)
            const payload = {
              id: record.id,
              quantity: 1
            }
            const action = changeQuantityProductAction(payload);
            //Đưa action lên reducer
            dispatch(action);
          }}>+</button>
          {value}
          <button className={'btn btn-dark ms-2'} onClick={() => {
            //Tạo ra action bằng hàm action được export từ reducer (rxslice)
            const payload = {
              id: record.id,
              quantity: -1
            }
            const action = changeQuantityProductAction(payload);
            //Đưa action lên reducer
            dispatch(action);
          }}>-</button>
        </>
      }
    },
    {
      title: 'total',
      render: (value, record) => {
        return (record.price * record.quantity).toLocaleString();
      }
    },
    {
      title: 'action',
      render: (value, record) => {
        return <>
          <button className="btn btn-primary me-3" style={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' }} onClick={() => {
            //Tạo ra action
            const action = prodEditForm(record.id);
            /*
              const action = {
                type:'cartReducer/deleteProductAction',
                payload:record.id
              }
            */
            //Dispatch action
            dispatch(action)
          }}>
            EDIT
          </button>
          <button className="btn btn-danger ms-3" style={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' }} onClick={() => {
            //Tạo ra action
            const action = deleteProductAction(record.id);
            /*
              const action = {
                type:'cartReducer/deleteProductAction',
                payload:record.id
              }
            */
            //Dispatch action
            dispatch(action)
          }}>
            DELETE
          </button>
        </>
      }
    }
  ]

  console.log(cartStore);
  return (
    <div className='container'>
      <h3>Cart</h3>
      <Table rowKey={'id'} dataSource={cartStore} columns={columns} />

      <div className="d-flex justify-content-end mt-3">
        <button type='submit' onClick={handleSubmitOrder} className='bg-warning text-white fw-bold px-4 py-2' style={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', backgroundColor: '#6200EE', border: 'none' }}>SUBMIT ORDER</button>
      </div>
    </div>
  )
}

export default Cart