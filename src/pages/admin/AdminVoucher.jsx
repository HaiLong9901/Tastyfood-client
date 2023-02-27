import React, { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useCreateVoucherMutation, useGetAllVoucherQuery, useRemoveVoucherMutation } from '../../features/apis/apiSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function VoucherTable() {
  const [removeVoucher] = useRemoveVoucherMutation()
  const [currentPage, setCurrentPage] = useState(1)
  const {
    data: voucherList,
    isFetching: isFetchingVoucherList,
    isSuccess: isSuccessVoucherList,
  } = useGetAllVoucherQuery()
  let TableRender
  if (isFetchingVoucherList) {
    TableRender = (
      <div className="w-full h-[20rem] flex justify-center items-center text-[2rem] font-bold text-orangeColor">
        Loading...
      </div>
    )
  } else if (isSuccessVoucherList) {
    if (!voucherList.result.length) {
      TableRender = (
        <div className="w-full h-[20rem] flex justify-center items-center text-[2rem] font-bold text-orangeColor">
          Không có voucher nào
        </div>
      )
    } else {
      let maxPage = Math.ceil(voucherList.result.length / 12)
      TableRender = (
        <div className="flex flex-col justify-between h-full">
          <table className="w-full table-fixed">
            <tr className="bg-yellowColor w-full">
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Mã voucher</th>
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Giảm</th>
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Tổng đơn</th>
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Ngày bắt đầu</th>
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Ngày kết thúc</th>
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Xóa</th>
            </tr>
            {voucherList.result?.map((voucher, index) => {
              if (index >= currentPage * 12 || index < (currentPage - 1) * 12) return
              return (
                <tr className={index % 2 ? 'bg-gray-100' : null} key={voucher.code}>
                  <td className="text-[1.5rem] p-[1rem] text-center">{voucher.code}</td>
                  <td className="text-[1.5rem] p-[1rem] text-center">{voucher.value * 100}%</td>
                  <td className="text-[1.5rem] p-[1rem] text-center">{voucher.apply_for}</td>
                  <td className="text-[1.5rem] p-[1rem] text-center">
                    {new Date(voucher.startOn).toLocaleDateString()}
                  </td>
                  <td className="text-[1.5rem] p-[1rem] text-center">
                    {new Date(voucher.expiredOn).toLocaleDateString()}
                  </td>
                  <td
                    className="text-[1.5rem] p-[1rem] text-center text-orangeColor cursor-pointer"
                    onClick={async () => {
                      try {
                        await removeVoucher({
                          id: voucher._id,
                        }).unwrap()
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
                    Xóa
                  </td>
                </tr>
              )
            })}
          </table>
          <div className="flex justify-between items-center mt-[1rem]">
            <div className="text-[1.5rem] text-primaryColor">
              Trang {currentPage} trong {maxPage} trang
            </div>
            <div className="flex gap-[2rem] items-center">
              <div
                className="text-[1.8rem] text-primaryColor cursor-pointer"
                onClick={() => {
                  if (currentPage <= 1) return
                  setCurrentPage((prev) => prev - 1)
                }}
              >
                <FaChevronLeft />
              </div>
              {Array.apply(undefined, Array(5)).map((value, index) => {
                const pageValue =
                  currentPage % 5 === 0
                    ? Math.trunc((currentPage - 1) / 5) * 5 + index + 1
                    : Math.trunc(currentPage / 5) * 5 + index + 1
                if (pageValue > maxPage) return
                return (
                  <div
                    className={`text-[1.6rem] ${
                      currentPage === pageValue ? 'text-orangeColor' : 'text-primaryColor'
                    } cursor-pointer`}
                    onClick={() => {
                      setCurrentPage(pageValue)
                    }}
                  >
                    {pageValue}
                  </div>
                )
              })}
              <div
                className="text-[1.8rem] text-primaryColor cursor-pointer"
                onClick={() => {
                  if (currentPage >= maxPage) return
                  setCurrentPage((prev) => prev + 1)
                }}
              >
                <FaChevronRight />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  return <>{TableRender}</>
}

function AdminVoucher() {
  const [from, setFrom] = useState(new Date().toISOString().substring(0, 10))
  const [to, setTo] = useState(new Date().toISOString().substring(0, 10))
  const [code, setCode] = useState('')
  const [sale, setSale] = useState(0)
  const [amount, setAmount] = useState(0)
  const [createVoucer] = useCreateVoucherMutation()
  return (
    <div className="p-[2rem] h-full overflow-y-auto flex flex-col justify-between">
      <div>
        <h3 className="text-[2.5rem] text-primaryColor font-bold">Quản lý Vouchers</h3>
      </div>
      <div className="flex justify-between grow">
        <div className="w-[70%] h-full">
          <VoucherTable />
        </div>
        <div className="w-[calc(30%-_2rem)] border-solid border-[.1rem] border-gray-200 rounded-[.5rem] p-[1rem] flex flex-col gap-[1.5rem]">
          <h4 className="text-[1.8rem] text-orangeColor font-bold text-center">Tạo voucher</h4>

          <div className="w-full flex flex-col gap-[.75rem]">
            <label htmlFor="code" className="text-[1.6rem] text-primaryColor">
              Mã khuyễn mại
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
              }}
              className="text-[1.5rem] text-primaryColor outline-none border-orangeColor border-[.1rem] border-solid rounded-[1rem] p-[1rem]"
            />
          </div>
          <div className="w-full flex flex-col gap-[.75rem]">
            <label htmlFor="percent" className="text-[1.6rem] text-primaryColor">
              Giảm
            </label>
            <input
              type="number"
              id="percent"
              name="percent"
              value={sale}
              onChange={(e) => {
                setSale(e.target.value)
              }}
              className="text-[1.5rem] text-primaryColor outline-none border-orangeColor border-[.1rem] border-solid rounded-[1rem] p-[1rem]"
            />
          </div>
          <div className="w-full flex flex-col gap-[.75rem]">
            <label htmlFor="amount" className="text-[1.6rem] text-primaryColor">
              Cho đơn
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
              }}
              className="text-[1.5rem] text-primaryColor outline-none border-orangeColor border-[.1rem] border-solid rounded-[1rem] p-[1rem]"
            />
          </div>
          <div className="w-full flex flex-col gap-[.75rem]">
            <label htmlFor="from" className="text-[1.6rem] text-primaryColor">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              id="from"
              name="from"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value)
              }}
              className="text-[1.5rem] text-primaryColor outline-none border-orangeColor border-[.1rem] border-solid rounded-[1rem] p-[1rem]"
            />
          </div>
          <div className="w-full flex flex-col gap-[.75rem]">
            <label htmlFor="to" className="text-[1.6rem] text-primaryColor">
              Ngày kết thúc
            </label>
            <input
              type="date"
              id="to"
              name="to"
              value={to}
              onChange={(e) => {
                setTo(e.target.value)
              }}
              className="text-[1.5rem] text-primaryColor outline-none border-orangeColor border-[.1rem] border-solid rounded-[1rem] p-[1rem]"
            />
          </div>
          <button
            className="text-[1.6rem] text-white bg-orangeColor py-[1rem] px-[2rem] rounded-[.5rem]"
            onClick={async () => {
              if (code.length !== 10 || code.includes(' ')) {
                toast.error('Mã phải gồm 10 ký tự và không gồm khoảng trắng', {
                  position: 'top-center',
                  autoClose: 500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored',
                })
                return
              }
              if (sale > 1) {
                toast.error('tỷ lệ giảm phải nhỏ hơn 1', {
                  position: 'top-center',
                  autoClose: 500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored',
                })
                return
              }
              try {
                await createVoucer({
                  code,
                  startOn: from,
                  expiredOn: to,
                  value: sale,
                  apply_for: amount,
                }).unwrap()
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
              setCode('')
              setAmount(0)
              setSale(0)
            }}
          >
            Tạo voucher
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminVoucher
