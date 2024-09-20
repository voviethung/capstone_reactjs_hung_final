import React from 'react'

const FooterMenu = () => {
  return (
    <footer className='container mt-5'>
    <div className='row'>
      <div className="col-md-4 ps-5">
        <h6 className='fw-bold'>GET HELP</h6>
        <ul className="list-unstyled">
          <li><a href="#" className='text-dark text-decoration-none fw-medium'>Home</a></li>
          <li><a href="#" className='text-dark text-decoration-none fw-medium'>Nike</a></li>
          <li><a href="#" className='text-dark text-decoration-none fw-medium'>Adidas</a></li>
          <li><a href="#" className='text-dark text-decoration-none fw-medium'>Contact</a></li>
        </ul>
      </div>
      <div className="col-md-4 ps-5">
        <h6 className='fw-bold'>SUPPORT</h6>
        <ul className="list-unstyled">
          <li><a href="#" className='text-dark text-decoration-none fw-medium'>About</a></li>
          <li><a href="#" className='text-dark text-decoration-none fw-medium'>Contact</a></li>
          <li><a href="#" className='text-dark text-decoration-none fw-medium'>Help</a></li>
          <li><a href="#" className='text-dark text-decoration-none fw-medium'>Phone</a></li>
        </ul>
      </div>
      <div className="col-md-4 ps-5">
        <h6 className='fw-bold'>REGISTER</h6>
        <ul className="list-unstyled">
          <li><a href="#" className='text-dark text-decoration-none fw-medium'>Register</a></li>
          <li><a href="#" className='text-dark text-decoration-none fw-medium'>Login</a></li>
        </ul>
      </div>
    </div>
    <div className="row bg-light pt-3">
      <div className="col-md-12 text-center">
        <p>&copy; 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.</p>
      </div>
    </div>
  </footer>
  )
}

export default FooterMenu