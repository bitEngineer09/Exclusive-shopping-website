import React, { useContext, useState } from 'react';
import Nav from '../components/nav/Nav';
import SideBar from '../components/nav/SideBar';
import { ImImage } from "react-icons/im";
import { productDataContext } from '../store/ProductContext';
import { Leapfrog } from 'ldrs/react';
import 'ldrs/react/Leapfrog.css';
import ProductDetails from '../components/ProductDetails/ProductDetails';


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
      <div className='w-full min-h-screen flex flex-col lg:flex-row relative'>

        {/* SIDEBAR */}
        <SideBar />

        {/* RIGHT CONTENT */}
        <div className='w-full h-full absolute addContent inset-0 -z-1'></div>
        <div
          className="
            flex-1 h-full
             py-[1rem] sm:py-[1.5rem] md:py-[2rem]
            px-[1rem] sm:px-[2rem] md:px-[3rem]
            bg-zinc-800
            overflow-y-auto
          ">
          {/* HEADING */}
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white'>
            Add <span className='text-rose-600'>products</span>
          </h1>

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
              <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-white'>Upload Images</h2>
              <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
                <div>
                  {/* IMAGE 1 */}
                  <label htmlFor="image1" className='cursor-pointer'>
                    {
                      image1
                        ? <img src={URL.createObjectURL(image1)} alt="preview" className='w-full aspect-square object-cover rounded-lg' />
                        : <div
                          className='bg-zinc-950 p-8 sm:p-12 lg:p-16 rounded-3xl flex items-center justify-center aspect-square'>
                          <ImImage className='text-4xl sm:text-5xl lg:text-6xl text-white' />
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
                          className='bg-zinc-950 p-8 sm:p-12 lg:p-16 rounded-3xl flex items-center justify-center aspect-square'>
                          <ImImage className='text-4xl sm:text-5xl lg:text-6xl text-white' />
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
                          className='bg-zinc-950 p-8 sm:p-12 lg:p-16 rounded-3xl flex items-center justify-center aspect-square'>
                          <ImImage className='text-4xl sm:text-5xl lg:text-6xl text-white' />
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
                          className='bg-zinc-950 p-8 sm:p-12 lg:p-16 rounded-3xl flex items-center justify-center aspect-square'>
                          <ImImage className='text-4xl sm:text-5xl lg:text-6xl text-white' />
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
            <ProductDetails
              name={name} setName={setName}
              description={description} setDescription={setDescription}
              price={price} setPrice={setPrice}
              setCategory={setCategory}
              setSubCategory={setSubCategory}
              sizes={sizes} setSizes={setSizes}
            />


            {/* CHECK BOX */}
            <div className="bestSeller flex items-center gap-3 sm:gap-4 text-base sm:text-lg md:text-xl lg:text-2xl text-white">
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
              text-lg sm:text-xl md:text-2xl lg:text-3xl text-white
              rounded-lg bg-rose-800
              cursor-pointer
              font-medium
              hover:bg-rose-700
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