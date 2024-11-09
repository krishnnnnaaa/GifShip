'use client'
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userStateType{
    status: boolean,
    createdAt: string,
    id: string,
    email: string,
    name: string,
}

const initialState:userStateType = {
    status: false,
    createdAt: '',
    id: '',
    email: '',
    name: '',
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails:(state, action:PayloadAction<userStateType>)=> {
            state.createdAt = action.payload.createdAt;
            state.status = action.payload.status;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.name = action.payload.name;
        }
    }
})

export default userSlice.reducer
export const {setUserDetails} = userSlice.actions