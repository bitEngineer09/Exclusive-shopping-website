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
    <div className="addPage w-full h-screen">

      {/* NAVBAR */}
      <Nav />

      {/* MAIN CONTAINER */}
      <div className='w-full h-screen flex'>

        {/* SIDEBAR */}
        <SideBar />

        {/* RIGHT CONTENT */}
        <div
          className="
            addContent
            flex-1 h-full
            py-[1rem] px-[5rem]
          bg-[#0C0A09]
            overflow-y-auto
          ">
          {/* HEADING */}
          <h1 className='text-[6rem] font-medium text-(--text-secondary)'>Add products</h1>

          {/* FORM DATA */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await handleAddProduct();
              setLoading(false);
              clearFormData();
            }}
            className="imageUpload mt-[2rem] flex flex-col gap-[3rem]">

            {/* IMAGE UPLOAD */}
            <div className="imageContainer flex flex-col gap-[2rem]">
              <h2 className='text-[2rem] text-(--text-secondary)'>Upload Images</h2>
              <div className='flex gap-[3rem]'>
                <div>
                  {/* IMAGE 1 */}
                  <label htmlFor="image1" className='cursor-pointer'>
                    {
                      image1
                        ? <img src={URL.createObjectURL(image1)} alt="preview" className='size-[20rem] object-cover' />
                        : <div
                          className='bg-[#1C1917] p-[4rem] rounded-[1rem]'>
                          <ImImage className='text-[5rem] text-(--text-secondary)' />
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
                        ? <img src={URL.createObjectURL(image2)} alt="preview" className='size-[20rem] object-cover' />
                        : <div
                          className='bg-[#1C1917] p-[4rem] rounded-[1rem]'>
                          <ImImage className='text-[5rem] text-(--text-secondary)' />
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
                        ? <img src={URL.createObjectURL(image3)} alt="preview" className='size-[20rem] object-cover' />
                        : <div
                          className='bg-[#1C1917] p-[4rem] rounded-[1rem]'>
                          <ImImage className='text-[5rem] text-(--text-secondary)' />
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
                        ? <img src={URL.createObjectURL(image4)} alt="preview" className='size-[20rem] object-cover' />
                        : <div
                          className='bg-[#1C1917] p-[4rem] rounded-[1rem]'>
                          <ImImage className='text-[5rem] text-(--text-secondary)' />
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
            <div className="productDetails flex flex-col gap-[3rem]">
              <div className="productName flex flex-col w-[50%] h-[9rem]">
                <label
                  htmlFor="productName"
                  className='
                    text-[2rem] text-(--text-secondary)
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
                    bg-[#1C1917] h-[100%] mt-[1rem]
                    text-(--text-secondary) text-[1.7rem]
                    p-[1rem_2rem] rounded-[1rem]
                  "/>
              </div>

              {/* PRODUCT DESCRIPTION */}
              <div className="productDescription flex flex-col">
                <label
                  htmlFor="productDescription"
                  className='
                    text-[2rem] text-(--text-secondary)
                  '>Product Description</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  name=""
                  id="productDescription"
                  value={description}
                  className='
                    w-[50%] h-[14rem]
                    mt-[1rem] p-[2rem]
                    bg-[#1C1917] rounded-[1rem]
                    text-[1.7rem] text-(--text-secondary)
                  '>
                </textarea>
              </div>

              {/* PRODUCT CATEGORY & SUB-CATEGORY */}
              <div className="category w-[50%] h-[8rem] flex gap-[3rem] ">

                {/* CATEGORY */}
                <div className='w-[25%] h-full'>
                  <p className='text-[2rem] text-(--text-secondary)'>Product Category</p>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    name=""
                    id=""
                    className='
                    mt-[1rem]
                    w-full h-[60%]
                    bg-[#1C1917] text-[1.6rem] text-(--text-secondary)
                    rounded-[1rem] px-[1rem]
                    '>
                    <option value="Men" className='text-[1.3rem]'>Men</option>
                    <option value="Women" className='text-[1.3rem]'>Women</option>
                    <option value="Kids" className='text-[1.3rem]'>Kids</option>
                  </select>
                </div>

                {/* SUB-CATEGORY */}
                <div className='w-[25%] h-full'>
                  <p className='text-[2rem] text-(--text-secondary) text-nowrap'>Sub-Category</p>
                  <select
                    onChange={(e) => setSubCategory(e.target.value)}
                    required
                    name=""
                    id=""
                    className='
                    mt-[1rem]
                    w-full h-[60%]
                    bg-[#1C1917] text-[1.6rem] text-(--text-secondary)
                    rounded-[1rem] px-[1rem]
                    '>
                    <option value="TopWear" className='text-[1.3rem]'>TopWear</option>
                    <option value="BottomWear" className='text-[1.3rem]'>BottomWear</option>
                    <option value="WinterWear" className='text-[1.3rem]'>WinterWear</option>
                  </select>
                </div>
              </div>


              {/* PRODUCT PRICE */}
              <div className="price w-[10%] mt-[1rem] flex flex-col">
                <label
                  htmlFor="price"
                  className='
                    text-[2rem] text-(--text-secondary)
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
                    bg-[#1C1917] h-[100%] mt-[1rem]
                    text-(--text-secondary) text-[1.7rem]
                    p-[1rem_2rem] rounded-[1rem]
                  '/>

              </div>


              {/* PRODUCT SIZE */}
              <div className="productSize mt-[1rem]">
                <p
                  className='
                    text-[2rem] text-(--text-secondary)
                  '>Product Size</p>
                <div className="sizeContainer mt-[1rem] flex gap-[2rem]">
                  <div
                    onClick={() => setSizes((prev) => prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"])}
                    className={`
                        hover:border-[2px] hover:border-zinc-500
                        w-[5.5rem] h-[5rem]
                        text-(--text-secondary) text-[1.7rem]
                        bg-[#1C1917] rounded-[1rem]
                        flex items-center justify-center
                        cursor-pointer
                        ${sizes.includes("S") ? "border-[2px] border-zinc-400" : ""}
                        `}>S</div>

                  <div
                    onClick={() => setSizes((prev) => prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"])}
                    className={`
                        hover:border-[2px] hover:border-zinc-500
                        w-[5.5rem] h-[5rem]
                        text-(--text-secondary) text-[1.7rem]
                        bg-[#1C1917] rounded-[1rem]
                        flex items-center justify-center
                        cursor-pointer
                        ${sizes.includes("M") ? "border-[2px] border-zinc-400" : ""}
                        `}>M</div>

                  <div
                    onClick={() => setSizes((prev) => prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"])}
                    className={`
                        hover:border-[2px] hover:border-zinc-500
                        w-[5.5rem] h-[5rem]
                        text-(--text-secondary) text-[1.7rem]
                        bg-[#1C1917] rounded-[1rem]
                        flex items-center justify-center
                        cursor-pointer
                        ${sizes.includes("XL") ? "border-[2px] border-zinc-400" : ""}
                        `}>XL</div>

                  <div
                    onClick={() => setSizes((prev) => prev.includes("XXL") ? prev.filter((item) => item !== "XXL") : [...prev, "XXL"])}
                    className={`
                        hover:border-[2px] hover:border-zinc-500
                        w-[5.5rem] h-[5rem]
                        text-(--text-secondary) text-[1.7rem]
                        bg-[#1C1917] rounded-[1rem]
                        flex items-center justify-center
                        cursor-pointer
                        ${sizes.includes("XXL") ? "border-[2px] border-zinc-400" : ""}
                        `}>XXL</div>

                  <div
                    onClick={() => setSizes((prev) => prev.includes("XXXL") ? prev.filter((item) => item !== "XXXL") : [...prev, "XXXL"])}
                    className={`
                        hover:border-[2px] hover:border-zinc-500
                        w-[6.5rem] h-[5rem]
                        text-(--text-secondary) text-[1.7rem]
                        bg-[#1C1917] rounded-[1rem]
                        flex items-center justify-center
                        cursor-pointer
                        ${sizes.includes("XXXL") ? "border-[2px] border-zinc-400" : ""}
                        `}>XXXL</div>
                </div>
              </div>
            </div>


            {/* CHECK BOX */}
            <div className="bestSeller flex items-center gap-[1rem] text-[2rem] text-(--text-secondary) mt-[1rem]">
              <input
                onChange={(e) => setBestSeller(e.target.checked)}
                type="checkbox"
                checked={bestSeller}
                id="bestSeller"
                className='bestSeller size-[2rem]'
              />
              <label htmlFor="bestSeller">Add to Bestseller</label>
            </div>

            {/* ADD BUTTON */}
            <button
              type="submit"
              className='
              flex items-center justify-center
              w-[17rem] h-[6rem]
              text-[2rem] text-(--text-secondary) 
              rounded-[1rem] bg-emerald-700
              cursor-pointer
              hover:bg-white hover:text-[#1C1917] 
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