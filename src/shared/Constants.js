import img from '../assets/Image/user.png'
export const USER_DEFAULT_AVATAR = img
// export const API = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api/' : 'acasc'
export const API = process.env.NODE_ENV !== 'production' ? 'https://tasty-food-server.onrender.com/api/' : 'acasc'
export const LOCAL_STORAGE_TOKEN_NAME = 'accessToken'
export const LOCAL_STORAGE_USER = 'user'
export const LOCAL_STORAGE_NUMBER_PRODUCTS_IN_CART = 'cartItems'
export const LOCAL_STORAGE_PRODUCTS_ORDER = 'order'
export const LOCAL_STORAGE_CART_NUMBER = 'cartNum'
