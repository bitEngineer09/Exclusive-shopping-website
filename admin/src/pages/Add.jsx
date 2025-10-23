import React, { useContext, useState } from 'react';
import Nav from '../components/nav/Nav';
import SideBar from '../components/nav/SideBar';
import { ImImage } from "react-icons/im";
import { productDataContext } from '../store/ProductContext';
import { Leapfrog } from 'ldrs/react'
import 'ldrs/react/Leapfrog.css'


const Add = () => {

  // USE STATES
  const [loading, setLoading] = useState(false);

  // CONTEXT DATA 
  const {
    name, setName,
    description, setDescription,
    price, setPrice,
    category, setCategory,
    subCategory, setSubCategory,
    sizes, setSizes,
    bestSeller, setBestSeller,
    
    image1, setImage1,
    image2, setImage2,
    image3, setImage3,
    image4, setImage4,

    setBackendImage1,
    setBackendImage2,
    setBackendImage3,
    setBackendImage4,

    handleAddProduct, clearFormData

  } = useContext(productDataContext);

  console.log(category);
  console.log(subCategory);
  console.log(sizes);

  return (
    <div className="addPage w-full min-h-screen">

      {/* NAVBAR */}
      <Nav />

      {/* MAIN CONTAINER */}
      <div className='w-full min-h-screen flex flex-col lg:flex-row'>

        {/* SIDEBAR */}
        <SideBar />

        {/* RIGHT CONTENT */}
        <div
          className="
            addContent
            flex-1 h-full
            py-4 sm:py-6 lg:py-8
            px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
            bg-stone-950
            overflow-y-auto
          ">
          {/* HEADING */}
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-stone-300'>Add products</h1>

          {/* FORM DATA */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await handleAddProduct();
              setLoading(false);
              clearFormData();
            }}
            className="imageUpload mt-6 sm:mt-8 lg:mt-12 flex flex-col gap-6 sm:gap-8 lg:gap-12">

            {/* IMAGE UPLOAD */}
            <div className="imageContainer flex flex-col gap-4 sm:gap-6 lg:gap-8">
              <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-stone-300'>Upload Images</h2>
              <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
                <div>
                  {/* IMAGE 1 */}
                  <label htmlFor="image1" className='cursor-pointer'>
                    {
                      image1
                        ? <img src={URL.createObjectURL(image1)} alt="preview" className='w-full aspect-square object-cover rounded-lg' />
                        : <div
                          className='bg-stone-900 p-8 sm:p-12 lg:p-16 rounded-lg flex items-center justify-center aspect-square'>
                          <ImImage className='text-4xl sm:text-5xl lg:text-6xl text-stone-300' />
                        </div>
                    }
                  </label>
                  <input
                    onChange={(e) => {
                      setImage1(e.target.files[0]);
                      setBackendImage1(e.target.files[0]);
                    }}
                    type="file"
                    id="image1"
                    required
                    name="image1"
                    className='hidden'
                  />
                </div>

                <div>
                  {/* IMAGE 2 */}
                  <label htmlFor="image2" className='cursor-pointer'>
                    {
                      image2
                        ? <img src={URL.createObjectURL(image2)} alt="preview" className='w-full aspect-square object-cover rounded-lg' />
                        : <div
                          className='bg-stone-900 p-8 sm:p-12 lg:p-16 rounded-lg flex items-center justify-center aspect-square'>
                          <ImImage className='text-4xl sm:text-5xl lg:text-6xl text-stone-300' />
                        </div>
                    }
                  </label>
                  <input
                    onChange={(e) => {
                      setImage2(e.target.files[0]);
                      setBackendImage2(e.target.files[0]);
                    }}
                    type="file"
                    id="image2"
                    required
                    name="image2"
                    className='hidden'
                  />
                </div>

                <div>
                  {/* IMAGE 3 */}
                  <label htmlFor="image3" className='cursor-pointer'>
                    {
                      image3
                        ? <img src={URL.createObjectURL(image3)} alt="preview" className='w-full aspect-square object-cover rounded-lg' />
                        : <div
                          className='bg-stone-900 p-8 sm:p-12 lg:p-16 rounded-lg flex items-center justify-center aspect-square'>
                          <ImImage className='text-4xl sm:text-5xl lg:text-6xl text-stone-300' />
                        </div>
                    }
                  </label>
                  <input
                    onChange={(e) => {
                      setImage3(e.target.files[0]);
                      setBackendImage3(e.target.files[0]);
                    }}
                    type="file"
                    id="image3"
                    required
                    name="image3"
                    className='hidden'
                  />
                </div>

                <div>
                  {/* IMAGE 4 */}
                  <label htmlFor="image4" className='cursor-pointer'>
                    {
                      image4
                        ? <img src={URL.createObjectURL(image4)} alt="preview" className='w-full aspect-square object-cover rounded-lg' />
                        : <div
                          className='bg-stone-900 p-8 sm:p-12 lg:p-16 rounded-lg flex items-center justify-center aspect-square'>
                          <ImImage className='text-4xl sm:text-5xl lg:text-6xl text-stone-300' />
                        </div>
                    }
                  </label>
                  <input
                    onChange={(e) => {
                      setImage4(e.target.files[0]);
                      setBackendImage4(e.target.files[0]);
                    }}
                    type="file"
                    id="image4"
                    name="image4"
                    required
                    className='hidden'
                  />
                </div>
              </div>
            </div>


            {/* PRODUCT DETAILS */}
            <div className="productDetails flex flex-col gap-6 sm:gap-8 lg:gap-12">
              <div className="productName flex flex-col w-full lg:w-3/4 xl:w-1/2">
                <label
                  htmlFor="productName"
                  className='
                    text-lg sm:text-xl md:text-2xl text-stone-300
                  '>Product Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="productName"
                  name="productName"
                  value={name}
                  required
                  className="
                    productInput
                    bg-stone-900 h-12 sm:h-14 md:h-16 lg:h-20 mt-2 sm:mt-3 lg:mt-4
                    text-stone-300 text-base sm:text-lg md:text-xl
                    px-4 sm:px-6 lg:px-8 rounded-lg
                  "/>
              </div>

              {/* PRODUCT DESCRIPTION */}
              <div className="productDescription flex flex-col">
                <label
                  htmlFor="productDescription"
                  className='
                    text-lg sm:text-xl md:text-2xl text-stone-300
                  '>Product Description</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  name=""
                  id="productDescription"
                  value={description}
                  className='
                    w-full lg:w-3/4 xl:w-1/2
                    h-32 sm:h-40 md:h-48 lg:h-56
                    mt-2 sm:mt-3 lg:mt-4
                    p-4 sm:p-6 lg:p-8
                    bg-stone-900 rounded-lg
                    text-base sm:text-lg md:text-xl text-stone-300
                  '>
                </textarea>
              </div>

              {/* PRODUCT CATEGORY & SUB-CATEGORY */}
              <div className="category w-full lg:w-3/4 xl:w-1/2 flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-12">

                {/* CATEGORY */}
                <div className='w-full sm:w-1/2'>
                  <p className='text-lg sm:text-xl md:text-2xl text-stone-300 mb-2 sm:mb-3 lg:mb-4'>Product Category</p>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    name=""
                    id=""
                    className='
                    w-full h-12 sm:h-14 md:h-16
                    bg-stone-900 text-base sm:text-lg md:text-xl text-stone-300
                    rounded-lg px-3 sm:px-4
                    '>
                    <option value="Men" className='text-sm sm:text-base'>Men</option>
                    <option value="Women" className='text-sm sm:text-base'>Women</option>
                    <option value="Kids" className='text-sm sm:text-base'>Kids</option>
                  </select>
                </div>

                {/* SUB-CATEGORY */}
                <div className='w-full sm:w-1/2'>
                  <p className='text-lg sm:text-xl md:text-2xl text-stone-300 text-nowrap mb-2 sm:mb-3 lg:mb-4'>Sub-Category</p>
                  <select
                    onChange={(e) => setSubCategory(e.target.value)}
                    required
                    name=""
                    id=""
                    className='
                    w-full h-12 sm:h-14 md:h-16
                    bg-stone-900 text-base sm:text-lg md:text-xl text-stone-300
                    rounded-lg px-3 sm:px-4
                    '>
                    <option value="TopWear" className='text-sm sm:text-base'>TopWear</option>
                    <option value="BottomWear" className='text-sm sm:text-base'>BottomWear</option>
                    <option value="WinterWear" className='text-sm sm:text-base'>WinterWear</option>
                  </select>
                </div>
              </div>


              {/* PRODUCT PRICE */}
              <div className="price w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col">
                <label
                  htmlFor="price"
                  className='
                    text-lg sm:text-xl md:text-2xl text-stone-300
                  '>Product Price</label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  id="price"
                  required
                  name="price"
                  value={price}
                  className='
                    productInput
                    bg-stone-900 h-12 sm:h-14 md:h-16 lg:h-20 mt-2 sm:mt-3 lg:mt-4
                    text-stone-300 text-base sm:text-lg md:text-xl
                    px-4 sm:px-6 lg:px-8 rounded-lg
                  '/>

              </div>


              {/* PRODUCT SIZE */}
              <div className="productSize">
                <p
                  className='
                    text-lg sm:text-xl md:text-2xl text-stone-300
                  '>Product Size</p>
                <div className="sizeContainer mt-3 sm:mt-4 lg:mt-6 flex flex-wrap gap-3 sm:gap-4 lg:gap-8">
                  <div
                    onClick={() => setSizes((prev) => prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"])}
                    className={`
                        hover:border-2 hover:border-zinc-500
                        w-16 h-14 sm:w-20 sm:h-16 lg:w-22 lg:h-20
                        text-stone-300 text-base sm:text-lg md:text-xl
                        bg-stone-900 rounded-lg
                        flex items-center justify-center
                        cursor-pointer
                        transition-all duration-200
                        ${sizes.includes("S") ? "border-2 border-zinc-400" : ""}
                        `}>S</div>

                  <div
                    onClick={() => setSizes((prev) => prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"])}
                    className={`
                        hover:border-2 hover:border-zinc-500
                        w-16 h-14 sm:w-20 sm:h-16 lg:w-22 lg:h-20
                        text-stone-300 text-base sm:text-lg md:text-xl
                        bg-stone-900 rounded-lg
                        flex items-center justify-center
                        cursor-pointer
                        transition-all duration-200
                        ${sizes.includes("M") ? "border-2 border-zinc-400" : ""}
                        `}>M</div>

                  <div
                    onClick={() => setSizes((prev) => prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"])}
                    className={`
                        hover:border-2 hover:border-zinc-500
                        w-16 h-14 sm:w-20 sm:h-16 lg:w-22 lg:h-20
                        text-stone-300 text-base sm:text-lg md:text-xl
                        bg-stone-900 rounded-lg
                        flex items-center justify-center
                        cursor-pointer
                        transition-all duration-200
                        ${sizes.includes("XL") ? "border-2 border-zinc-400" : ""}
                        `}>XL</div>

                  <div
                    onClick={() => setSizes((prev) => prev.includes("XXL") ? prev.filter((item) => item !== "XXL") : [...prev, "XXL"])}
                    className={`
                        hover:border-2 hover:border-zinc-500
                        w-16 h-14 sm:w-20 sm:h-16 lg:w-22 lg:h-20
                        text-stone-300 text-base sm:text-lg md:text-xl
                        bg-stone-900 rounded-lg
                        flex items-center justify-center
                        cursor-pointer
                        transition-all duration-200
                        ${sizes.includes("XXL") ? "border-2 border-zinc-400" : ""}
                        `}>XXL</div>

                  <div
                    onClick={() => setSizes((prev) => prev.includes("XXXL") ? prev.filter((item) => item !== "XXXL") : [...prev, "XXXL"])}
                    className={`
                        hover:border-2 hover:border-zinc-500
                        w-20 h-14 sm:w-24 sm:h-16 lg:w-26 lg:h-20
                        text-stone-300 text-base sm:text-lg md:text-xl
                        bg-stone-900 rounded-lg
                        flex items-center justify-center
                        cursor-pointer
                        transition-all duration-200
                        ${sizes.includes("XXXL") ? "border-2 border-zinc-400" : ""}
                        `}>XXXL</div>
                </div>
              </div>
            </div>


            {/* CHECK BOX */}
            <div className="bestSeller flex items-center gap-3 sm:gap-4 text-base sm:text-lg md:text-xl lg:text-2xl text-stone-300">
              <input
                onChange={(e) => setBestSeller(e.target.checked)}
                type="checkbox"
                checked={bestSeller}
                id="bestSeller"
                className='bestSeller w-5 h-5 sm:w-6 sm:h-6 cursor-pointer'
              />
              <label htmlFor="bestSeller" className='cursor-pointer'>Add to Bestseller</label>
            </div>

            {/* ADD BUTTON */}
            <button
              type="submit"
              className='
              flex items-center justify-center
              w-full sm:w-64 md:w-72 lg:w-80
              h-14 sm:h-16 md:h-20 lg:h-24
              text-base sm:text-lg md:text-xl lg:text-2xl text-stone-300
              rounded-lg bg-emerald-700
              cursor-pointer
              hover:bg-white hover:text-stone-900
              transition ease-in-out duration-150
              '>
              {
                loading
                  ? <Leapfrog
                    size="25"
                    speed="2.5"
                    color="white"
                  /> : "Add Product"
              }

            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add