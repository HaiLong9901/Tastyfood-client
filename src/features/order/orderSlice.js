import { createSlice } from '@reduxjs/toolkit'
import { LOCAL_STORAGE_PRODUCTS_ORDER } from '../../shared/Constants'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    products: localStorage.getItem(LOCAL_STORAGE_PRODUCTS_ORDER)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_PRODUCTS_ORDER))
      : [],
    amount: 0,
  },
  reducers: {
    addToOrder: (state, action) => {
      const { productId, quantity, sale_price, imageURL, name } = action.payload
      const index = state.products.findIndex((product) => product.productId === productId)
      if (index > -1) state.products[index].quantity = quantity
      else
        state.products.push({
          productId,
          quantity,
          sale_price,
          imageURL,
          name,
        })

      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_ORDER, JSON.stringify(state.products))
    },
    removeFromOrder: (state, action) => {
      const { productId } = action.payload
      state.products = [...state.products.filter((product) => product.productId !== productId)]
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_ORDER, JSON.stringify(state.products))
    },
    removeAllProduct: (state, action) => {
      state.products = []
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_ORDER, JSON.stringify(state.products))
    },
  },
})

export const { addToOrder, removeFromOrder, removeAllProduct } = orderSlice.actions
export default orderSlice.reducer
export const selectProductsFromOrder = (state) => state.order.products
export const selectAmountOfOrder = (state) => {
  const amount = state.order.products.reduce(
    (total, product) => total + parseInt(product.quantity * product.sale_price),
    0,
  )
  return amount
}
