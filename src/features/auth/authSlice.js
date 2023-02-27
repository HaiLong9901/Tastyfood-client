import { createSlice } from '@reduxjs/toolkit'
import { LOCAL_STORAGE_TOKEN_NAME, LOCAL_STORAGE_USER } from '../../shared/Constants'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem(LOCAL_STORAGE_USER) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER)) : {},
    token: localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, accessToken)
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user))
    },
    logOut: (state, action) => {
      state.user = {}
      state.token = null
      localStorage.clear()
    },
    updateCredentials: (state, action) => {
      const { imageURL } = action.payload
      state.user.imageURL = imageURL
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(state.user))
    },
  },
})

export const { setCredentials, logOut, updateCredentials } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentRole = (state) => state.auth.user.isAdmin
