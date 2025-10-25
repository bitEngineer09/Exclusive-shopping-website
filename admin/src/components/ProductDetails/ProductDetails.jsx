import React from 'react';

const ProductDetails = ({
    name, setName,
    description, setDescription,
    price, setPrice,
    setCategory,
    setSubCategory,
    sizes, setSizes,
}) => {

    return (
        <div className="productDetails flex flex-col gap-6 sm:gap-8 lg:gap-12">
            <div className="productName flex flex-col w-full lg:w-3/4 xl:w-1/2">
                <label
                    htmlFor="productName"
                    className='
                    text-lg sm:text-xl md:text-2xl text-white
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
                    bg-zinc-950 h-12 sm:h-14 md:h-16 lg:h-20 mt-2 sm:mt-3 lg:mt-4
                    text-white text-base sm:text-lg md:text-xl
                    px-4 sm:px-6 lg:px-8 rounded-lg
                  "/>
            </div>

            {/* PRODUCT DESCRIPTION */}
            <div className="productDescription flex flex-col">
                <label
                    htmlFor="productDescription"
                    className='
                    text-lg sm:text-xl md:text-2xl text-white
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
                    bg-zinc-950 rounded-lg
                    text-base sm:text-lg md:text-xl text-white
                  '>
                </textarea>
            </div>

            {/* PRODUCT CATEGORY & SUB-CATEGORY */}
            <div className="category w-full lg:w-3/4 xl:w-1/2 flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-12">

                {/* CATEGORY */}
                <div className='w-full sm:w-1/2'>
                    <p className='text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3 lg:mb-4'>Product Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        name=""
                        id=""
                        className='
                    w-full h-12 sm:h-14 md:h-16
                    bg-zinc-950 text-base sm:text-lg md:text-xl text-white
                    rounded-lg px-3 sm:px-4
                    '>
                        <option value="Men" className='text-sm sm:text-base'>Men</option>
                        <option value="Women" className='text-sm sm:text-base'>Women</option>
                        <option value="Kids" className='text-sm sm:text-base'>Kids</option>
                    </select>
                </div>

                {/* SUB-CATEGORY */}
                <div className='w-full sm:w-1/2'>
                    <p className='text-lg sm:text-xl md:text-2xl text-white text-nowrap mb-2 sm:mb-3 lg:mb-4'>Sub-Category</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        required
                        name=""
                        id=""
                        className='
                    w-full h-12 sm:h-14 md:h-16
                    bg-zinc-950 text-base sm:text-lg md:text-xl text-white
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
                    text-lg sm:text-xl md:text-2xl text-white
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
                    bg-zinc-950 h-12 sm:h-14 md:h-16 lg:h-20 mt-2 sm:mt-3 lg:mt-4
                    text-white text-base sm:text-lg md:text-xl
                    px-4 sm:px-6 lg:px-8 rounded-lg
                  '/>

            </div>


            {/* PRODUCT SIZE */}
            <div className="productSize">
                <p
                    className='
                    text-lg sm:text-xl md:text-2xl text-white
                  '>Product Size</p>
                <div className="sizeContainer mt-3 sm:mt-4 lg:mt-6 flex flex-wrap gap-3 sm:gap-4 lg:gap-8">
                    <div
                        onClick={() => setSizes((prev) => prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"])}
                        className={`
                        hover:border-2 hover:border-zinc-500
                        w-16 h-14 sm:w-20 sm:h-16 lg:w-22 lg:h-20
                        text-white text-base sm:text-lg md:text-xl
                        bg-zinc-950 rounded-lg
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
                        text-white text-base sm:text-lg md:text-xl
                        bg-zinc-950 rounded-lg
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
                        text-white text-base sm:text-lg md:text-xl
                        bg-zinc-950 rounded-lg
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
                        text-white text-base sm:text-lg md:text-xl
                        bg-zinc-950 rounded-lg
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
                        text-white text-base sm:text-lg md:text-xl
                        bg-zinc-950 rounded-lg
                        flex items-center justify-center
                        cursor-pointer
                        transition-all duration-200
                        ${sizes.includes("XXXL") ? "border-2 border-zinc-400" : ""}
                        `}>XXXL</div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;