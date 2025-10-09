import React from 'react'

const SizeSort = ({ selectedSize, setSelectedSize }) => {

    const sizes = ["S", "M", "XL", "XXL", "XXXL"]

    const toggleSize = (size) => {
        if (selectedSize.includes(size)) {
            setSelectedSize(selectedSize.filter(s => s !== size));
        } else {
            setSelectedSize([...selectedSize, size]);
        }
    }

    return (
        <div
            className="
                filter
                flex flex-col gap-[0.4rem] sm:gap-[0.5rem]
                mt-[0.6rem] sm:mt-[0.7rem] md:mt-[1rem]
                p-[0.6rem] sm:p-[0.7rem] md:p-[1rem]
                bg-stone-950 rounded-[0.4rem]
            ">
            <p className='text-(--text-secondary) text-[0.75rem] sm:text-[0.8rem] md:text-[1rem] font-semibold'>SIZE</p>
            <div className='flex flex-wrap gap-[0.6rem] sm:gap-[0.8rem] md:gap-[1rem]'>
                {
                    sizes.map((size, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => toggleSize(size)}
                                className={`
                                    sizeContainer
                                    flex items-center justify-center
                                    text-(--text-secondary) 
                                    text-[0.7rem] sm:text-[0.75rem] md:text-[0.9rem] lg:text-[1rem]
                                    ${size === "XXXL" ? "w-[3.2rem] sm:w-[3.5rem] md:w-[4rem]" : "w-[2.2rem] sm:w-[2.4rem] md:w-[2.7rem]"}
                                    h-[1.5rem] sm:h-[1.6rem] md:h-[2rem] lg:h-[2.5rem]
                                    rounded-[0.3rem]
                                    cursor-pointer 
                                    transition-all duration-200
                                    ${selectedSize.includes(size) 
                                        ? "bg-rose-700 scale-105 shadow-lg" 
                                        : "bg-zinc-800 hover:bg-slate-700 hover:scale-105"}
                                `}>{size}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SizeSort