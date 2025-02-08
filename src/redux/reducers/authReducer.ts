import { createSlice } from "@reduxjs/toolkit";

const authSlide = createSlice({
    name: 'auth',
    initialState: {
        data: {
            accesstoken: '',
            _id: '',
        },
    },
    reducers: {
        addAuth: (state, action) => {
            state.data = action.payload
        },
        removeAuth: (state, action) => {
            state.data = {
                accesstoken: '',
                _id: ''
            }
        }
    }
})

export const authReducer = authSlide.reducer
export const {addAuth, removeAuth} = authSlide.actions
export const authState = (state: any) => state.authReducer.data

