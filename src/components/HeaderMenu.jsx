import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const HeaderMenu = () => {
    const cartStore = useSelector(state => state.cartSliceReducer.cart);

    const calculateTotalQuantity = (cart) => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };
    const totalQuantity = calculateTotalQuantity(cartStore);



    return (
        <header className='bg-dark text-white'>
            <div className='d-flex justify-content-between'>
                <nav className='p-2'>
                    <img src="/img/image.png" alt="Cybersoft" />
                </nav>

                <nav className='p-2'>
                    <NavLink to='/search' className={(props) => props.isActive ? 'mx-2 bg-white text-dark p-3 text-decoration-none fw-bold' : 'mx-2 text-white text-decoration-none'}> <i className='fa fa-search fs-2'></i>
                        Search</NavLink>
                    <NavLink to='/cart' className={(props) => props.isActive ? 'mx-2 bg-white text-dark p-3 text-decoration-none mt-2' : ' mt-2 mx-2 text-white text-decoration-none link'} style={{ textDecoration: 'none' }}>
                        <i className='fa fa-cart-plus fs-2'></i> {totalQuantity}
                    </NavLink>
                    <NavLink to='/login' className={(props) => props.isActive ? 'mx-2 bg-white text-dark p-3 text-decoration-none' : 'mx-2 text-white text-decoration-none link'} style={(props) => props.isActive ? { fontWeight: 'bold' } : {}}>Login</NavLink>
                    <NavLink to='/register' className={(props) => props.isActive ? 'mx-2 bg-white text-dark p-3 text-decoration-none' : 'mx-2 text-white text-decoration-none link'} style={(props) => props.isActive ? { fontWeight: 'bold' } : {}}>Register</NavLink>
                </nav>
            </div>
            <div className='d-flex justify-content-between bg-white'>
                <nav className='p-2'>
                    <NavLink to='/' className={(props) => props.isActive ? 'mx-2 bg-white text-dark fw-bold p-0 text-decoration-none' : 'mx-2 text-dark text-decoration-none link'}>Home</NavLink>
                    <a href="" className='mx-2 text-dark  text-decoration-none link'>Woman</a>
                    <a href="" className='mx-2 text-dark  text-decoration-none link'>Kid</a>
                    <a href="" className='mx-2 text-dark  text-decoration-none link'>Man</a>
                    <a href="" className='mx-2 text-dark  text-decoration-none link'>Sport</a>
                </nav>

            </div>

        </header>
    )
}

export default HeaderMenu