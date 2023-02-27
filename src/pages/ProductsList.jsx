import React, { useState, useEffect } from 'react'
import Wrapper from '../components/common/Wrapper'
import { useGetAllProductsQuery, useGetAllGenreQuery } from '../features/apis/apiSlice'
import ProductCard from '../components/product/ProductCard'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'

function ProductsList() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [searchParams, setSearchParams] = useSearchParams()
  const [openFilterBox, setOpenFilterBox] = useState(false)
  const { data: productsList, isSuccess: isSuccessList, isFetching: isFetchingList } = useGetAllProductsQuery()
  const { data: genreList, isSuccess: isSuccessGenreList } = useGetAllGenreQuery()
  const sort = parseInt(searchParams.get('sort_by'))
  const genreId = searchParams.get('genre')
  let ProductsList
  if (isFetchingList) {
    ProductsList = (
      <>
        {Array.apply(undefined, Array(8)).map((value, index) => (
          <div
            key={index}
            className="md:w-[22rem] w-[16rem] aspect-[3/4] animate-pulse bg-gray-200 rounded-[.5rem]"
          ></div>
        ))}
      </>
    )
  } else if (isSuccessList) {
    let list = productsList.results
    if (sort) {
      let sortList = [...list]
      if (sort === 0) list = sortList.sort((product1, product2) => product2.sale_price - product1.sale_price)
      else if (sort === 1) list = sortList.sort((product1, product2) => product1.sale_price - product2.sale_price)
      else if (sort === 2)
        list = sortList.sort(
          (product1, product2) =>
            product1.sale_price / product1.original_price - product2.sale_price / product2.original_price,
        )
    }
    if (genreId) {
      let genreSortList = [...list]
      list = genreSortList.filter((product) => {
        return product.genre._id === genreId
      })
      console.log('filter: ', list)
    }

    if (list.length === 0) {
      ProductsList = (
        <div className="w-full h-[50vh] flex justify-center items-center text-[2rem] italic text-orangeColor font-bold">
          Không có sản phẩm nào thuộc bộ lọc
        </div>
      )
    } else
      ProductsList = (
        <>
          {list?.map((product) => (
            <ProductCard key={product.key} {...product} />
          ))}
        </>
      )
  }
  return (
    <Wrapper>
      <div className="flex my-[5rem] justify-between flex-col-reverse lg:flex-row gap-[2rem]">
        <div className="flex flex-wrap content-start w-full lg:w-[80%] gap-[3rem] md:gap-[4rem] lg:gap-[2rem]">
          {ProductsList}
        </div>
        <div className="w-full lg:w-[18%]">
          <div className="p-[.5rem] border-orangeColor border-solid border-[.1rem] rounded-[.5rem] bg-yellowColor">
            <div className="flex justify-between items-center">
              <h3 className="text-[1.6rem]">Lọc sản phẩm</h3>
              <div onClick={() => setOpenFilterBox(!openFilterBox)} className="cursor-pointer">
                {openFilterBox ? <FaAngleDown className="text-[2rem]" /> : <FaAngleRight className="text-[2rem]" />}
              </div>
            </div>
            {openFilterBox ? (
              <div className="flex flex-col gap-[2rem] my-[2rem]">
                <div className="">
                  <h3 className="text-[1.3rem] font-bold text-secondaryColor my-[.5rem]">Sắp xếp</h3>
                  <select
                    name=""
                    id=""
                    className="w-full p-[.5rem] text-[1.5rem] outline-none rounded-[.5rem] text-secondaryColor"
                    onChange={(e) => {
                      console.log(e.target.value)
                      setSearchParams({ sort_by: e.target.value })
                    }}
                  >
                    <option className="text-[1.5rem]" value="0">
                      Giá cao đến thấp
                    </option>
                    <option className="text-[1.5rem]" value="1">
                      Giá thấp đến cao
                    </option>
                    <option className="text-[1.5rem]" value="2">
                      Giảm giá nhiều
                    </option>
                  </select>
                </div>
                <div>
                  <h3 className="text-[1.3rem] font-bold text-secondaryColor my-[.5rem]">Loại sản phẩm</h3>
                  <div className="bg-white p-[.5rem] rounded-[.5rem] flex flex-wrap gap-[.5rem] max-h-[20rem] overflow-auto scrollbar">
                    {isSuccessGenreList &&
                      genreList.result?.map((genre) => (
                        <span
                          key={genre._id}
                          className="text-[1.3rem] text-white bg-secondaryColor py-[.5rem] px-[1rem] cursor-pointer rounded-[.5rem]"
                          onClick={() => setSearchParams({ genre: genre._id })}
                        >
                          {genre.name}
                        </span>
                      ))}
                    <span
                      className="text-[1.3rem] text-white bg-secondaryColor py-[.5rem] px-[1rem] cursor-pointer rounded-[.5rem]"
                      onClick={() => setSearchParams({ genre: [] })}
                    >
                      Tất cả sản phẩm
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Wrapper>
    // <SuccessBox title="Thanh cong" />
  )
}

export default ProductsList
