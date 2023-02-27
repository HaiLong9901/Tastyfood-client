import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Wrapper from '../components/common/Wrapper'
import { GiTomato } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../features/apis/authApiSlice'

function Register() {
  const [register] = useRegisterMutation()
  const [errorRegister, setErrorRegister] = useState('')
  const navigate = useNavigate()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      password: '',
      confirmPass: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nhập tên tài khoản'),
      phone: Yup.string().required('Bạn chưa nhập số điện thoại').matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
      password: Yup.string().required('Bạn chưa nhập mật khẩu').min(8, 'Mật khẩu phải gồm ít nhất 8 kí tự'),
      confirmPass: Yup.string().required('Bạn phải nhập xác nhận mật khẩu'),
    }),
    onSubmit: async (values) => {
      console.log(values)
      try {
        if (values.password !== values.confirmPass) {
          setErrorRegister('ConfirmPass password is not incorrected')
          return
        }
        await register({ ...values }).unwrap()
        navigate('/login')
      } catch (error) {
        console.log(error.data.passage)
        setErrorRegister(error.data.passage)
      }
    },
  })
  // console.log(formik.values)
  return (
    <div className="bg-orangeColor">
      <Wrapper>
        <div className="flex justify-center lg:justify-between items-center min-h-screen">
          <div className="hidden lg:block w-[50%]">
            <div className="flex items-center">
              <span className="text-[6rem] text-white font-logoFont">TastyF</span>
              <div className="flex items-baseline">
                <GiTomato className="text-[6rem] text-red-600" />
                <GiTomato className="text-[6rem] text-red-600" />
              </div>
              <span className="text-[6rem] text-white font-logoFont">d</span>
            </div>
            <h3 className="text-white text-[5rem] font-dancingScript mt-[2rem]">"Trải nghiệm vô tận..."</h3>
          </div>
          <div className="lg:w-[45%] w-full md:w-[75%]">
            <div className="p-[2rem] border-basic rounded-[1rem] w-full aspect-square bg-white flex flex-col justify-evenly">
              <h1 className="text-center text-blueColor text-[3rem] font-bold uppercase">ĐĂNG KÝ</h1>
              <div>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[2rem]">
                  <div className="flex flex-col gap-[1rem] items-start">
                    <label className="text-whiteColor text-[1.6rem] font-bold text-left" htmlFor="name">
                      Tên tài khoản
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      id="name"
                      className="text-[1.6rem] text-primaryColor w-full outline-none py-[1rem] px-[1rem] bg-white border-orangeColor border-solid border-[.1rem] rounded-[5rem]"
                    />
                    <span className="text-red-500 text-[1.3rem] italic">
                      {formik.touched.name && formik.errors.name ? formik.errors.name : null}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[1rem] items-start">
                    <label className="text-whiteColor text-[1.6rem] font-bold text-left" htmlFor="phone">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      name="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      id="phone"
                      className="text-[1.6rem] text-primaryColor w-full outline-none py-[1rem] px-[1rem] bg-white border-orangeColor border-solid border-[.1rem] rounded-[5rem]"
                    />
                    <span className="text-red-500 text-[1.3rem] italic">
                      {formik.touched.phone && formik.errors.phone ? formik.errors.phone : null}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[1rem] items-start">
                    <label className="text-whiteColor text-[1.6rem] font-bold text-left" htmlFor="password">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="text-[1.6rem] text-primaryColor w-full outline-none py-[1rem] px-[1rem] bg-white border-orangeColor border-solid border-[.1rem] rounded-[5rem]"
                    />
                    <span className="text-red-500 text-[1.3rem] italic">
                      {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[1rem] items-start">
                    <label className="text-whiteColor text-[1.6rem] font-bold text-left" htmlFor="confirmPass">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      id="confirmPass"
                      type="password"
                      name="confirmPass"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPass}
                      className="text-[1.6rem] text-primaryColor w-full outline-none py-[1rem] px-[1rem] bg-white border-orangeColor border-solid border-[.1rem] rounded-[5rem]"
                    />
                    <span className="text-red-500 text-[1.3rem] italic">
                      {formik.touched.confirmPass && formik.errors.confirmPass ? formik.errors.confirmPass : null}
                    </span>
                  </div>
                  <span className="text-red-500 text-[1.3rem] italic">{errorRegister}</span>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full text-white text-[1.6rem] py-[1rem] bg-orangeColor rounded-[2rem]"
                  >
                    Đăng ký
                  </button>
                </form>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Register
