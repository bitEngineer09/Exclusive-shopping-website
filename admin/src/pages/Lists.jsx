import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/nav/Nav'
import SideBar from '../components/nav/SideBar'
import { productDataContext } from '../store/ProductContext'
import { RxCross2 } from "react-icons/rx";
// import { useParams } from 'react-router-dom';

const Lists = () => {

  // USE STATES
  const [products, setProducts] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  // CONTEXT DATA
  const { handleAllProducts, deleteProductById } = useContext(productDataContext);

  // const {id} = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await handleAllProducts();
        // console.log(result);
        setProducts(result.products);
        return result;
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  // console.log(selectedProductId)

  return (
    <div className='listsPage w-full min-h-screen'>
      <Nav />
      <div className="mainContainer flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
        <SideBar />
        <div
          className="
            mainContent flex-1
            bg-zinc-800
            py-[1rem] sm:py-[1.5rem] md:py-[2rem]
            px-[1rem] sm:px-[2rem] md:px-[3rem]
            overflow-y-auto
            ">
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white'>
            Your <span className='text-rose-600'>products</span>
          </h1>

          <div className="productCards grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-[1rem] sm:gap-[1.5rem] md:gap-[2rem] mt-[1.5rem] md:mt-[2rem]">
            {
              products.map((product, index) => {
                return (
                  <div key={index} className='w-full flex flex-col sm:flex-row gap-[1rem] sm:gap-[1.5rem] md:gap-[2rem] p-[0.8rem] sm:p-[1rem] rounded-[0.8rem] md:rounded-[1rem] bg-zinc-950'>
                    <img 
                      src={product.image1} 
                      alt="" 
                      className='w-full sm:w-[10rem] md:w-[12rem] lg:w-[15rem] h-[20rem] sm:h-[10rem] md:h-[12rem] lg:h-[15rem] rounded-[0.8rem] md:rounded-[1rem] object-cover' 
                    />
                    <div className="cardDetails flex justify-between w-full">
                      <div>
                        <h2 className='text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.9rem] text-(--text-secondary) line-clamp-2'>
                          {product.name.slice(0, 25) + "..."}
                        </h2>
                        <span className='text-[0.95rem] sm:text-[1.1rem] md:text-[1.3rem] text-(--text-secondary)'>
                          {product.category}
                        </span>
                      </div>
                      <RxCross2
                        onClick={() => {
                          setDeletePopup(true)
                          setSelectedProductId(product._id);
                        }}
                        className='text-red-400 text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] cursor-pointer hover:text-red-500 transition-colors flex-shrink-0' 
                      />
                    </div>
                  </div>
                )
              })
            }
          </div>

        </div>

        {/* DELETE POPUP */}
        {
          deletePopup
            ? <div
              className="
            deletePopup
            flex flex-col items-center justify-center gap-[1.5rem] sm:gap-[2rem]
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-[90%] sm:w-[35rem] md:w-[42rem]
            min-h-[12rem] sm:h-[14rem] md:h-[16rem]
            bg-zinc-300 rounded-[0.8rem] md:rounded-[1rem]
            p-[1rem] sm:p-[1.5rem]
            z-50
            shadow-2xl
          ">
              <p
                className='
                text-[1.2rem] sm:text-[1.6rem] md:text-[2rem] text-(--text-primary) font-medium
                text-center
                px-[1rem] sm:px-[2rem]
              '>Are you sure you want to delete this product?</p>
              <div className='w-full flex justify-center gap-[1.5rem] sm:gap-[2rem] md:gap-[3rem]'>
                <button
                  onClick={() => setDeletePopup(false)}
                  className='
                bg-white hover:bg-gray-100
                w-[8rem] sm:w-[9rem] md:w-[10rem] 
                h-[3rem] sm:h-[3.5rem] md:h-[4rem]
                text-[1.3rem] sm:text-[1.6rem] md:text-[2rem] font-medium 
                rounded-[0.8rem] md:rounded-[1rem]
                cursor-pointer
                transition-colors duration-200
                active:scale-95
                '>No</button>

                <button
                  onClick={async () => {
                    await deleteProductById(selectedProductId);
                    setDeletePopup(false);
                    setProducts((prev) => prev.filter((product) => product._id !== selectedProductId));
                  }}
                  className='
                bg-black hover:bg-zinc-900 text-(--text-secondary)
                w-[8rem] sm:w-[9rem] md:w-[10rem] 
                h-[3rem] sm:h-[3.5rem] md:h-[4rem]
                text-[1.3rem] sm:text-[1.6rem] md:text-[2rem] font-medium 
                rounded-[0.8rem] md:rounded-[1rem]
                cursor-pointer
                transition-colors duration-200
                active:scale-95
                '>Yes</button>
              </div>
            </div>
            : null
        }
      </div>
    </div>
  )
}

export default Lists