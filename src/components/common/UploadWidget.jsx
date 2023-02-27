import { useRef, useEffect } from 'react'

function UploadWidget() {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'do7sbasez',
        uploadPreset: 'xnafd3oe',
      },
      (error, result) => console.log(result),
    )
  }, [])
  return (
    <button
      className="text-[1.6rem] cursor-pointer py-[1rem] px-[2rem] border-[.1rem] border-solid border-primaryColor rounded-[1rem]"
      onClick={() => widgetRef.current.open()}
    >
      Tải ảnh lên
    </button>
  )
}

export default UploadWidget
