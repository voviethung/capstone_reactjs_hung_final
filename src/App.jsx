//rafce
import React, { useState } from 'react'
//Cấu hình react router dom
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Search from './pages/Search'
import Cart from './pages/Cart'
import HeaderMenu from './components/HeaderMenu'
import HomePageMaster from './MasterPages/HomePageMaster'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Detail from './pages/Detail'
//import css
import './assets/styles/index.css';
//Cấu hình redux
import { Provider } from 'react-redux';
import { store } from './redux/store'

const App = () => {

  const [state, setState] = useState();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='' element={<HomePageMaster />}>
            <Route index element={<HomePage />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='cart' element={<Cart />}></Route>
            <Route path='search' element={<Search />}></Route>
            <Route path='detail'>
              <Route path=':prodId' element={<Detail />}></Route>
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App