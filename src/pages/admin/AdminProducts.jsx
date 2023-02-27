import React, { useState, useRef, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import {
  useCreateGenreMutation,
  useGetAllGenreQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '../../features/apis/apiSlice'
import { useSearchParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddGenre = ({ open, setOpen }) => {
  const [createGenre] = useCreateGenreMutation()
  const [genreError, setGenreError] = useState('')
  const [genreName, setGenreName] = useState('')
  return (
    <div
      className={
        open
          ? 'w-screen h-screen fixed top-0 left-0 bg-primaryColor/70 flex justify-center items-center duration-200 ease-in-out'
          : 'w-screen h-screen fixed top-[50%] left-[50%] bg-primaryColor/70 flex justify-center items-center scale-0 duration-200 ease-in-out'
      }
    >
      <div className="w-[30%] h-[50%] bg-white rounded-[.5rem] p-[1rem] flex flex-col justify-between">
        <h3 className="text-[2.5rem] text-primary font-bold text-center">Thêm phân loại</h3>
        <div className="flex flex-col gap-[1rem]">
          <label htmlFor="genre" className="text-[1.6rem]">
            Tên phân loại
          </label>
          <input
            type="text"
            id="genre"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
            className="w-full outline-none text-[1.6rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
            placeholder="Nhập tên phân loại"
          />
          <span className="text-[1.5rem] text-red-500 italic">{genreError}</span>
        </div>

        <div className="flex justify-end gap-[1rem]">
          <button
            className="text-[1.6rem] text-white py-[1rem] px-[2rem] bg-orangeColor rounded-[.5rem]"
            onClick={async () => {
              if (!genreName.length) {
                setGenreError('Bạn chưa nhập tên phân loại')
                return
              }
              try {
                await createGenre({ name: genreName }).unwrap()
                setGenreName('')
                setGenreError('')
                setOpen(false)
              } catch (error) {
                console.log(error)
                setGenreError(error.data.passage)
              }
            }}
          >
            Lưu
          </button>
          <button
            className="text-[1.6rem] py-[1rem] px-[2rem] rounded-[.5rem] border-solid border-primaryColor border-[.1rem]"
            onClick={() => {
              setGenreError('')
              setGenreName('')
              setOpen(false)
            }}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  )
}
const AddProduct = ({ open, setOpen }) => {
  const [createProduct] = useCreateProductMutation()
  const { data: genres, isSuccess: isSuccessGenres } = useGetAllGenreQuery()
  const [errorStr, setErrorStr] = useState('')
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [originalPrice, setOriginalPrice] = useState(0)
  const [salePrice, setSalePrice] = useState(0)
  const [genreId, setGenreId] = useState(0)
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
          setImageURL(result.info.url)
        }
      },
    )
  }, [])

  return (
    <div
      className={
        open
          ? 'w-screen h-screen fixed top-0 left-0 bg-primaryColor/50 flex justify-center items-center duration-200 ease-in-out'
          : 'w-screen h-screen fixed top-[50%] left-[50%] bg-primaryColor/50 flex justify-center items-center scale-0 duration-200 ease-in-out'
      }
    >
      <div className="bg-white w-[50%] h-[90%] flex flex-col justify-between items-center rounded-[.5rem] p-[1rem]">
        <h3 className="text-[2.5rem] text-primaryColor font-bold">Thêm sản phẩm</h3>
        <div className="w-full flex flex-col gap-[1rem]">
          <div className="w-full flex flex-col">
            <label htmlFor="name" className="text-[1.5rem] text-primaryColor">
              Tên sản phẩm
            </label>
            <input
              type="text"
              value={name}
              id="name"
              onChange={(e) => {
                setName(e.target.value)
              }}
              className="w-[60%] outline-none text-[1.5rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          {isSuccessGenres && (
            <div className="w-full flex gap-[2rem]">
              <label htmlFor="genre" className="text-[1.5rem] text-primaryColor">
                Phân loại
              </label>
              <select
                name="genre"
                id="genre"
                value={genreId}
                className="text-[1.5rem] outline-none w-[20%] bg-gray-200 rounded-[.5rem]"
                onChange={(e) => {
                  console.log('genre: ', e.target.value)
                  setGenreId(e.target.value)
                }}
              >
                {genres.result?.map((genre) => (
                  <option value={genre._id} key={genre._id} className="text-[1.3rem] text-primaryColor">
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-between">
            <div className="flex flex-col w-[60%]">
              <label htmlFor="" className="text-[1.5rem] text-primaryColor">
                Ảnh
              </label>
              <input
                type="text"
                value={imageURL}
                placeholder="Thêm ảnh cho sản phẩm"
                onChange={(e) => {
                  setImageURL(e.target.value)
                }}
                className="w-full outline-none text-[1.5rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
              />
            </div>
            <div className="flex justify-center items-end w-[40%]">
              <button
                className="flex-none text-[1.5rem] cursor-pointer py-[.5rem] px-[1rem] border-[.1rem] border-solid border-primaryColor rounded-[1rem]"
                onClick={() => widgetRef.current.open()}
              >
                Tải ảnh lên
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[calc(50%-_1rem)]">
              <label htmlFor="originalPrice" className="text-[1.5rem] text-primaryColor">
                Giá gốc
              </label>
              <input
                type="text"
                value={originalPrice}
                onChange={(e) => {
                  setOriginalPrice(e.target.value)
                }}
                className="w-full outline-none text-[1.5rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
              />
            </div>
            <div className="w-[calc(50%-_1rem)]">
              <label htmlFor="originalPrice" className="text-[1.5rem] text-primaryColor">
                Giá bán
              </label>
              <input
                type="text"
                value={salePrice}
                onChange={(e) => {
                  setSalePrice(e.target.value)
                }}
                className="w-full outline-none text-[1.5rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="desc" className="text-[1.5rem] text-primaryColor">
              Mô tả
            </label>
            <textarea
              name="desc"
              id="desc"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value)
              }}
              className="resize-none w-full outline-none text-[1.5rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
            ></textarea>
          </div>
        </div>
        <div className="w-full text-[1.5rem] italic text-red-500 text-left">{errorStr}</div>
        <div className="flex gap-[1rem] justify-end w-full">
          <button
            className="text-[1.6rem] text-white py-[1rem] px-[2rem] bg-orangeColor rounded-[.5rem]"
            onClick={async () => {
              try {
                await createProduct({
                  name,
                  imageURL,
                  genre: genreId,
                  desc,
                  sale_price: salePrice,
                  original_price: originalPrice,
                }).unwrap()
                setName('')
                setDesc('')
                setImageURL('')
                setSalePrice(0)
                setGenreId('')
                setErrorStr('')
                setOriginalPrice('')
                setOpen(false)
                toast.success('Thêm sản phẩm thành công', {
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
                setErrorStr(error.data.passage)
              }
            }}
          >
            Thêm
          </button>
          <button
            className="text-[1.6rem] py-[1rem] px-[2rem] rounded-[.5rem] border-solid border-primaryColor border-[.1rem]"
            onClick={() => {
              setName('')
              setDesc('')
              setImageURL('')
              setSalePrice(0)
              setGenreId('')
              setErrorStr('')
              setOriginalPrice('')
              setOpen(false)
            }}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  )
}
const UpdateProduct = ({ open, setOpen, product }) => {
  const [updateProduct] = useUpdateProductMutation()
  const { data: genres, isSuccess: isSuccessGenres } = useGetAllGenreQuery()
  const [errorStr, setErrorStr] = useState('')
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [originalPrice, setOriginalPrice] = useState(0)
  const [salePrice, setSalePrice] = useState(0)
  const [genreId, setGenreId] = useState('')
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  console.log(product)
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
          setImageURL(result.info.url)
        }
      },
    )
  }, [])
  useEffect(() => {
    if (product) {
      setName(product.name)
      setDesc(product.desc)
      setOriginalPrice(product.original_price)
      setSalePrice(product.sale_price)
      setGenreId(product.genre._id)
      setImageURL(product.imageURL)
    }
  }, [product])

  return (
    <>
      {product ? (
        <div
          className={
            open
              ? 'w-screen h-screen fixed top-0 left-0 bg-primaryColor/50 flex justify-center items-center duration-200 ease-in-out'
              : 'w-screen h-screen fixed top-[50%] left-[50%] bg-primaryColor/50 flex justify-center items-center scale-0 duration-200 ease-in-out'
          }
        >
          <div className="bg-white w-[50%] h-[90%] flex flex-col justify-between items-center rounded-[.5rem] p-[1rem]">
            <h3 className="text-[2.5rem] text-primaryColor font-bold">Thêm sản phẩm</h3>
            <div className="w-full flex flex-col gap-[1rem]">
              <div className="w-full flex flex-col">
                <label htmlFor="name" className="text-[1.5rem] text-primaryColor">
                  Sửa sản phẩm
                </label>
                <input
                  type="text"
                  value={name}
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  className="w-[60%] outline-none text-[1.5rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              {isSuccessGenres && (
                <div className="w-full flex gap-[2rem]">
                  <label htmlFor="genre" className="text-[1.5rem] text-primaryColor">
                    Phân loại
                  </label>
                  <select
                    name="genre"
                    id="genre"
                    value={genreId}
                    className="text-[1.5rem] outline-none w-[20%] bg-gray-200 rounded-[.5rem]"
                    onChange={(e) => {
                      console.log('genre: ', e.target.value)
                      setGenreId(e.target.value)
                    }}
                  >
                    {genres.result?.map((genre) => (
                      <option value={genre._id} key={genre._id} className="text-[1.3rem] text-primaryColor">
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex justify-between">
                <div className="flex flex-col w-[60%]">
                  <label htmlFor="" className="text-[1.5rem] text-primaryColor">
                    Ảnh
                  </label>
                  <input
                    type="text"
                    value={imageURL}
                    placeholder="Thêm ảnh cho sản phẩm"
                    onChange={(e) => {
                      setImageURL(e.target.value)
                    }}
                    className="w-full outline-none text-[1.5rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
                  />
                </div>
                <div className="flex justify-center items-end w-[40%]">
                  <button
                    className="flex-none text-[1.5rem] cursor-pointer py-[.5rem] px-[1rem] border-[.1rem] border-solid border-primaryColor rounded-[1rem]"
                    onClick={() => widgetRef.current.open()}
                  >
                    Tải ảnh lên
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[calc(50%-_1rem)]">
                  <label htmlFor="originalPrice" className="text-[1.5rem] text-primaryColor">
                    Giá gốc
                  </label>
                  <input
                    type="text"
                    value={originalPrice}
                    onChange={(e) => {
                      setOriginalPrice(e.target.value)
                    }}
                    className="w-full outline-none text-[1.5rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
                  />
                </div>
                <div className="w-[calc(50%-_1rem)]">
                  <label htmlFor="originalPrice" className="text-[1.5rem] text-primaryColor">
                    Giá bán
                  </label>
                  <input
                    type="text"
                    value={salePrice}
                    onChange={(e) => {
                      setSalePrice(e.target.value)
                    }}
                    className="w-full outline-none text-[1.5rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="desc" className="text-[1.5rem] text-primaryColor">
                  Mô tả
                </label>
                <textarea
                  name="desc"
                  id="desc"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value)
                  }}
                  className="resize-none w-full outline-none text-[1.5rem] focus:border-orangeColor border-solid border-b-[.1rem] focus:border-b-[.3rem] border-orangeColor/30 p-[1rem]"
                ></textarea>
              </div>
            </div>
            <div className="w-full text-[1.5rem] italic text-red-500 text-left">{errorStr}</div>
            <div className="flex gap-[1rem] justify-end w-full">
              <button
                className="text-[1.6rem] text-white py-[1rem] px-[2rem] bg-orangeColor rounded-[.5rem]"
                onClick={async () => {
                  try {
                    await updateProduct({
                      id: product._id,
                      name,
                      imageURL,
                      genre: genreId,
                      desc,
                      sale_price: salePrice,
                      original_price: originalPrice,
                    }).unwrap()
                    setName('')
                    setDesc('')
                    setImageURL('')
                    setSalePrice(0)
                    setGenreId('')
                    setErrorStr('')
                    setOriginalPrice('')
                    setOpen(false)
                    toast.success('Sửa sản phẩm thành công', {
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
                    setErrorStr(error.data.passage)
                  }
                }}
              >
                Sửa
              </button>
              <button
                className="text-[1.6rem] py-[1rem] px-[2rem] rounded-[.5rem] border-solid border-primaryColor border-[.1rem]"
                onClick={() => {
                  setOpen(false)
                }}
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      ) : undefined}
    </>
  )
}

function AdminProducts() {
  const [deleteProduct] = useDeleteProductMutation()
  const [openAddGenre, setOpenAddGenre] = useState(false)
  const [openAddProduct, setOpenAddProduct] = useState(false)
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false)
  const [needUpdateProduct, setNeedUpdateProduct] = useState()
  const [genre, setGenre] = useState('all')
  const [searchKey, setSearchKey] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1)
  const searchRef = useRef()
  const { data: products, isFetching: isFetchingProducts, isSuccess: isSuccessProducts } = useGetAllProductsQuery()
  const { data: genres, isSuccess: isSuccessGenres } = useGetAllGenreQuery()
  useEffect(() => {
    setSearchParams({ genre, key: searchParams.get('key') || [], page: searchParams.get('page') || [] })
    if (searchKey !== '')
      setSearchParams({ genre: searchParams.get('genre') || [], key: searchKey, page: searchParams.get('page') || [] })
    else setSearchParams({ genre, page: searchParams.get('page') || [] })
  }, [genre, searchKey])
  let ProductsTableRender
  if (isFetchingProducts)
    ProductsTableRender = (
      <div className="w-full h-[50rem] flex justify-center items-center text-[2rem] text-orangeColor font-bold">
        Loading...
      </div>
    )
  else if (isSuccessProducts) {
    let filterProducts = [...products.results]
    filterProducts = filterProducts.filter((product) => {
      if (searchParams.get('key') && !searchParams.get('genre')) return product.name.includes(searchParams.get('key'))
      if (searchParams.get('key') && searchParams.get('genre')) {
        if (searchParams.get('genre') === 'all') return product.name.includes(searchParams.get('key'))
        return product.genre.name === searchParams.get('genre') && product.name.includes(searchParams.get('key'))
      }

      if (searchParams.get('genre') && !searchParams.get('key')) {
        if (searchParams.get('genre') === 'all') return true
        return product.genre.name === searchParams.get('genre')
      }
      return true
    })
    if (!filterProducts.length)
      ProductsTableRender = (
        <div className="text-[1.8rem] text-orangeColor font-bold flex justify-center items-center h-[10rem]">
          Không có sản phẩm nào
        </div>
      )
    else {
      let maxPage = Math.ceil(filterProducts.length / 7)
      ProductsTableRender = (
        <div className="grow">
          <div className="min-h-[70%]">
            <table className="w-full table-fixed">
              <tr className="bg-yellowColor">
                <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Mã sản phẩm</th>
                <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem] w-[15%]">Tên sản phẩm</th>
                <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem] w-[10%]">Giá gốc</th>
                <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem] w-[10%]">Giá bán</th>
                <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Phân loại</th>
                <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem]">Ảnh</th>
                <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem] w-[20%]">Mô tả</th>
                <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem] w-[5%]"></th>
                <th className="text-[1.5rem] text-primaryColor font-bold py-[1rem] w-[5%]"></th>
              </tr>
              {filterProducts.map((product, index) => {
                if (index >= currentPage * 7 || index < (currentPage - 1) * 7) return
                return (
                  <tr className={index % 2 ? 'bg-gray-100' : null}>
                    <td className="text-[1.5rem] p-[1rem]">{product._id.slice(0, 10)}...</td>
                    <td className="text-[1.5rem] p-[1rem]">{product.name}</td>
                    <td className="text-[1.5rem] p-[1rem]">{product.original_price}</td>
                    <td className="text-[1.5rem] p-[1rem]">{product.sale_price}</td>
                    <td className="text-[1.5rem] p-[1rem]">{product.genre ? product.genre.name : undefined}</td>
                    <td className="text-[1.5rem] p-[1rem]">{product.imageURL.slice(0, 10)}...</td>
                    <td className="text-[1.5rem] p-[1rem]">{product.desc.slice(0, 50)}...</td>
                    <td className="text-[1.5rem] p-[1rem]">
                      <button
                        className="text-blue-500"
                        onClick={() => {
                          setNeedUpdateProduct(product)
                          setOpenUpdateProduct(true)
                        }}
                      >
                        Sửa
                      </button>
                    </td>
                    <td className="text-[1.5rem] p-[1rem]">
                      <button
                        className="text-red-500"
                        onClick={async () => {
                          try {
                            await deleteProduct({ productId: product._id }).unwrap()
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
                      </button>
                    </td>
                  </tr>
                )
              })}
            </table>
          </div>
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
                  setSearchParams({
                    page: currentPage - 1,
                    genre: searchParams.get('genre') || [],
                    key: searchParams.get('key') || [],
                  })
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
                      setSearchParams({
                        page: pageValue,
                        genre: searchParams.get('genre') || [],
                        key: searchParams.get('key') || [],
                      })
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
                  setSearchParams({
                    page: currentPage + 1,
                    genre: searchParams.get('genre') || [],
                    key: searchParams.get('key') || [],
                  })
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

  return (
    <div className="p-[2rem] flex justify-between h-full">
      <div className="w-[75%] flex flex-col">
        <div className="w-full flex justify-between mb-[2rem]">
          <h3 className="text-[2.5rem] text-primaryColor font-bold">Danh sách sản phẩm</h3>
          <div className="w-[30%] relative">
            <input
              type="text"
              className="w-full outline-none border-none py-[.5rem] px-[1rem] bg-gray-100 text-[1.6rem]"
              placeholder="Tìm kiếm sản phẩm"
              ref={searchRef}
            />
            <FaSearch
              className="absolute right-[1rem] top-[50%] text-orangeColor text-[1.6rem] translate-y-[-50%] cursor-pointer"
              onClick={() => {
                setSearchKey(searchRef.current.value)
              }}
            />
          </div>
        </div>
        {ProductsTableRender}
      </div>
      <div className="w-[calc(25%-_2rem)] flex flex-col gap-[2rem]">
        <div>
          {isSuccessGenres && (
            <div className="w-full flex flex-col gap-[2rem] bg-orangeColor py-[1rem] px-[.5rem] rounded-[.5rem]">
              <label htmlFor="genre" className="text-[1.6rem] text-white text-center ">
                Phân loại
              </label>
              <select
                name="genre"
                id="genre"
                value={genre}
                className="text-[1.6rem] outline-none w-[100%] text-center bg-white text-orangeColor py-[1rem] rounded-[.5rem]"
                onChange={(e) => {
                  setGenre(e.target.value)
                }}
              >
                <option value="all" className="text-[1.3rem] text-orangeColor">
                  Tất cả
                </option>
                {genres.result?.map((genre) => (
                  <option value={genre.name} key={genre._id} className="text-[1.3rem] text-orangeColor">
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button
          className="w-full bg-orangeColor py-[1rem] text-[1.6rem] text-white rounded-[.5rem]"
          onClick={() => setOpenAddGenre(true)}
        >
          Thêm phân loại
        </button>
        <button
          className="w-full bg-orangeColor py-[1rem] text-[1.6rem] text-white rounded-[.5rem]"
          onClick={() => setOpenAddProduct(true)}
        >
          Thêm sản phẩm
        </button>
      </div>
      <AddGenre open={openAddGenre} setOpen={setOpenAddGenre} />
      <AddProduct open={openAddProduct} setOpen={setOpenAddProduct} />
      <UpdateProduct open={openUpdateProduct} setOpen={setOpenUpdateProduct} product={needUpdateProduct} />
      <ToastContainer />
    </div>
  )
}

export default AdminProducts
