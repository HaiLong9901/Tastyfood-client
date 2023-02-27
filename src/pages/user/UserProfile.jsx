import React, { useEffect, useRef } from 'react'
import { USER_DEFAULT_AVATAR } from '../../shared/Constants'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, updateCredentials } from '../../features/auth/authSlice'
import { useGetUserQuery } from '../../features/apis/apiSlice'
import { useUpdateInfoMutation } from '../../features/apis/apiSlice'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function UserProfile() {
  const dispatch = useDispatch()
  const [updateInfo] = useUpdateInfoMutation()
  const { id, imageURL } = useSelector(selectCurrentUser)
  const [imageURLCloudinary, setImageURLCloudinary] = useState(imageURL)
  const { data: user, isSuccess: isSuccessUser, isFetching: isFetchingUser } = useGetUserQuery()
  const [name, setName] = useState('')
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'do7sbasez',
        uploadPreset: 'xnafd3oe',
      },
      (error, result) => {
        if (result.event === 'success') {
          console.log(result)
          setImageURLCloudinary(result.info.url)
        }
      },
    )
  }, [imageURL])

  let Profile
  if (isFetchingUser)
    Profile = (
      <div className="px-[2rem] py-[1rem] min-h-[70vh] flex justify-center items-center">
        <h2 className="text-[4rem] font-bold text-orangeColor">...Loading</h2>
      </div>
    )
  else if (isSuccessUser) {
    Profile = (
      <div className="px-[2rem] py-[1rem] min-h-[70vh]">
        <div className="w-full border-b-solid border-b-[.1rem] border-b-primaryColor pb-[1rem]">
          <h2 className="text-[1.6rem] font-bold">Hồ sơ của tôi</h2>
          <h4 className="text-[1.6rem]">Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
        </div>
        <div className="h-[40vh]">
          <div className="h-full w-full flex flex-col lg:flex-row items-center justify-center">
            <div className="flex flex-col gap-[2rem] py-[2rem] pr-[2rem] w-full lg:w-[60%] border-solid border-primaryColor lg:border-r-[.1rem]">
              <div className="flex justify-between">
                <label htmlFor="name" className="text-[1.6rem] text-primaryColor">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder={name.length ? name : user.result.name}
                  className="w-[30rem] outline-none border-solid border-[.1rem] border-primaryColor rounded-[.5rem] p-[.5rem] text-[1.6rem]"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="phone" className="text-[1.6rem] text-primaryColor">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phone"
                  value={user.result.phone}
                  disabled
                  className="w-[30rem] outline-none border-solid border-[.1rem] border-primaryColor rounded-[.5rem] p-[.5rem] text-[1.6rem]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-[full] lg:w-[40%] gap-[2rem]">
              <div className="w-[10rem] h-[10rem] lg:w-[15rem] lg:h-[15rem] rounded-[50%] overflow-hidden">
                <img src={imageURLCloudinary || USER_DEFAULT_AVATAR} alt="avt" className="w-full h-full object-cover" />
              </div>
              <div>
                <button
                  className="text-[1.6rem] cursor-pointer py-[1rem] px-[2rem] border-[.1rem] border-solid border-primaryColor rounded-[1rem]"
                  onClick={() => widgetRef.current.open()}
                >
                  Tải ảnh lên
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center lg:justify-start">
            <button
              onClick={async (e) => {
                try {
                  e.preventDefault()
                  await updateInfo({ id, imageURL: imageURLCloudinary, name }).unwrap()
                  dispatch(updateCredentials({ imageURL: imageURLCloudinary }))
                  toast.success('Cập nhật thông tin thành công', {
                    position: 'top-center',
                    autoClose: 1000,
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
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                  })
                  console.log(error)
                }
              }}
              className="text-[1.6rem] text-white bg-orangeColor rounded-[1rem] py-[1rem] px-[2rem] min-w-[10rem]"
            >
              Lưu
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  }
  return <>{Profile}</>
}

export default UserProfile
