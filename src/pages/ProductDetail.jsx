import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery, useAddToCartMutation } from '../features/apis/apiSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Wrapper from '../components/common/Wrapper'
import { AiOutlineTag } from 'react-icons/ai'
function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const params = useParams()
  const {
    data: detail,
    isSuccess: isSuccessDetail,
    isFetching: isFetchingDetail,
  } = useGetProductByIdQuery(params.productId)
  const [addToCart] = useAddToCartMutation()
  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: detail.result._id,
        quantity,
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
  let Detail
  if (isFetchingDetail) {
    Detail = (
      <div className="w-full h-full text-[2.5rem] text-orangeColor italic flex justify-center items-center">
        Loading...
      </div>
    )
  } else if (isSuccessDetail) {
    Detail = (
      <>
        <div className="w-full lg:w-[45%] aspect-video rounded-[.5rem] overflow-hidden">
          <img src={detail.result.imageURL} alt="banh" className="w-full h-full object-cover" />
        </div>
        <div className="w-full lg:w-[50%]">
          <div className="flex flex-col gap-[1rem] pb-[2rem] border-b-[.2rem] border-b-secondaryColor border-dashed">
            <h2 className="text-[4rem] font-bold text-primaryColor">{detail.result.name}</h2>
            <h3 className="text-[2.5rem] font-bold text-orangeColor">
              {detail.result.sale_price} <span className="text-[2rem] underline">đ</span>
            </h3>
            <div className="flex gap-[1rem]">
              <AiOutlineTag className="text-orangeColor text-[2rem]" />
              <span className="text-primaryColor italic line-through text-[1.8rem]">
                {detail.result.original_price} <span className="text-[1.6rem] underline">đ</span>
              </span>
            </div>
          </div>
          <p className="text-primaryColor text-[1.6rem] py-[1rem]">{detail.result.desc}</p>
          <div className="flex gap-[1rem] my-[1rem] items-center">
            <h4 className="text-[1.6rem]">Số lượng</h4>
            <div className="flex gap-[.5rem]">
              <div
                className="text-[1.6rem] font-bold flex items-center justify-center w-[4rem] aspect-square bg-secondaryColor text-white rounded-[.5rem] cursor-pointer"
                onClick={() => {
                  if (quantity === 1) return
                  setQuantity((prev) => prev - 1)
                }}
              >
                -
              </div>
              <div className="text-[1.6rem] font-bold flex items-center justify-center w-[4rem] aspect-square border-solid border-secondaryColor border-[.1rem] text-secondaryColor rounded-[.5rem]">
                {quantity}
              </div>
              <div
                className="text-[1.6rem] font-bold flex items-center justify-center w-[4rem] aspect-square bg-secondaryColor text-white rounded-[.5rem] cursor-pointer"
                onClick={() => {
                  setQuantity((prev) => prev + 1)
                }}
              >
                +
              </div>
            </div>
          </div>
          <div className="py-[2rem] flex items-center justify-center lg:justify-start">
            <span
              className="text-whiteColor text-[1.6rem] font-bold bg-orangeColor text-white py-[1rem] px-[3rem] rounded-[2rem] hover:bg-transparent hover:text-orangeColor border-solid border-orangeColor border-[.1rem] cursor-pointer box-border duration-300"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </span>
          </div>
        </div>
      </>
    )
  }
  return (
    <Wrapper>
      <div className="my-[5rem] min-h-[70vh] lg:min-h-[60vh]">
        <div className="flex flex-col lg:flex-row w-full justify-between">{Detail}</div>
        <ToastContainer />
      </div>
    </Wrapper>
  )
}

export default ProductDetail
