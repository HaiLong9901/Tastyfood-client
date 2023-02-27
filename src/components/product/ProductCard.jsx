import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddToCartMutation } from '../../features/apis/apiSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function ProductCard({ imageURL, name, original_price, sale_price, _id }) {
  const navigate = useNavigate()
  const [addToCart, { isLoading }] = useAddToCartMutation()
  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: _id,
        quantity: 1,
      }).unwrap()
      toast.success('Thêm vào giỏ hàng thành công', {
        position: 'top-center',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    } catch (error) {
      toast.error(error.data.passage, {
        position: 'top-center',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    }
  }
  return (
    <div className="md:w-[22rem] w-[16rem] aspect-[3/4] box-border border-solid border-[.1rem] border-orangeColor rounded-[.5rem] overflow-hidden relative grow-0">
      <div className="w-full aspect-[4/3]">
        <img src={imageURL} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h3
          className="text-orangeColor text-[1.6rem] md:text-[2rem] text-center my-[.5rem] font-bold cursor-pointer"
          onClick={() => navigate(`/product/${_id}`)}
        >
          {name}
        </h3>
        <div className="w-full flex gap-[1rem] md:gap-[2rem] justify-center my-[.5rem]  md:my-[1rem]">
          <span className="text-primaryColor font-bold text-[1.5rem] md:text-[1.8rem]">{sale_price.toString()}</span>
          <span className="text-primaryColor opacity-75 text-[1.3rem] md:text-[1.6rem] line-through">
            {sale_price === original_price ? undefined : original_price.toString().concat('đ')}
          </span>
        </div>
        <div
          className="w-full bg-orangeColor text-center text-[1.5em] md:text-[1.6rem] text-white font-bold absolute bottom-0 py-[.5rem] md:py-[1rem] cursor-pointer hover:text-orangeColor hover:bg-transparent hover:border-t-solid hover:border-t-[.1rem] hover:border-t-orangeColor duration-200"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ProductCard
