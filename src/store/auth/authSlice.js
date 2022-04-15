import { createSlice } from '@reduxjs/toolkit'
import * as LocalStorage from '../../utils/localStorage.util'

const userData = LocalStorage.getUserData();

const initialState = {
  user: userData ? userData : null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
})

export const { setUser, removeUser } = authSlice.actions

export default authSlice.reducer