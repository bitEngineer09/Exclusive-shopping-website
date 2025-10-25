import React from 'react';
import Nav from '../components/nav/Nav';
import SideBar from '../components/nav/SideBar';
import { useContext } from 'react';
import { orderDataContext } from '../store/OrderContext';
// import { useNavigate } from 'react-router-dom';
import { MdCurrencyRupee } from "react-icons/md";

const Orders = () => {

  const { finalData, handleStatusChange } = useContext(orderDataContext);
  // const navigate = useNavigate();

  const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

  return (
    <div className='w-full'>
      <Nav />
      <div className="mainContainer flex flex-col lg:flex-row min-h-screen">
        <SideBar />
        <div
          className="
            mainContent
            flex flex-col overflow-auto
            gap-[1rem]
            w-full min-h-screen 
            bg-zinc-800
            px-[1rem] sm:px-[1.5rem] md:px-[2rem]
            pb-[2rem] sm:pb-[3rem] md:pb-[4rem]
          ">
          <h1
            className='
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
              font-medium text-white
              my-6
            '>
            Your <span className='text-rose-600'>orders</span>
          </h1>
          {
            finalData?.map((itemDetails, index) => {
              const newDate = new Date(itemDetails.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric"
              });
              return (
                <div key={index} className='text-white'>
                  <div className='flex items-center w-full justify-between'>
                    <span
                      className='bg-zinc-950 p-[0.7rem] sm:p-[0.8rem] md:p-[1rem] rounded-[0.3rem] text-[1rem] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.7rem] break-all'>
                      #ORDER ID: {itemDetails?.orderId}
                    </span>
                  </div>
                  <div className='w-full bg-zinc-950 p-[0.8rem] sm:p-[1rem] md:p-[1.3rem] rounded-[0.5rem] mt-[0.8rem] md:mt-[1rem]'>
                    <div className='flex flex-col xl:flex-row justify-between items-start gap-[1.5rem] xl:gap-[2rem]'>
                      <div className='flex flex-col sm:flex-row gap-[1rem] sm:gap-[1.5rem] md:gap-[2rem] w-full xl:w-auto'>

                        {/* PRODUCT IMAGE */}
                        <img
                          src={itemDetails.productDetails.image1}
                          alt=""
                          className='w-full sm:w-[10rem] md:w-[12rem] lg:w-[15rem] h-[30rem] sm:h-[10rem] md:h-[12rem] lg:h-auto rounded-[0.5rem] object-cover flex-shrink-0'
                        />

                        {/* MAIN CONTENT */}
                        <div className='w-full xl:w-[30rem] 2xl:w-[45rem] flex flex-col justify-center gap-[0.7rem] sm:gap-[0.8rem] md:gap-[1rem]'>
                          <p
                            className='text-[1.1rem] sm:text-[1.3rem] md:text-[1.6rem] lg:text-[1.8rem] text-blue-400 cursor-pointer hover:text-blue-300 transition-colors line-clamp-2'>
                            {itemDetails.productDetails.name.slice(0, 40) + "..."}
                          </p>
                          <p
                            className='text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] text-zinc-400 line-clamp-3'>
                            {itemDetails.productDetails.description.slice(0, 110) + "..."}
                          </p>
                          <p
                            className='text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.4rem]'>
                            Ordered Sizes: {itemDetails.sizes.join(", ")}
                          </p>
                          <p
                            className='flex items-center text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]'>
                            Price: <span className='flex items-center font-medium text-emerald-500'>
                              <MdCurrencyRupee />{(itemDetails.price).toLocaleString()}
                            </span>
                          </p>
                          <p
                            className='flex items-center text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem] underline underline-offset-3'>
                            Total Price: <span
                              className='flex items-center text-rose-500 font-medium'>
                              <MdCurrencyRupee />
                              {(itemDetails.price * itemDetails.quantity).toLocaleString()}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* RIGHT SIDE CONTENT */}
                      <div className='flex flex-row items-center gap-[1.5rem] xl:gap-[5rem] w-full xl:w-auto'>
                        {/* ORDER DETAILS */}
                        <div className='text-[0.95rem] text-nowrap sm:text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem] xl:text-[1.7rem] space-y-[0.5rem] sm:space-y-[0.6rem] md:space-y-[0.7rem] w-full sm:w-1/2 xl:w-auto'>
                          <p>
                            Qty: {itemDetails.quantity}
                          </p>
                          <p>
                            Method: {itemDetails.paymentMode}
                          </p>
                          <p>
                            Status: {itemDetails.status}
                          </p>
                          <p>
                            Date: <span className='text-pink-500'>{newDate}</span>
                          </p>
                        </div>

                        {/* CUSTOMER DETAILS */}
                        <div className='text-[0.85rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] space-y-[0.5rem] sm:space-y-[0.6rem] md:space-y-[0.7rem] w-full sm:w-1/2 xl:w-auto'>
                          <p>
                            Customer: {itemDetails.address.firstName + " " + itemDetails.address.lastName}
                          </p>
                          <p>
                            Phone: {itemDetails.address.phone}
                          </p>
                          <p>
                            Country: {itemDetails.address.country}
                          </p>
                          <p>
                            State: {itemDetails.address.state}
                          </p>
                          <p>
                            City: {itemDetails.address.city}
                          </p>
                          <p className='break-words'>
                            Address: {itemDetails.address.street}, PinCode: {itemDetails.address.pincode}
                          </p>
                        </div>
                      </div>

                      {/* ORDER STATUS */}
                      <select
                        value={itemDetails.status}
                        onChange={(e) => handleStatusChange(itemDetails.orderId, e.target.value)}
                        className='
                            text-[0.95rem] sm:text-[1.1rem] md:text-[1.4rem]
                            outline-none
                            p-[0.7rem_1.2rem] sm:p-[0.8rem_1.5rem] md:p-[1rem_2rem]
                            rounded-[0.7rem] md:rounded-[1rem]
                            bg-zinc-700 hover:bg-zinc-600
                            text-white font-medium
                            cursor-pointer
                            transition-colors
                            w-full xl:w-auto
                        '>
                        {
                          statusOptions.map((status, index) => (
                            <option key={index} value={status}>
                              {status}
                            </option>
                          ))
                        }
                      </select>

                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Orders