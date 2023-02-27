import React from 'react'
import { useState } from 'react'
import UserAdressBox from '../../components/user/UserAdressBox'
import {
  useGetAllDistrictQuery,
  useGetAllWardQuery,
  useUpdateAddressMutation,
  useGetUserQuery,
} from '../../features/apis/apiSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function UserAdress() {
  const [updateAddress] = useUpdateAddressMutation()
  const [addAddressForm, setAddAddressForm] = useState(false)
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [districtId, setDistrictId] = useState(271)
  const [location, setLocation] = useState('')
  const [missingLocation, setMissingLocation] = useState(false)
  const { data: districts, isSuccess: districtsSuccess } = useGetAllDistrictQuery()
  const handleOpenAddAddressForm = () => {
    setAddAddressForm(!addAddressForm)
  }
  const handleSubmitAddress = async () => {
    if (location.length) {
      try {
        setLocation('')
        setAddAddressForm(false)
        setMissingLocation(false)
        const newAddress = location + ', ' + ward + ', ' + district + ', Hà Nội'
        console.log(newAddress)
        await updateAddress({
          address: newAddress,
        }).unwrap()
        toast.success('Thêm địa chỉ thành công', {
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
      return
    }
    setMissingLocation(true)
  }
  const { data: wards, isSuccess: wardsSuccess } = useGetAllWardQuery(districtId)
  const { data: user, isSuccess: isSuccessUser, isFetching: isFetchingUser } = useGetUserQuery()
  let AddressList
  if (isFetchingUser) AddressList = <div>Loading</div>
  else if (isSuccessUser)
    if (!user.result.address.length)
      AddressList = <div className="text-[1.6rem] italic text-grayColor">Bạn chưa có địa chỉ nào</div>
    else
      AddressList = (
        <div>
          {user.result.address?.map((a, index) => (
            <UserAdressBox
              name={user.result.name}
              phone={user.result.phone}
              address={a.address}
              key={index}
              id={a.id}
            />
          ))}
        </div>
      )
  return (
    <div className="px-[2rem] py-[1rem] min-h-[70vh]">
      <div className="w-full border-b-solid border-b-[.1rem] border-b-primaryColor pb-[1rem] flex justify-between items-center">
        <h2 className="text-[2rem] font-bold">Địa chỉ của tôi</h2>
        <button
          className="text-[1.6rem] font-bold text-white py-[1rem] px-[3rem] bg-orangeColor rounded-[1rem]"
          onClick={handleOpenAddAddressForm}
        >
          Thêm địa chỉ
        </button>
      </div>
      <div className="py-[2rem] flex flex-col gap-[2rem]">
        <ToastContainer />
        <h2 className="text-[1.6rem] text-primaryColor">Địa chỉ</h2>
        <div>{AddressList}</div>
      </div>

      <div
        className={
          !addAddressForm
            ? 'bg-primaryColor/70 w-screen h-screen border-box absolute top-0 left-0 flex justify-center items-center translate-y-[-100%] duration-300 ease-in-out'
            : 'bg-primaryColor/70 w-screen h-screen border-box absolute top-0 left-0 flex justify-center items-center translate-y-[0] duration-300 ease-in-out'
        }
      >
        <div className="w-[60%] lg:w-[50%] h-[30%] lg:h-[60%] bg-white flex flex-wrap gap-[2%] p-[2%] rounded-[.5rem]">
          <div className="w-[47%] h-[10rem]">
            <label htmlFor="city" className="text-[1.6rem] text-primaryColor font-bold">
              Thành phố
            </label>
            <input
              type="text"
              value="Hà Nội"
              disabled
              id="city"
              className="w-full p-[1rem] outline-none border-grayColor border-solid border-[.1rem] text-[1.6rem] rounded-[.5rem]"
            />
          </div>
          <div className="w-[47%]">
            <label htmlFor="phone" className="text-[1.6rem] text-primaryColor font-bold">
              Số điện thoại
            </label>
            <input
              type="text"
              value="0123456789"
              disabled
              id="phone"
              className="w-full p-[1rem] outline-none border-grayColor border-solid border-[.1rem] text-[1.6rem] rounded-[.5rem]"
            />
          </div>
          <div className="w-[47%]">
            <label htmlFor="district" className="text-[1.6rem] text-primaryColor font-bold">
              Quận/huyện
            </label>
            <select
              name="district"
              id="district"
              value={districtId}
              onChange={(e) => {
                setDistrictId(e.target.value)
                setDistrict(districts.results?.filter((dist) => dist.district_id == e.target.value)[0].district_name)
              }}
              className="w-full p-[1rem] outline-none border-grayColor border-solid border-[.1rem] text-[1.6rem] rounded-[.5rem]"
            >
              {districtsSuccess && districts.results
                ? districts.results.map((dist) => (
                    <option key={dist.district_id} value={dist.district_id} className="text-[1.3rem]">
                      {dist.district_name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="w-[47%]">
            <label htmlFor="ward" className="text-[1.6rem] text-primaryColor font-bold">
              Xã/phường
            </label>
            <select
              name="ward"
              id="ward"
              value={ward}
              // disabled
              onChange={(e) => setWard(e.target.value)}
              className="w-full p-[1rem] outline-none border-grayColor border-solid border-[.1rem] text-[1.6rem] rounded-[.5rem]"
            >
              {wardsSuccess && wards.results
                ? wards.results.map((w) => (
                    <option key={w.ward_id} value={w.ward_name} className="text-[1.3rem]">
                      {w.ward_name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="w-[96%]">
            <label
              htmlFor="location"
              className="text-[1.6rem] text-primaryColor font-bold after:content-['*'] after:text-[1.6rem] after:text-red-500 after:ml-[1rem]"
            >
              Địa chỉ cụ thể
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-[1rem] outline-none border-grayColor border-solid border-[.1rem] text-[1.6rem] rounded-[.5rem]"
            />
          </div>
          <h4 className={missingLocation ? 'text-[1.5rem] text-red-500 italic' : 'hidden'}>
            Bạn cần điền địa chỉ cụ thể
          </h4>
          <div className="w-[96%] ">
            <div className="flex justify-end gap-[2rem]">
              <button
                className="text-[1.6rem] text-white px-[2rem] py-[1rem] rounded-[.5rem] bg-grayColor"
                onClick={handleOpenAddAddressForm}
              >
                Quay lại
              </button>
              <button
                className="text-[1.6rem] text-white px-[2rem] py-[1rem] rounded-[.5rem] bg-orangeColor"
                onClick={handleSubmitAddress}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAdress
