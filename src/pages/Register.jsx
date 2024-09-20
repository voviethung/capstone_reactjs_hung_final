import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeInputAction } from '../redux/reducers/userReducer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const { userRegister } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('userRegister', userRegister);
  const handleChangeInput = (e) => {
    let { id, value } = e.target;
    const action = handleChangeInputAction({ id, value });
    dispatch(action);
    console.log('action', action);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userRegister);
    //Gọi api đăng ký: 
    try {
      const res = await axios.post('https://shop.cyberlearn.vn/api/Users/signup', userRegister);
      alert('Đăng ký thành công');
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }


    
  }
  console.log('render')
  return (
    <div className='container'>
      <div>
        <h2>Registration</h2>


        <div className="row">
          <div class="col-md-6">
            <form onSubmit={handleSubmit} >
              {/* ID Field (Hidden) */}
              < input type="hidden" id="id" defaultValue={0} value={userRegister.id} />
              {/* Email Field */}
              <div className="form-group" style={{ width: '80%' }}>
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={userRegister.email} onChange={handleChangeInput} />
              </div>
              {/* Password Field */}
              <div className="form-group"style={{ width: '80%' }}>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" value={userRegister.password} onChange={handleChangeInput} />
              </div>
              {/* Password Confirm Field */}
              <div className="form-group"style={{ width: '80%' }}>
                <label htmlFor="password">Password Confirm</label>
                <input type="password" className="form-control" id="password" placeholder="Password confirm" value={userRegister.password} onChange={handleChangeInput} />
              </div>
            </form>
          </div>

          <div class="col-md-6">
            <form onSubmit={handleSubmit} >
              {/* Name Field */}
              <div className="form-group"style={{ width: '80%' }}>
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" value={userRegister.name} onChange={handleChangeInput} />
              </div>

              {/* Phone Field */}
              <div className="form-group"style={{ width: '80%' }}>
                <label htmlFor="phone">Phone</label>
                <input onChange={handleChangeInput} type="text" className="form-control" id="phone" placeholder="Enter your phone number" value={userRegister.phone} />
              </div>

              {/* Gender Field */}
              {/* <div className="form-group">
                <label htmlFor="gender">Gender</label>
                  <select className="form-control" id="gender" value={userRegister.gender} onChange={handleChangeInput}>
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              </div> */}

              <div className="mb-3">
                <label className="form-label">Gender</label><br />
                <div className="form-check form-check-inline">
                  <input onChange={handleChangeInput} className="form-check-input" type="radio" name="gender" id='true' value={userRegister.gender} />
                  <label className="form-check-label" htmlFor="male">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input onChange={handleChangeInput} className="form-check-input" type="radio" name="gender" id='false' value={userRegister.gender} />
                  <label className="form-check-label" htmlFor="female">Female</label>
                </div>
              </div>

              {/* Submit Button */}
              <button onClick={handleSubmit} type="submit" className="btn btn-primary mt-2 px-4" style={{boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', borderRadius:'20px', backgroundColor: '#6200EE'}}>SUBMIT</button>
            </form>
          </div>
        </div>
      </div>

    </div >
  )
}

export default Register