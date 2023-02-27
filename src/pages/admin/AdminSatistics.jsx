import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  useGetStatisticSalesQuery,
  useGetStatisticOrdersQuery,
  useGetStatisticProductsQuery,
  useGetDailyStatisticQuery,
  useGetMonthlyStatisticQuery,
  useGetSaleReportExcelByDateQuery,
} from '../../features/apis/apiSlice'
import { toISODate } from '../../shared/FormatDate'
import { useState } from 'react'
import { FaShoppingBag, FaFileInvoice, FaUserAlt, FaArrowUp } from 'react-icons/fa'
import { SiMicrosoftexcel } from 'react-icons/si'
import { CSVLink } from 'react-csv'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const testData = [
  ['name', 'age', 'class'],
  ['long', '22', '10'],
  ['hieu', '16', 'a1'],
]
export const ProductsStatisticChart = () => {
  const [type, setType] = useState('day')
  const { data: dataList, isSuccess, isFetching } = useGetStatisticProductsQuery(type)
  let Render
  if (isFetching) {
    Render = (
      <div className="w-full h-full flex justify-center items-center text-[2rem] font-bold text-orangeColor">
        Loading...
      </div>
    )
  } else if (isSuccess) {
    let dataArr = [...dataList.result]
    dataArr.length = 5
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Top 5 sản phẩm bán chạy trong ${type === 'day' ? 'ngày' : 'tháng'}`,
        },
      },
    }
    const labels = dataArr.map((product) => {
      return product.product.name
    })
    const data = {
      labels,
      datasets: [
        {
          label: 'Số sản phẩm bán ra',
          data: dataArr.map((product) => {
            return product.amount
          }),
          backgroundColor: 'rgba(255, 131, 3, 0.5)',
        },
      ],
    }
    Render = <Bar options={options} data={data} />
  }
  return (
    <>
      <div className="flex justify-end">
        <select
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-[1.5rem] text-primaryColor outline-none"
        >
          <option value="day" className="text-[1.5rem] text-primaryColor ">
            Ngày
          </option>
          <option value="month" className="text-[1.5rem] text-primaryColor ">
            Tháng
          </option>
        </select>
      </div>
      <div className="w-[full] h-[40rem]">{Render}</div>
    </>
  )
}
export const SalesStatisticChart = () => {
  const [type, setType] = useState('day')
  const { data: sales, isSuccess: isSuccessSales, isFetching: isFetchingSales } = useGetStatisticSalesQuery(type)
  let Render
  if (isFetchingSales) {
    Render = (
      <div className="w-full h-full flex justify-center items-center text-[2rem] font-bold text-orangeColor">
        Loading...
      </div>
    )
  } else if (isSuccessSales) {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Thống kê doanh số ${type === 'day' ? 'ngày' : 'tháng năm 2023'}`,
        },
      },
    }
    const labels =
      type === 'day'
        ? sales.result?.map((sale) => toISODate(sale.date).substring(0, 5))
        : sales.result?.map((sale) => sale.date)
    const data = {
      labels,
      datasets: [
        {
          label: 'Doanh số',
          data: sales.result?.map((sale) => sale.amount),
          backgroundColor: 'rgba(255, 131, 3, 0.5)',
        },
      ],
    }
    Render = <Bar options={options} data={data} />
  }
  return (
    <>
      <div className="flex justify-end">
        <select
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-[1.5rem] text-primaryColor outline-none"
        >
          <option value="day" className="text-[1.5rem] text-primaryColor ">
            Ngày
          </option>
          <option value="month" className="text-[1.5rem] text-primaryColor ">
            Tháng
          </option>
        </select>
      </div>
      <div className="w-[full] h-[40rem]">{Render}</div>
    </>
  )
}
export const OrdersStatisticChart = () => {
  const [type, setType] = useState('day')
  const { data: sales, isSuccess: isSuccessSales, isFetching: isFetchingSales } = useGetStatisticOrdersQuery(type)
  let Render
  if (isFetchingSales) {
    Render = (
      <div className="w-full h-full flex justify-center items-center text-[2rem] font-bold text-orangeColor">
        Loading...
      </div>
    )
  } else if (isSuccessSales) {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Thống kê đơn hàng theo ${type === 'day' ? 'ngày' : 'tháng năm 2023'}`,
        },
      },
    }
    const labels =
      type === 'day'
        ? sales.result?.map((sale) => toISODate(sale.date).substring(0, 5))
        : sales.result?.map((sale) => sale.date)
    const data = {
      labels,
      datasets: [
        {
          label: 'Đơn thành công',
          data: sales.result?.map((sale) => sale.success),
          backgroundColor: 'rgba(255, 131, 3, 0.5)',
        },
        {
          label: 'Đơn không thành công',
          data: sales.result?.map((sale) => sale.rejected),
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
        },
      ],
    }
    Render = <Bar options={options} data={data} />
  }
  return (
    <>
      <div className="flex justify-end">
        <select
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-[1.5rem] text-primaryColor outline-none"
        >
          <option value="day" className="text-[1.5rem] text-primaryColor ">
            Ngày
          </option>
          <option value="month" className="text-[1.5rem] text-primaryColor ">
            Tháng
          </option>
        </select>
      </div>
      <div className="w-[full] h-[40rem]">{Render}</div>
    </>
  )
}
function AdminSatistics() {
  const [exportSaleStatistic, setExportSaleStatistic] = useState('day')
  const [exportProductStatistic, setExportProductStatistic] = useState('day')
  const [saleDate, setSaleDate] = useState(new Date().toISOString().substring(0, 10))
  const [productDate, setProductDate] = useState(new Date().toISOString().substring(0, 10))
  const [saleMonth, setSaleMonth] = useState(0)
  const [productMonth, setProductMonth] = useState(0)
  const [excelData, setExcelDate] = useState([])
  const {
    data: saleExcelDate,
    isFetching: isSaleExcelDateFetching,
    isSuccess: isSaleExcelDateSuccess,
  } = useGetSaleReportExcelByDateQuery(saleDate)
  const {
    data: dailyStatistic,
    isSuccess: isSuccessDailyStatistic,
    isFetching: isFetchingDailyStatistic,
  } = useGetDailyStatisticQuery()
  const {
    data: monthlySatistic,
    isSuccess: isSuccessMonthlyStatistic,
    isFetching: isFetchingMonthlyStatistic,
  } = useGetMonthlyStatisticQuery()
  let DailyStatisticRender
  let MonthlyStatisticRender
  if (isFetchingDailyStatistic) {
    DailyStatisticRender = (
      <div className="w-full grow flex justify-between">
        <div className="w-[calc((100%-_4rem)/3)] h-full rounded-[.5rem] border-solid border-gray-200 border-[.1rem] shadow-sm p-[1rem] flex flex-col justify-between animate-pulse"></div>
        <div className="w-[calc((100%-_4rem)/3)] h-full rounded-[.5rem] border-solid border-gray-200 border-[.1rem] shadow-sm p-[1rem] flex flex-col justify-between animate-pulse"></div>
        <div className="w-[calc((100%-_4rem)/3)] h-full rounded-[.5rem] border-solid border-gray-200 border-[.1rem] shadow-sm p-[1rem] flex flex-col justify-between animate-pulse"></div>
      </div>
    )
  } else if (isSuccessDailyStatistic) {
    const { amount, orderQuantity, newUser } = dailyStatistic.result
    DailyStatisticRender = (
      <div className="w-full grow flex justify-between">
        <div className="w-[calc((100%-_4rem)/3)] h-full rounded-[.5rem] border-solid border-gray-200 border-[.1rem] shadow-sm p-[1rem] flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <FaShoppingBag className="text-[2.8rem] text-blue-500" />
            {amount.amountYesterday === 0 ? (
              <FaArrowUp className="text-[2.8rem] font-bold text-green-500" />
            ) : amount.amountToday === 0 ? undefined : amount.amountToday >= amount.amountYesterday ? (
              <h3 className="text-[2.8rem] font-bold text-green-500">
                {'+' + ((amount.amountToday / amount.amountYesterday).toFixed(2) * 100 - 100) + '%'}
              </h3>
            ) : (
              <h3 className="text-[2.8rem] font-bold text-red-500">
                {'-' + (100 - (amount.amountToday / amount.amountYesterday).toFixed(2) * 100) + '%'}
              </h3>
            )}
          </div>
          <div className="text-[2.4rem] font-bold text-center">{amount.amountToday}</div>
          <div className="text-[1.6rem] text-grayColor text-center">Doanh số ngày</div>
        </div>
        <div className="w-[calc((100%-_4rem)/3)] h-full rounded-[.5rem] border-solid border-gray-200 border-[.1rem] shadow-sm p-[1rem] flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <FaFileInvoice className="text-[2.8rem] text-orangeColor" />
            {orderQuantity.yesterday === 0 ? (
              <FaArrowUp className="text-[2.8rem] font-bold text-green-500" />
            ) : orderQuantity.today === 0 ? undefined : orderQuantity.today >= orderQuantity.yesterday ? (
              <h3 className="text-[2.8rem] font-bold text-green-500">
                {'+' + ((orderQuantity.today / orderQuantity.yesterday).toFixed(2) * 100 - 100) + '%'}
              </h3>
            ) : (
              <h3 className="text-[2.8rem] font-bold text-red-500">
                {'-' + (100 - (orderQuantity.today / orderQuantity.yesterday).toFixed(2) * 100) + '%'}
              </h3>
            )}
          </div>
          <div className="text-[2.4rem] font-bold text-center">{orderQuantity.today}</div>
          <div className="text-[1.6rem] text-grayColor text-center">Số đơn hàng trong ngày</div>
        </div>
        <div className="w-[calc((100%-_4rem)/3)] h-full rounded-[.5rem] border-solid border-gray-200 border-[.1rem] shadow-sm p-[1rem] flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <FaUserAlt className="text-[2.8rem] text-yellow-500" />

            {newUser.today - newUser.yesterday >= 0 ? (
              <h3 className="text-[2.8rem] font-bold text-green-500">{'+' + (newUser.today - newUser.yesterday)}</h3>
            ) : (
              <h3 className="text-[2.8rem] font-bold text-red-500">{newUser.today - newUser.yesterday}</h3>
            )}
          </div>
          <div className="text-[2.4rem] font-bold text-center">{newUser.today}</div>
          <div className="text-[1.6rem] text-grayColor text-center">Khách hàng mới</div>
        </div>
      </div>
    )
  }

  if (isFetchingMonthlyStatistic) {
    MonthlyStatisticRender = <div className="w-full h-full bg-gray-200 animate-pulse"></div>
  } else if (isSuccessMonthlyStatistic) {
    const { successOrder, rejectedOrder, pendingOrder, shippingOrder } = monthlySatistic.result
    const totalOrder = successOrder + rejectedOrder + pendingOrder + shippingOrder
    if (totalOrder === 0)
      MonthlyStatisticRender = (
        <div className="w-full h-full flex justify-center items-center text-[1.8rem] italic text-orangeColor">
          {' '}
          Chưa có đơn nào trong tháng
        </div>
      )
    else {
      const data = {
        labels: ['Thành công', 'Đang vận chuyển', 'Đang xử lý', 'Đã hủy'],
        datasets: [
          {
            label: '# of Votes',
            data: [
              successOrder / totalOrder,
              shippingOrder / totalOrder,
              pendingOrder / totalOrder,
              rejectedOrder / totalOrder,
            ],
            backgroundColor: [
              'rgba(255, 131, 3, 0.5)',
              'rgba(59, 130, 246, 0.5)',
              'rgba(34, 197, 94, 0.5)',
              'rgba(152,157,166, 0.5)',
            ],
            borderColor: [
              'rgba(255, 131, 3, 1)',
              'rgba(59, 130, 246, 1)',
              'rgba(34, 197, 94, 1)',
              'rgba(152,157,166, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
      MonthlyStatisticRender = <Doughnut data={data} />
    }
  }
  let dataDate
  if (isSaleExcelDateFetching) dataDate = ['Mã đơn hàng', 'Tên khách hàng', 'Thanh toán']
  else if (isSaleExcelDateSuccess) {
    dataDate = [['Mã đơn hàng', 'Tên khách hàng', 'Thanh toán'], ...saleExcelDate.result]
  }
  return (
    <div className="w-full h-full p-[2rem] flex flex-col gap-[2rem]">
      <h3 className="text-[2.5rem] text-primaryColor font-bold">Thống kê</h3>
      <div className="grow flex gap-[2rem]">
        <div className="flex flex-col gap-[2rem] w-[65%] h-full">
          <div className="w-full  p-[1rem] border-solid border-gray-200 border-[.1rem] rounded-[.5rem] shadow-sm">
            <div className="flex gap-[2rem]">
              <NavLink
                to="/admin/statistics"
                className={({ isActive }) =>
                  isActive ? 'text-[1.5rem] text-orangeColor font-bold' : 'text-[1.5rem] text-primaryColor'
                }
                end
              >
                Doanh số
              </NavLink>
              <NavLink
                to="/admin/statistics/orders"
                className={({ isActive }) =>
                  isActive ? 'text-[1.5rem] text-orangeColor font-bold' : 'text-[1.5rem] text-primaryColor'
                }
              >
                Đơn hàng
              </NavLink>
              <NavLink
                to="/admin/statistics/products"
                className={({ isActive }) =>
                  isActive ? 'text-[1.5rem] text-orangeColor font-bold' : 'text-[1.5rem] text-primaryColor'
                }
              >
                Sản phẩm
              </NavLink>
            </div>
            <div>
              <Outlet />
            </div>
          </div>
          {DailyStatisticRender}
        </div>
        <div className="grow flex flex-col h-full border-solid border-gray-200 border-[.1rem] rounded-[.5rem] p-[1rem] shadow-sm">
          <div className="w-full h-[35rem]  gap-[1rem] border-solid border-gray-200 border-b-[.1rem]">
            <h3 className="text-[1.8rem] text-primaryColor font-bold text-center mb-[1rem]">Trạng thái đơn hàng</h3>
            <div className="w-full h-[30rem] flex justify-center items-center">{MonthlyStatisticRender}</div>
          </div>
          <div className="mt-[1rem] flex flex-col justify-between grow">
            <h3 className="text-[1.8rem] text-primaryColor font-bold text-center mb-[1rem]">Xuất báo cáo thống kê</h3>
            <div className="w-full">
              <div className="flex justify-between">
                <h4 className="text-[1.5rem] text-primaryColor">Thống kê doanh số</h4>
                <div className="flex gap-[1rem] items-center">
                  <input
                    type="radio"
                    id="daySale"
                    name="sale"
                    onChange={(e) => {
                      if (e.target.checked) setExportSaleStatistic('day')
                    }}
                    checked={exportSaleStatistic === 'day'}
                  />
                  <label htmlFor="daySale" className="text-[1.5rem] text-primaryColor">
                    Theo ngày
                  </label>
                </div>
                <div className="flex gap-[1rem] items-center">
                  <input
                    type="radio"
                    id="monthSale"
                    name="sale"
                    onChange={(e) => {
                      if (e.target.checked) setExportSaleStatistic('month')
                    }}
                    checked={exportSaleStatistic === 'month'}
                  />
                  <label htmlFor="monthSale" className="text-[1.5rem] text-primaryColor">
                    Theo tháng
                  </label>
                </div>
              </div>
              <div className="w-full flex justify-between mt-[1rem]">
                {exportSaleStatistic === 'day' ? (
                  <input
                    type="date"
                    value={saleDate}
                    className="text-[1.5rem] outline-none border-solid border-orangeColor border-b-[.1rem] bg-gray-100 px-[1rem]"
                    onChange={(e) => {
                      setSaleDate(e.target.value)
                    }}
                  />
                ) : (
                  <select
                    className="text-[1.5rem] outline-none border-orangeColor border-solid border-b-[.1rem] bg-gray-100 px-[1rem]"
                    onChange={(e) => {
                      setSaleMonth(e.target.value)
                    }}
                  >
                    <option value="1">Tháng 1</option>
                    <option value="2">Tháng 2</option>
                    <option value="3">Tháng 3</option>
                    <option value="3">Tháng 3</option>
                    <option value="5">Tháng 5</option>
                    <option value="6">Tháng 6</option>
                    <option value="7">Tháng 7</option>
                    <option value="8">Tháng 8</option>
                    <option value="9">Tháng 9</option>
                    <option value="10">Tháng 10</option>
                    <option value="11">Tháng 11</option>
                    <option value="12">Tháng 12</option>
                  </select>
                )}
                <CSVLink
                  data={
                    exportSaleStatistic === 'day'
                      ? isSaleExcelDateFetching
                        ? [['Mã đơn hàng', 'Khách hàng', 'Thanh toán']]
                        : [['Mã đơn hàng', 'Khách hàng', 'Thanh toán'], ...saleExcelDate.result]
                      : [['Mã đơn hàng', 'Khách hàng', 'Thanh toán']]
                  }
                  className="w-[10rem] text-[1.5rem] py-[.5rem] flex justify-center gap-[1rem] items-center text-white bg-green-500 rounded-[.5rem]"
                >
                  export <SiMicrosoftexcel className="text-[1.5rem]" />
                </CSVLink>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between">
                <h4 className="text-[1.5rem] text-primaryColor">Thống kê sản phẩm</h4>
                <div className="flex gap-[1rem] items-center">
                  <input
                    type="radio"
                    id="dayProduct"
                    name="product"
                    onChange={(e) => {
                      if (e.target.checked) setExportProductStatistic('day')
                    }}
                    checked={exportProductStatistic === 'day'}
                  />
                  <label htmlFor="dayProduct" className="text-[1.5rem] text-primaryColor">
                    Theo ngày
                  </label>
                </div>
                <div className="flex gap-[1rem] items-center">
                  <input
                    type="radio"
                    id="monthProduct"
                    name="product"
                    onChange={(e) => {
                      if (e.target.checked) setExportProductStatistic('month')
                    }}
                    checked={exportProductStatistic === 'month'}
                  />
                  <label htmlFor="monthProduct" className="text-[1.5rem] text-primaryColor">
                    Theo tháng
                  </label>
                </div>
              </div>
              <div className="w-full flex justify-between mt-[1rem]">
                {exportProductStatistic === 'day' ? (
                  <input
                    type="date"
                    className="text-[1.5rem] outline-none border-solid border-orangeColor border-b-[.1rem] bg-gray-100 px-[1rem]"
                    value={productDate}
                    onChange={(e) => {
                      setProductDate(e.target.value)
                    }}
                  />
                ) : (
                  <select
                    className="text-[1.5rem] outline-none border-orangeColor border-solid border-b-[.1rem] bg-gray-100 px-[1rem]"
                    onChange={(e) => {
                      setProductMonth(e.target.value)
                    }}
                  >
                    <option value="1">Tháng 1</option>
                    <option value="2">Tháng 2</option>
                    <option value="3">Tháng 3</option>
                    <option value="3">Tháng 3</option>
                    <option value="5">Tháng 5</option>
                    <option value="6">Tháng 6</option>
                    <option value="7">Tháng 7</option>
                    <option value="8">Tháng 8</option>
                    <option value="9">Tháng 9</option>
                    <option value="10">Tháng 10</option>
                    <option value="11">Tháng 11</option>
                    <option value="12">Tháng 12</option>
                  </select>
                )}
                <CSVLink
                  data={testData}
                  className="w-[10rem] text-[1.5rem] py-[.5rem] flex justify-center gap-[1rem] items-center text-white bg-green-500 rounded-[.5rem]"
                >
                  export <SiMicrosoftexcel className="text-[1.5rem]" />
                </CSVLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSatistics
