import React from 'react'

const NavBanner = () => {
    return (
        <div
            className='
                    hidden md:block text-center
                    w-full h-auto md:h-[2.5rem]
                    text-[0.85rem] md:text-[0.9rem]
                    tracking-wide
                    bg-white
                    py-2 md:py-0
                '>
            <p className='text-(--text-primary) font-semibold tracking-wider hidden xl:block md:pt-[0.55rem] px-4'>
                "Discover unbeatable deals, trending products, and fast delivery—shop smart, live better, and enjoy every moment with effortless online shopping."
            </p>
            <p className='text-(--text-primary) font-semibold tracking-wider hidden md:block xl:hidden md:pt-[0.55rem] px-4'>
                "Get the best deals, fast shipping, and a smooth shopping experience."
            </p>
        </div>
    )
}

export default NavBanner