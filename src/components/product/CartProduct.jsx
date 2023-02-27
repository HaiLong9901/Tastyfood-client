import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { addToOrder, removeFromOrder } from '../../features/order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectProductsFromOrder } from '../../features/order/orderSlice'
import { useAddToCartMutation, useRemoveItemFromCartMutation } from '../../features/apis/apiSlice'

function CartProduct({ imageURL, name, quantity, sale_price, original_price, productId }) {
  const checkRef = useRef()
  const [addToCart] = useAddToCartMutation()
  const [removeItem] = useRemoveItemFromCartMutation()
  const dispatch = useDispatch()
  const products = useSelector(selectProductsFromOrder)
  const [productQuantity, setProductQuantity] = useState(quantity)
  const index = products.findIndex((product) => product.productId === productId)
  const [check, setCheck] = useState(index > -1 ? true : false)
  console.log(products)

  return (
    <div className="w-full border-[.1rem] border-solid border-gray-300 rounded-[.5rem] h-[15rem] bg-white flex justify-center items-center p-[2rem]">
      <div className="w-[60%] lg:w-[50%] flex items-center gap-[2rem]">
        <label
          htmlFor={productId}
          className={
            check
              ? 'w-[2.5rem] h-[2.5rem] bg-orangeColor rounded-[.5rem] flex justify-center items-center'
              : 'w-[2.5rem] h-[2.5rem] border-solid border-[.1rem] border-primaryColor rounded-[.5rem]'
          }
        >
          {check ? <FaCheck className="text-[1.6rem] text-white" /> : ''}
        </label>
        <input
          type="checkbox"
          id={productId}
          className="hidden"
          checked={check}
          onChange={(e) => {
            console.log(e.target.checked)
            setCheck(e.target.checked)
            if (e.target.checked) dispatch(addToOrder({ productId, quantity, sale_price, imageURL, name }))
            else dispatch(removeFromOrder({ productId }))
          }}
          ref={checkRef}
        />
        <div className="w-[10rem] h-[10rem] rounded-[.5rem] overflow-hidden">
          <img src={imageURL} alt={name} className="w-full h-full object-cover" />
        </div>
        <Link to={`/product/${productId}`} className="text-[1.6rem]">
          {name}
        </Link>
      </div>
      <div className="w-[40%] lg:w-[50%] flex flex-col lg:flex-row justify-center items-center gap-[.5rem] lg:gap-0">
        <div className="w-[20%] hidden lg:flex justify-between">
          <span className="text-[1.6rem] italic text-primaryColor line-through">{original_price}</span>
          <span className="text-[1.6rem] italic text-primaryColor">{sale_price}</span>
        </div>
        <div className="w-[40%] flex justify-center">
          <div className="flex">
            <div
              className="text-[1.6rem] text-primaryColor w-[3rem] h-[3rem] text-center border-solid border-primaryColor border-[.1rem] cursor-pointer"
              onClick={() => {
                if (productQuantity === 1) return
                setProductQuantity((prev) => prev - 1)
                if (checkRef.current.checked)
                  dispatch(addToOrder({ productId, quantity: parseInt(quantity) - 1, sale_price, imageURL, name }))
                addToCart({ productId, quantity: -1 })
              }}
            >
              -
            </div>
            <div className="text-[1.6rem] text-primaryColor w-[5rem] h-[3rem] text-center border-y-solid border-y-primaryColor border-[.1rem]">
              {productQuantity}
            </div>
            <div
              className="text-[1.6rem] text-primaryColor w-[3rem] h-[3rem] text-center border-solid border-primaryColor border-[.1rem] cursor-pointer"
              onClick={() => {
                setProductQuantity((prev) => prev + 1)
                if (checkRef.current.checked)
                  dispatch(addToOrder({ productId, quantity: parseInt(quantity) + 1, sale_price, imageURL, name }))
                addToCart({ productId, quantity: 1 })
              }}
            >
              +
            </div>
          </div>
        </div>
        <div className="w-[20%] hidden lg:block text-[1.6rem] text-primaryColor italic text-center">{sale_price}</div>
        <div className="w-full lg:hidden text-[1.6rem] text-primaryColor italic text-center">Đơn giá: {sale_price}</div>
        {/* <div className="w-[20%] flex lg:hidden justify-between">
          <span className="text-[1.6rem] italic text-primaryColor line-through">{original_price}</span>
          <span className="text-[1.6rem] italic text-primaryColor">{sale_price}</span>
        </div> */}
        <div
          className="w-[20%] text-[1.6rem] text-orangeColor cursor-pointer text-center"
          onClick={() => {
            dispatch(removeFromOrder({ productId }))
            removeItem({ products: [productId] })
          }}
        >
          Xóa
        </div>
      </div>
    </div>
  )
}

export default CartProduct
