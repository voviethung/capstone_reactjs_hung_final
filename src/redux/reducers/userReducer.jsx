//rxslice
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    userRegister: {
        "id": 0,
        "email": "",
        "password": "",
        "name": "",
        "gender": true,
        "phone": ""
    }
}
const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        handleChangeInputAction: (state,action) => {
            const {id,value} = action.payload;
            state.userRegister[id] = value;
        }
    }
});
export const {handleChangeInputAction} = userReducer.actions
export default userReducer.reducer