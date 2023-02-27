import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { apiSlice } from './features/apis/apiSlice'
import authReducer from './features/auth/authSlice'
import orderReducer from './features/order/orderSlice'

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
})
