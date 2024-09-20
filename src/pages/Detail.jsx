import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import cartReducer from '../redux/reducers/cartReducer';
import { addProductAction } from '../redux/reducers/cartReducer';



const Detail = () => {
    const [prodDetail, setProdDetail] = useState({})
    const [transformValue, setTransformValue] = useState('rotate(0deg)');
    const param = useParams();
    console.log(param);


    const number = useSelector(state => state.numberReducer)
    const dispatch = useDispatch();

    const handleChangeNumber = (quantity) => {
        //Để đưa dữ liệu lên store (dùng dispatch )
        const action = {
            type: 'CHANGE_QUANTITY', //bắt buộc
            payload: quantity
        }
        //Dùng dispatch để gửi action lên store 
        //Ghi chú: khi hàm dispatch thực thi thì tất cả hàm reducer đều chạy lại
        dispatch(action);
    }



    const getProductById = async () => {
        const res = await fetch(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${param.prodId}`);
        const jsonRes = await res.json();
        console.log(jsonRes.content)
        //setState sau khi lấy dữ liệu api về
        setProdDetail(jsonRes.content);
    }
    useEffect(() => {
        //Gọi khi html load xong
        getProductById();
    }, [param.prodId])

    return (
        <div className='container'>
            {/* <h3>Detail - ProdId: {param.prodId}</h3> */}
            <div className='d-flex'>
                <div className='w-50'>
                    <img style={{ transform: transformValue }} src={prodDetail.image} alt='...' className='w-100' />
                    <div className='row'>
                        {prodDetail.detaildetailedImages?.map((deg, index) => {
                            return <div className='col-3' key={index}>
                                <img onClick={() => {
                                    setTransformValue(deg);
                                }} src={prodDetail.image} style={{ transform: deg, border: `1px solid ${deg === transformValue ? 'orange' : '#EEE'}`, cursor: 'pointer' }} className='w-100 p-2 ' />
                            </div>

                        })}
                    </div>
                </div>
                <div className='w-50'>
                    <h3>{prodDetail.name}</h3>
                    <p>{prodDetail.description}</p>
                    <p className='fw-bold text-success fs-4'>Avaible Size</p>
                    {prodDetail.size?.map((size) => {
                        return <button key={size} className='me-2 btn btn-dark bg-secondary'>{size}</button>
                    })}
                    <p className='text-danger fw-bold fs-3 py-2'>{prodDetail.price}$</p>
                    <button className='btn btn-dark me-2' onClick={() => {
                        handleChangeNumber(1);
                    }}>+</button>
                    <span>{number}     </span>
                    <button className='btn btn-dark me-2' onClick={() => {
                        handleChangeNumber(-1)
                    }}>-</button>

                    <div className='my-2'>
                        <button className='px-3 py-1 text-white' style={{ '--bs-primary': '#9400D3', backgroundColor: 'var(--bs-primary)' }} onClick={() => {
                            const action = addProductAction({ ...prodDetail, quantity: number});
                            dispatch(action)
                        }}>Add to Cart</button>
                    </div>
                </div>
            </div>
            <h3 className='pt-0 pb-5 text-center'>- Related Products -</h3>
            <div className='row'>
                {prodDetail.relatedProducts?.map((prodRelate, index) => {
                    return <div className='col-4 mt-2' key={index}>
              <div className='card m-3'>
                <img src={prodRelate.image} alt='...' />
                <div className='card-body'>
                  <h3>{prodRelate.name}</h3>
                  <p>{prodRelate.shortDescription}</p>
                  <div className='row'>
                    <button className='col-6' onClick={() => {
                      const action = addProductAction({ ...prodDetail, quantity: 1 });
                      dispatch(action)
                    }}>Buy now</button>
                    <NavLink to={`/detail/${prodRelate.id}`} className={'col-6 btn btn-success rounded-0'}>{prodRelate.price}$</NavLink>
                  </div>
                </div>
              </div>
            </div>
                })}
            </div>

        </div>
    )
}

export default Detail