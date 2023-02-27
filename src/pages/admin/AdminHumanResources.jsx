import {
  useGetAdminListQuery,
  useCreateAdminAccountMutation,
  useGetAdminAccountQuery,
  useRemoveAdminAccountMutation,
  useUpdateAdminAccountMutation,
} from '../../features/apis/apiSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { FaChevronRight, FaChevronLeft, FaUserEdit } from 'react-icons/fa'
const CreateAdminAccountBox = ({ open, setOpen }) => {
  const [createAdminAccount] = useCreateAdminAccountMutation()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const formik = useFormik({
    initialValues: {
      adminName: '',
      adminPhone: '',
    },
    validationSchema: Yup.object({
      adminName: Yup.string().required('Nhập tên quản lý'),
      adminPhone: Yup.string()
        .required('Bạn chưa nhập số điện thoại')
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
    }),
    onSubmit: async (values) => {
      console.log(values)
      try {
        await createAdminAccount({
          name: values.adminName,
          phone: values.adminPhone,
          password: values.adminPhone,
        }).unwrap()
        setOpen(false)
        formik.values.adminName = ''
        formik.values.adminPhone = ''
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
    },
  })
  return (
    <div className={open ? 'formBoxOpen' : 'formBoxClose'}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
        className="bg-white w-[30%] h-[60%] rounded-[.5rem] flex flex-col justify-between items-center p-[1rem]"
      >
        <h3 className="text-[2rem] text-primaryColor font-bold">Tạo tài khoản quản lý</h3>
        <div className="w-full flex flex-col gap-[1rem]">
          <label htmlFor="adminName" className="text-[1.6rem] text-primaryColor">
            Họ và tên
          </label>
          <input
            type="text"
            id="adminName"
            name="adminName"
            value={formik.values.adminName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-[1.6rem] w-full outline-none border-grayColor border-solid border-[.1rem] py-[.5rem] px-[1rem] rounded-[.5rem]"
          />
          <span className="text-[1.3rem] italic text-red-500">
            {formik.touched.adminName && formik.errors.adminName ? formik.errors.adminName : null}
          </span>
        </div>
        <div className="w-full flex flex-col gap-[1rem]">
          <label htmlFor="adminPhone" className="text-[1.6rem] text-primaryColor">
            Số điện thoại
          </label>
          <input
            type="text"
            id="adminPhone"
            name="adminPhone"
            // value={adminPhone}
            // onChange={(e) => {
            //   setAdminPhone(e.target.value)
            // }}
            value={formik.values.adminPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-[1.6rem] w-full outline-none border-grayColor border-solid border-[.1rem] py-[.5rem] px-[1rem] rounded-[.5rem]"
          />
          <span className="text-[1.3rem] italic text-red-500">
            {formik.touched.adminPhone && formik.errors.adminPhone ? formik.errors.adminPhone : null}
          </span>
        </div>
        <p className="text-[1.5rem] italic text-grayColor">
          <strong className="text-[1.5rem] text-red-500 pr-[2rem]">*</strong>
          Mật khẩu của tài khoản sẽ là số điện thoại của quản lý, quản lý sẽ thay đổi mật khẩu sau khi đăng nhập vào tài
          khoản
        </p>
        <div className="flex flex-row-reverse justify-between w-full">
          <button
            className="text-[1.6rem] text-white py-[1rem] px-[2rem] bg-orangeColor rounded-[5rem]"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Tạo tài khoản
          </button>
          <span
            className="text-[1.6rem] text-grayColor py-[1rem] px-[2rem] rounded-[5rem] border-solid border-[.1rem] border-grayColor cursor-pointer"
            onClick={() => {
              setOpen(false)
              formik.values.adminName = ''
              formik.values.adminPhone = ''
            }}
          >
            Quay lại
          </span>
        </div>
      </form>
    </div>
  )
}
const AdminTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: adminList, isFetching: isFetchingAdminList, isSuccess: isSuccessAdminList } = useGetAdminListQuery()
  const [removeAdminAccount] = useRemoveAdminAccountMutation()
  let AdminTableRender
  if (isFetchingAdminList) {
    AdminTableRender = <div className="w-full h-full text-[2rem] italic text-orangeColor">Loading...</div>
  } else if (isSuccessAdminList) {
    if (!adminList.result.length) {
      AdminTableRender = (
        <div>
          <div className="w-full h-full text-[2rem] italic text-orangeColor">Không tìm thấy tài khoản nào</div>
        </div>
      )
    } else {
      let maxPage = Math.ceil(adminList.result.length / 8)
      AdminTableRender = (
        <>
          <table className="w-full table-fixed">
            <tr className="bg-yellowColor w-full">
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Id</th>
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Họ và tên</th>
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Số điện thoại</th>
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Tạo ngày</th>
              <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Hành động</th>
            </tr>
            {adminList.result?.map((acc, index) => {
              if (index >= currentPage * 12 || index < (currentPage - 1) * 8) return
              return (
                <tr className={index % 2 ? 'bg-gray-100' : null} key={acc._id}>
                  <td className="text-[1.5rem] p-[1rem] text-center">{acc._id.substring(0, 10)}...</td>
                  <td className="text-[1.5rem] p-[1rem] text-center">{acc.name}</td>
                  <td className="text-[1.5rem] p-[1rem] text-center">{acc.phone}</td>
                  <td className="text-[1.5rem] p-[1rem] text-center">{new Date(acc.createdAt).toLocaleDateString()}</td>
                  <td
                    className="text-[1.5rem] p-[1rem] text-center text-red-500 cursor-pointer"
                    onClick={async () => {
                      try {
                        await removeAdminAccount({ id: acc._id }).unwrap()
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
        </>
      )
    }
  }
  return <>{AdminTableRender}</>
}
function AdminHumanResources() {
  const [openCreateAccBox, setOpenCreateAccBox] = useState(false)
  const [updateAdminAccount] = useUpdateAdminAccountMutation()
  const { data: myAcc, isSuccess: isSuccessMyAcc, isFetching: isFetchingMyAcc } = useGetAdminAccountQuery()
  let name
  if (isFetchingMyAcc) {
    name = ''
  } else if (isSuccessMyAcc) {
    name = myAcc.result.name
  }
  const formik = useFormik({
    initialValues: {
      name: name,
      password: '',
      confirm: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nhập tên quản lý'),
      password: Yup.string().required('Bạn chưa nhập mật khẩu').min(8, 'Mật khẩu phải gồm ít nhất 8 kí tự'),
      confirm: Yup.string().required('Bạn phải nhập xác nhận mật khẩu'),
    }),
    onSubmit: async (values) => {
      try {
        await updateAdminAccount({
          ...values,
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
    },
  })
  return (
    <div className="flex gap-[2rem]">
      <div className="w-[70%] max-h-screen p-[2rem] overflow-y-auto flex flex-col gap-[2rem]">
        <div className="flex justify-between">
          <h3 className="text-[2.5rem] font-bold text-primaryColor">Quản lý tài khoản quản lý</h3>
          <button
            className="text-[1.6rem] text-white bg-orangeColor px-[2rem] py-[1rem] rounded-[5rem]"
            onClick={() => setOpenCreateAccBox(true)}
          >
            Thêm tài khoản quản lý
          </button>
        </div>
        <div className="w-full grow flex flex-col justify-between">
          <AdminTable />
        </div>
      </div>
      <form
        className="grow p-[2rem] border-solid border-orangeColor border-l-[.1rem] h-screen flex flex-col gap-[2rem] items-center"
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <div className="w-full flex flex-col items-center gap-[2rem]">
          <FaUserEdit className="text-[3rem] text-primaryColor" />
          <h3 className="text-[2rem] text-primaryColor font-bold">Tài khoản của tôi</h3>
        </div>

        <div className="w-full flex flex-col gap-[1rem]">
          <label htmlFor="name" className="text-[1.6rem] text-primaryColor">
            Họ tên
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-[1.6rem] text-primaryColor w-full py-[.5rem] px-[1rem] outline-none border-solid border-grayColor border-[.1rem] rounded-[.5rem]"
          />
          <span className="text-[1.3rem] italic text-red-500">
            {formik.touched.name && formik.errors.name ? formik.errors.name : null}
          </span>
        </div>
        <div className="w-full flex flex-col gap-[1rem]">
          <label htmlFor="phone" className="text-[1.6rem] text-primaryColor">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={isSuccessMyAcc && myAcc.result.phone}
            disabled
            className="text-[1.6rem] text-primaryColor w-full py-[.5rem] px-[1rem] outline-none border-solid border-grayColor border-[.1rem] rounded-[.5rem]"
          />
        </div>
        <div className="w-full flex flex-col gap-[1rem]">
          <label htmlFor="password" className="text-[1.6rem] text-primaryColor">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-[1.6rem] text-primaryColor w-full py-[.5rem] px-[1rem] outline-none border-solid border-grayColor border-[.1rem] rounded-[.5rem]"
          />
          <span className="text-[1.3rem] italic text-red-500">
            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
          </span>
        </div>
        <div className="w-full flex flex-col gap-[1rem]">
          <label htmlFor="confirm" className="text-[1.6rem] text-primaryColor">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id="confirm"
            name="confirm"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-[1.6rem] text-primaryColor w-full py-[.5rem] px-[1rem] outline-none border-solid border-grayColor border-[.1rem] rounded-[.5rem]"
          />
          <span className="text-[1.3rem] italic text-red-500">
            {formik.touched.confirm && formik.errors.confirm ? formik.errors.confirm : null}
          </span>
        </div>
        <div className="w-full flex justify-center">
          <button className="text-[1.6rem] text-white py-[1rem] px-[4rem] rounded-[5rem] bg-orangeColor" type="submit">
            Cập nhật
          </button>
        </div>
      </form>
      <CreateAdminAccountBox open={openCreateAccBox} setOpen={setOpenCreateAccBox} />
      <ToastContainer />
    </div>
  )
}
export default AdminHumanResources
