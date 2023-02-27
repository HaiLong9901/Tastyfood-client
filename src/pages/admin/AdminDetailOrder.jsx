import React, { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetDetailOrderQuery } from '../../features/apis/apiSlice'
import { toISODate } from '../../shared/FormatDate'
import ReactToPrint from 'react-to-print'
import OrderPrint from '../../components/common/OrderPrint'
import { FaPrint } from 'react-icons/fa'
import { useUpdateOrderStatusMutation } from '../../features/apis/apiSlice'

function AdminDetailOrder() {
  const navigate = useNavigate()
  const orderRef = useRef()
  const { orderId } = useParams()
  const { data: order, isFetching: isFetchingOrder, isSuccess: isSuccessOrder } = useGetDetailOrderQuery(orderId)
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation()
  let DetailRender
  if (isFetchingOrder) {
    DetailRender = (
      <div className="flex justify-center items-center h-screen">
        <h3 className="text-[3rem] font-bold text-orangeColor">Loading...</h3>
      </div>
    )
  } else if (isSuccessOrder) {
    let total = 0
    DetailRender = (
      <div className="p-[2rem] flex flex-col gap-[1rem]">
        <h2 className="text-[1.6rem] text-primaryColor">
          Mã hóa đơn: <strong className="text-[1.6rem]">{order.result._id}</strong>
        </h2>
        <h3 className="text-[1.6rem] text-primaryColor">Khách hàng: {order.result.userId.name}</h3>
        <h3 className="text-[1.6rem] text-primaryColor">Số điện thoại: {order.result.userId.phone}</h3>
        <h3 className="text-[1.6rem] text-primaryColor">Địa chỉ: {order.result.address.address}</h3>
        <h3 className="text-[1.6rem] text-primaryColor">Ngày đặt: {toISODate(order.result.createdAt)}</h3>
        <h3 className="text-[1.6rem] text-primaryColor">Sản phẩm: </h3>
        <table className="border-solid border-[.1rem] border-gray-200 rounded-[.5rem] table-fixed">
          <tr className="bg-yellowColor">
            <th className="text-[1.5rem] text-center py-[1rem] font-bold">Mã sản phẩm</th>
            <th className="text-[1.5rem] text-center py-[1rem] font-bold">Tên sản phẩm</th>
            <th className="text-[1.5rem] text-center py-[1rem] font-bold">Số lượng</th>
            <th className="text-[1.5rem] text-center py-[1rem] font-bold">Giá gốc</th>
            <th className="text-[1.5rem] text-center py-[1rem] font-bold">Giá bán</th>
          </tr>
          {order.result.products?.map((product, index) => {
            total += parseInt(product.productId.sale_price) * parseInt(product.quantity)
            return (
              <tr className={!index % 2 ? 'bg-white' : 'bg-gray-200'}>
                <td className="text-[1.5rem] text-center py-[1rem]">{product.productId._id}</td>
                <td className="text-[1.5rem] text-center py-[1rem]">{product.productId.name}</td>
                <td className="text-[1.5rem] text-center py-[1rem]">{product.quantity}</td>
                <td className="text-[1.5rem] text-center py-[1rem]">{product.productId.original_price}</td>
                <td className="text-[1.5rem] text-center py-[1rem]">{product.productId.sale_price}</td>
              </tr>
            )
          })}
        </table>
        <div className="flex flex-col items-end gap-[1rem]">
          <div className="w-[40%] flex justify-between">
            <h3 className="text-[1.6rem] text-primaryColor">Tổng đơn hàng: </h3>
            <span className="text-[1.6rem] text-primaryColor">{total}</span>
          </div>
          {order.result.voucher ? (
            <div className="w-[40%] flex justify-between">
              <h3 className="text-[1.6rem] text-primaryColor">
                Voucher: <strong className="text-[1.6rem]">{order.result.voucher.code}</strong>
              </h3>
              <span className="text-[1.6rem] text-primaryColor">
                -{order.result.voucher.value * 100}% = {order.result.voucher.value * total}
              </span>
            </div>
          ) : undefined}
          <div className="w-[40%] flex justify-between">
            <h3 className="text-[1.6rem] text-primaryColor">Phí vận chuyển</h3>
            <span className="text-[1.6rem] text-primaryColor">+10000</span>
          </div>
          <div className="w-[40%] flex justify-between">
            <h3 className="text-[1.6rem] text-primaryColor">Tổng thanh toán: </h3>
            <strong className="text-[1.6rem] text-primaryColor">{order.result.amount}</strong>
          </div>
        </div>
        {order.result.status === 'rejected' ? undefined : (
          <div className="flex justify-end gap-[2rem]">
            {order.result.status === 'pending' ? (
              <>
                <button
                  className="text-[1.6rem] text-white bg-orangeColor py-[1rem] px-[2rem] border-solid border-orangeColor border-[.1rem] rounded-[.5rem]"
                  onClick={() => {
                    updateOrderStatus({
                      orderId: order.result._id,
                      status: 'shipping',
                    })
                    navigate('/admin/order/shipping')
                  }}
                >
                  Giao hàng
                </button>
                <button
                  className="text-[1.6rem] text-primaryColor py-[1rem] px-[2rem] border-solid border-primaryColor border-[.1rem] rounded-[.5rem]"
                  onClick={() => {
                    updateOrderStatus({
                      orderId: order.result._id,
                      status: 'rejected',
                    })
                    navigate('/admin/order/rejected')
                  }}
                >
                  Hủy đơn hàng
                </button>
              </>
            ) : undefined}
            {order.result.status === 'shipping' ? (
              <button
                className="text-[1.6rem] text-white py-[1rem] px-[2rem] bg-secondaryColor border-solid border-secondaryColor border-[.1rem] rounded-[.5rem]"
                onClick={async () => {
                  try {
                    await updateOrderStatus({
                      orderId: order.result._id,
                      status: 'success',
                    })
                    navigate('/admin/order/success')
                  } catch (error) {
                    console.log(error.data.passage)
                  }
                }}
              >
                Giao thành công
              </button>
            ) : undefined}
            <ReactToPrint
              trigger={() => (
                <button className="text-[1.6rem] text-white bg-blue-500 border-solid border-blue-500 py-[1rem] px-[2rem] flex gap-[2rem] items-center rounded-[.5rem]">
                  <FaPrint className="text-[1.6rem]" /> In Đơn
                </button>
              )}
              content={() => orderRef.current}
            />
          </div>
        )}

        <div className="hidden">
          <OrderPrint order={order} ref={orderRef} />
        </div>
      </div>
    )
  }
  return <div>{DetailRender}</div>
}

export default AdminDetailOrder
