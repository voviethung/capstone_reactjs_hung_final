import React from 'react'
import HeaderMenu from '../components/HeaderMenu'
import FooterMenu from '../components/FooterMenu'
import { Outlet } from 'react-router-dom'

const HomePageMaster = () => {
  return (
    <>
      <HeaderMenu />

      <div style={{ minHeight: 650 }} className='content'>
        <Outlet />
      </div>
      <FooterMenu />
    </>
  )
}

export default HomePageMaster