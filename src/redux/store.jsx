//File này sẽ chứa toàn bộ state của ứng dụng
import { configureStore } from '@reduxjs/toolkit';
import * as _ from 'lodash'
import { numberReducer } from './reducers/numberReducer';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';


const cartDefault = [
    { id: 1, name: 'product 1', price: 1000, quantity: 2, image: 'https://picsum.photos/200/200' }
]

export const store = configureStore({
    reducer: {
        numberReducer:numberReducer,
        //cách cũ
        cartReducer: (cart = cartDefault, action) => {
            const { type, payload } = action;
            if (type === 'ADD_PRODUCT') {
                const itemCart = cart.find(item => item.id == payload.id);
                if(itemCart){
                    itemCart.quantity += 1;
                }else {
                    cart.push(payload);
                }
            }
            //Clone ra địa chỉ mới 
            let newCart = _.cloneDeep(cart);
            return newCart;
        },

        cartSliceReducer: cartReducer,
        userReducer:userReducer,
    }
})
/*
    imutable:
    Khi reducer trả về giá trị mới (shallow compare) thì component useSelector đến state đó sẽ render lại, còn các component follow từ các reducer khác nếu không thay đổi sẽ không render.
*/


//hàm này là hàm sẽ return về state (reducer)