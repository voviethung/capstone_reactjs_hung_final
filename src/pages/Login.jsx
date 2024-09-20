import axios from 'axios';
import { replace, useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setCookie, TOKEN, USER_LOGIN } from '../util/setting';

const Login = () => {
  const navigate = useNavigate();
  const frmLogin = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      //Xử lý gửi dữ liệu về api login của backend để lấy token lưu vào máy client
      const res = await axios({
        url: 'https://shop.cyberlearn.vn/api/Users/signin',
        method: 'POST',
        data: values
      });

      alert('Đăng nhập thành công');
      navigate('/profile');
      //Lưu token vào client (localstorage, cookie)
      // localstorage (server không lấy được) 
      console.log(res.data.content);
      const token = res.data.content.accessToken;
      const userLogin = JSON.stringify(res.data.content);
      localStorage.setItem(TOKEN, token);
      localStorage.setItem(USER_LOGIN, userLogin);
      //Lưu vào cookie
      setCookie(TOKEN, token, 7);

    }
  })


  return (
    <form className='container' onSubmit={frmLogin.handleSubmit}>
      <div className='w-50 mx-auto'>
        <h3 className='text-center fs-1 text-white'>Login</h3>
        <div className='card'>
          <div className='card-body'>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input className='form-control' id="email" name="email" onChange={frmLogin.handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>password</label>
              <input className='form-control' id="password" name="password" onChange={frmLogin.handleChange} type="password" />
            </div>
            <div className='form-group d-flex justify-content-end'>
              <p className='me-2 text-primary' style={{ display: 'inline' }}>Register now ?</p>
              <button type='submit' className='btn btn-dark mt-2 px-4'style={{display: 'inline',borderRadius:'20px', backgroundColor: '#6200EE', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)'}}>LOGIN</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login