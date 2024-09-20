import React, { useEffect, useState } from 'react'
import { Pagination } from "antd";
import { TOKEN, http } from '../util/setting';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Profile = () => {
  const [profile, setProfile] = useState({
    ordersHistory: [], // Khởi tạo ordersHistory là mảng rỗng
  });

  const [updateProfile, setUpdateProfile] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    gender: true  // giả sử giá trị mặc định là true cho Male
  });


  const [currentPage, setCurrentPage] = useState(1);  // State để lưu trang hiện tại
  const [pageSize, setPageSize] = useState(5);  // Số lượng item mỗi trang
  const navigate = useNavigate();

  const getProfileApi = async () => {
    try {
      const res = await http.post('https://shop.cyberlearn.vn/api/Users/getProfile');

      console.log(res.data.content);
      //Đưa vào state
      setProfile(res.data.content);
    } catch (err) {
      console.log(err);
      //Thất bại thì sẽ chuyển hướng trang
      alert('Đăng nhập để vào profile');
      navigate('/login');
    }

  }
  // const getUpdateProfileApi = async () => {
  //   try {
  //     const res = await http.post('https://shop.cyberlearn.vn/api/Users/updateProfile');

  //     console.log(res.data.content);
  //     //Đưa vào state
  //     setUpdateProfile(res.data.content);
  //   } catch (err) {
  //     console.log(err);
  //     //Thất bại thì sẽ chuyển hướng trang
  //     alert('Caapj ');
  //     navigate('/login');
  //   }

  // }




  useEffect(() => {
    getProfileApi();
  }, [])


  // Hàm xử lý khi trang thay đổi
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Lọc các đơn hàng dựa trên trang hiện tại
  const paginatedOrders = profile.ordersHistory
    ? profile.ordersHistory.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];


  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2">
          <img src={profile.avatar} alt="User Avatar" className="img-fluid" />
        </div>
        {/* Main Content */}
        <div className="col-md-10">
          <form>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder={profile.email} />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder={profile.name} />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="text" className="form-control" id="phone" placeholder={profile.phone} />
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder={profile.password} />
              </div>
            </div>
            <div className="row">
              <label className="form-label col-md-10 d-flex justify-content-end">Gender</label>
              <div className="col-md-10 d-flex justify-content-end">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" id="male" value="Male" />
                  <label className="form-check-label" htmlFor="male">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" id="female" value="Female" />
                  <label className="form-check-label" htmlFor="female">Female</label>
                </div>
              </div>
              <div className='col-md-2'>
                <button type="submit" className="btn btn-primary" style={{ display: 'inline-block' }} >Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />
      <div>
        <div className='row'>
          <h2 className='col-md-3' style={{ color: 'purple' }}>Order History</h2>
          <h2 className='col-md-3' style={{ color: 'black' }}>Favourite</h2>
        </div>
        {profile.ordersHistory.length > 0 ? (
          <div>
            {paginatedOrders.map((order) => (
              <div key={order.id}>
                <h3 className="fs-4" style={{ color: 'purple' }}>Orders have been placed on {new Date(order.date).toLocaleDateString()}</h3>
                <table>
                  <thead>
                    <tr>
                      <th className='id'>id</th>
                      <th className='img'>img</th>
                      <th className='name'>name</th>
                      <th className='price'>price</th>
                      <th className='quantity'>quantity</th>
                      <th className='total'>total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderDetail.map((product) => (
                      <tr key={product.id}>
                        <td className='id text-center'>{product.id}</td>
                        <td className='img text-center'>
                          <img src={product.image} alt={product.name} style={{ width: "50px" }} />
                        </td>
                        <td className='name text-center'>{product.name}</td>
                        <td className='price text-center'>{product.price}</td>
                        <td className='quantity text-center'>{product.quantity}</td>
                        <td className='total text-center'>{product.price * product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={profile.ordersHistory.length}
              onChange={handlePageChange}
              showSizeChanger={false}  // Ẩn lựa chọn thay đổi số lượng item mỗi trang
              style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} />

          </div>

        ) : (
          <p>No orders found</p>
        )}
      </div>


    </div>


  )
}

export default Profile