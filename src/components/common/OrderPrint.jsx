import React, { forwardRef } from 'react'
import { toISODate } from '../../shared/FormatDate'
function OrderPrint({ order }, ref) {
  let total = 0
  return (
    <div ref={ref}>
      <div className="p-[5rem] flex flex-col gap-[1rem]">
        <h2 className="text-[1.6rem] text-primaryColor">
          Mã hóa đơn: <strong className="text-[1.6rem]">{order.result._id}</strong>
        </h2>
        <h3 className="text-[1.6rem] text-primaryColor">Khách hàng: {order.result.userId.name}</h3>
        <h3 className="text-[1.6rem] text-primaryColor">Số điện thoại: {order.result.userId.phone}</h3>
        <h3 className="text-[1.6rem] text-primaryColor">Địa chỉ: {order.result.address.address}</h3>
        <h3 className="text-[1.6rem] text-primaryColor">Ngày đặt: {toISODate(order.result.createdAt)}</h3>
        <h3 className="text-[1.6rem] text-primaryColor">Sản phẩm: </h3>
        <table className="border-solid border-[.1rem] border-gray-200 rounded-[.5rem] table-fixed border-collapse">
          <tr>
            <th className="text-[1.5rem] text-center py-[1rem] font-bold border-solid border-[.1rem] border-primaryColor">
              Mã sản phẩm
            </th>
            <th className="text-[1.5rem] text-center py-[1rem] font-bold border-solid border-[.1rem] border-primaryColor">
              Tên sản phẩm
            </th>
            <th className="text-[1.5rem] text-center py-[1rem] font-bold border-solid border-[.1rem] border-primaryColor">
              Số lượng
            </th>
            <th className="text-[1.5rem] text-center py-[1rem] font-bold border-solid border-[.1rem] border-primaryColor">
              Giá gốc
            </th>
            <th className="text-[1.5rem] text-center py-[1rem] font-bold border-solid border-[.1rem] border-primaryColor">
              Giá bán
            </th>
          </tr>
          {order.result.products?.map((product, index) => {
            total += parseInt(product.productId.sale_price) * parseInt(product.quantity)
            return (
              <tr>
                <td className="text-[1.5rem] text-center py-[1rem] border-solid border-primaryColor border-[.1rem]">
                  {product.productId._id}
                </td>
                <td className="text-[1.5rem] text-center py-[1rem] border-solid border-primaryColor border-[.1rem]">
                  {product.productId.name}
                </td>
                <td className="text-[1.5rem] text-center py-[1rem] border-solid border-primaryColor border-[.1rem]">
                  {product.quantity}
                </td>
                <td className="text-[1.5rem] text-center py-[1rem] border-solid border-primaryColor border-[.1rem]">
                  {product.productId.original_price}
                </td>
                <td className="text-[1.5rem] text-center py-[1rem] border-solid border-primaryColor border-[.1rem]">
                  {product.productId.sale_price}
                </td>
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
      </div>
    </div>
  )
}

export default forwardRef(OrderPrint)
