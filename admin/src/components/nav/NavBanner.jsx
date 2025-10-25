import React from 'react'
import { useLocation } from 'react-router-dom'

const NavBanner = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>

            {
                currentPath == "/login" ?
                    ""
                    :
                    (
                        <div
                            className='
                                flex items-center justify-center text-center
                                w-full h-auto md:h-15
                                md:text-2xl
                                bg-white
                                py-2 md:py-0
                                text-black font-semibold tracking-wider
                                '>
                            <p className='hidden xl:block '>
                                “Drive your business forward — the dashboard is your cockpit.”
                            </p>
                            <p className='block xl:hidden'>
                                "Hey there, boss! Let’s make today’s sales shine."
                            </p>
                        </div>
                    )

            }

        </>

    )
}

export default NavBanner