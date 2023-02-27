import React from 'react'
import { useGetAllOrderQuery, useRejectOrderMutation } from '../../features/apis/apiSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
function UserPurchaseList({ status }) {
  const navigate = useNavigate()
  const [rejectOrder] = useRejectOrderMutation()
  const { data: orders, isFetching: isFetchingOrders, isSuccess: isSuccessOrders } = useGetAllOrderQuery(status)
  let OrderRender
  if (isFetchingOrders)
    OrderRender = (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <h2 className="text-[2.5rem] text-orangeColor font-bold">Loading</h2>
      </div>
    )
  else if (isSuccessOrders) {
    if (!orders.result.length)
      OrderRender = (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <h2 className="text-[2.5rem] text-orangeColor font-bold">Không có đơn hàng nào</h2>
        </div>
      )
    else
      OrderRender = (
        <div className="min-h-[50vh]">
          {orders.result?.map((order) => (
            <div className=" border-dashed border-gray-200 border-b-[.2rem] my-[2rem] shadow-md">
              <div className="flex p-[.5rem] justify-between items-center border-solid border-gray-200 border-b-[.1rem]">
                <div>
                  <h3 className="text-[1.3rem] text-primaryColor">{order.createdAt}</h3>
                  <span className="text-[1.3rem] text-primaryColor">
                    Mã đơn: <strong className="text-[1.3rem]">{order._id}</strong>
                  </span>
                </div>
                <h3 className="text-[1.3rem] italic text-orangeColor">
                  {order.status === 'success'
                    ? 'Đơn hàng đã giao thành công'
                    : order.status === 'pending'
                    ? 'Đơn hàng đang được chuẩn bị'
                    : order.status === 'shipping'
                    ? 'Đơn hàng đang được giao'
                    : 'Đơn hàng đã hủy'}
                </h3>
              </div>
              {order.products?.map((product) => (
                <div className="p-[.5rem] flex justify-between">
                  <div className="flex gap-[1rem] items-center">
                    <div className="w-[5rem] h-[5rem] rounded-[.5rem] overflow-hidden">
                      <img
                        src={product.productId.imageURL}
                        alt={product.productId.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-[1.6rem] text-primaryColor">{product.productId.name}</h3>
                      <span>{'X'.concat(product.quantity)}</span>
                    </div>
                  </div>
                  <div className="flex gap-[1rem] items-center">
                    <span className="text-[1.3rem] italic text-grayColor line-through">
                      {product.productId.original_price}
                    </span>
                    <span className="text-[1.3rem] text-primaryColor">{product.productId.sale_price}</span>
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-end justify-center gap-[1rem] py-[1rem] bg-yellowColor/20 px-[.5rem]">
                <div className="text-[1.3rem] text-primaryColor">
                  Thành tiền <span className="text-[2rem] font-bold text-orangeColor">{order.amount}</span>
                </div>
                {order.status === 'pending' ? (
                  <button
                    className="text-white text-[1.6rem] bg-orangeColor py-[1rem] px-[2rem] rounded-[.5rem]"
                    onClick={async () => {
                      try {
                        await rejectOrder({
                          id: order._id,
                        }).unwrap()
                        navigate('/user/purchase/rejected')
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
                    }}
                  >
                    Hủy đơn hàng
                  </button>
                ) : undefined}
              </div>
            </div>
          ))}
          <ToastContainer />
        </div>
      )
  }
  return <>{OrderRender}</>
}

export default UserPurchaseList
