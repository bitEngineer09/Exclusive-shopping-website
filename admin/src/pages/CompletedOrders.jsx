import React, { useContext } from 'react';
import Nav from '../components/nav/Nav';
import SideBar from '../components/nav/SideBar';
import { orderDataContext } from '../store/OrderContext';
import { MdCurrencyRupee } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const CompletedOrders = () => {

    const { completedOrders } = useContext(orderDataContext);

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

                    {/* HEADER */}
                    <div className='flex items-center gap-4 my-6'>
                        <h1
                            className='
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                font-medium text-white
              '>
                            Completed <span className='text-rose-600'>Orders</span>
                        </h1>
                    </div>

                    {/* EMPTY STATE */}
                    {completedOrders?.length === 0 && (
                        <div className='flex flex-col items-center justify-center gap-4 mt-20 text-zinc-400'>
                            <FaCheckCircle className='text-6xl text-rose-600' />
                            <p className='text-xl'>No completed orders yet</p>
                        </div>
                    )}

                    {/* COMPLETED ORDERS LIST */}
                    {completedOrders?.map((order) => {
                        const newDate = new Date(order.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        });

                        return (
                            <div key={order._id} className='text-white mb-4'>
                                {/* ORDER ID + DATE */}
                                <div className='flex items-center justify-between w-full mb-2 flex-wrap gap-2'>
                                    <span className='bg-zinc-950 p-[0.7rem] rounded-[0.3rem] text-[1rem] sm:text-[1.3rem] md:text-[1.5rem] break-all'>
                                        #ORDER ID: {order._id}
                                    </span>
                                    <span className='flex items-center gap-2 bg-emerald-800 px-4 py-2 rounded-full text-sm font-medium'>
                                        <FaCheckCircle /> Delivered on {newDate}
                                    </span>
                                </div>

                                {/* ORDER CARD */}
                                <div className='w-full bg-zinc-950 p-[0.8rem] sm:p-[1rem] md:p-[1.3rem] rounded-[0.5rem]'>

                                    {/* ORDER DATA */}
                                    <div className='flex flex-wrap gap-6 mb-4 text-sm text-zinc-400 border-b border-zinc-800 pb-4'>
                                        <p>
                                            Payment: <span className='text-white font-medium'>{order.paymentMethod}</span>
                                        </p>
                                        <p className='flex items-center gap-1'>
                                            Total Amount: <span className='text-emerald-400 font-semibold flex items-center'>
                                                <MdCurrencyRupee />{order.amount.toLocaleString()}
                                            </span>
                                        </p>
                                        <p>
                                            Customer: <span className='text-white font-medium'>
                                                {order.address.firstName} {order.address.lastName}
                                            </span>
                                        </p>
                                        <p>
                                            Phone: <span className='text-white font-medium'>{order.address.phone}</span>
                                        </p>
                                        <p>
                                            Address: <span className='text-white font-medium'>
                                                {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                                            </span>
                                        </p>
                                    </div>

                                    {/* ITEMS IN THIS ORDER */}
                                    <div className='flex flex-col gap-4'>
                                        {order.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'
                                            >
                                                <img
                                                    src={item.productId?.image1}
                                                    alt={item.productId?.name}
                                                    className='w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg flex-shrink-0'
                                                />
                                                <div className='flex flex-col gap-1 flex-1'>
                                                    <p className='text-base md:text-lg font-medium text-blue-300 line-clamp-1'>
                                                        {item.productId?.name}
                                                    </p>
                                                    <p className='text-sm text-zinc-400 line-clamp-2'>
                                                        {item.productId?.description?.slice(0, 100)}...
                                                    </p>
                                                    <div className='flex flex-wrap gap-4 text-sm mt-1'>
                                                        <p>Qty: <span className='font-medium'>{item.quantity}</span></p>
                                                        <p className='flex items-center gap-0.5'>
                                                            Price: <span className='text-emerald-400 font-medium flex items-center'>
                                                                <MdCurrencyRupee />{item.price.toLocaleString()}
                                                            </span>
                                                        </p>
                                                        <p className='flex items-center gap-0.5'>
                                                            Subtotal: <span className='text-rose-400 font-semibold flex items-center'>
                                                                <MdCurrencyRupee />{(item.price * item.quantity).toLocaleString()}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CompletedOrders;