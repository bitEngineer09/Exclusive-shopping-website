import React from 'react';
import SizeSort from './SizeSort';

const MobileTabFilterView = ({
    selectedCategories, setSelectedCategories,
    selectedSubCategories, setSelectedSubCategories,
    sortBy, setSortBy,
    selectedSize, setSelectedSize
}) => {
    return (
        <div
            className='
                absolute z-50
                block xl:hidden
                w-full sm:w-[17rem] lg:w-[19rem]
                px-[0.7rem] 
                pt-[0.3rem]
                pb-[0.7rem]
                sm:p-[0.5rem] 
                sm:mt-[0.5rem] md:mt-[0.7rem]
                sm:ml-[0.7rem]
                sm:rounded-[0.4rem]
                bg-rose-800
                max-h-[calc(100vh-5rem)] overflow-y-auto
            '>
            {/* CATEGORIES */}
            <div className="
                    filter
                    p-[0.6rem] sm:p-[0.7rem]
                    bg-[#0C0A09]
                    rounded-[0.3rem]
                    flex flex-col gap-[0.4rem] sm:gap-[0.5rem]
                    text-[0.75rem] sm:text-[0.8rem] md:text-[0.9rem]
                ">
                <p className='text-(--text-secondary) font-semibold text-[0.85rem] sm:text-[0.9rem]'>CATEGORIES</p>
                <div className='flex gap-[0.5rem] sm:gap-[0.7rem] text-(--text-secondary) items-center'>
                    <input
                        checked={selectedCategories.includes("Men")}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                                setSelectedCategories([...selectedCategories, "Men"]);
                            } else {
                                setSelectedCategories(selectedCategories.filter((prevCategory) => prevCategory !== "Men"));
                            }
                        }}
                        type="checkbox"
                        id="Men"
                        className="w-[0.9rem] h-[0.9rem] sm:w-[1rem] sm:h-[1rem] cursor-pointer"
                    />
                    <label htmlFor="Men" className="cursor-pointer">Men</label>
                </div>

                <div className='flex gap-[0.5rem] sm:gap-[0.7rem] text-(--text-secondary) items-center'>
                    <input
                        checked={selectedCategories.includes("Women")}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                                setSelectedCategories([...selectedCategories, "Women"]);
                            } else {
                                setSelectedCategories(selectedCategories.filter((prevCategory) => prevCategory !== "Women"));
                            }
                        }}
                        type="checkbox"
                        id="Women"
                        className="w-[0.9rem] h-[0.9rem] sm:w-[1rem] sm:h-[1rem] cursor-pointer"
                    />
                    <label htmlFor="Women" className="cursor-pointer">Women</label>
                </div>

                <div className='flex gap-[0.5rem] sm:gap-[0.7rem] text-(--text-secondary) items-center'>
                    <input
                        checked={selectedCategories.includes("Kids")}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                                setSelectedCategories([...selectedCategories, "Kids"]);
                            } else {
                                setSelectedCategories(selectedCategories.filter((prevCategory) => prevCategory !== "Kids"));
                            }
                        }}
                        type="checkbox"
                        id="Kids"
                        className="w-[0.9rem] h-[0.9rem] sm:w-[1rem] sm:h-[1rem] cursor-pointer"
                    />
                    <label htmlFor="Kids" className="cursor-pointer">Kids</label>
                </div>

                {/* SUB-CATEGORIES */}
                <div
                    className="
                        filter
                        flex flex-col gap-[0.4rem] sm:gap-[0.5rem]
                        p-[0.5rem] sm:p-[0.6rem]
                        mt-[0.5rem] sm:mt-[0.6rem]
                        rounded-[0.4rem] sm:rounded-[0.5rem]
                        text-[0.75rem] sm:text-[0.8rem] md:text-[0.9rem]
                        bg-[#292524]
                    ">
                    <p className='text-(--text-secondary) font-semibold text-[0.85rem] sm:text-[0.9rem]'>SUB-CATEGORIES</p>
                    <div className='flex gap-[0.5rem] sm:gap-[0.7rem] text-(--text-secondary) items-center'>
                        <input
                            checked={selectedSubCategories.includes("TopWear")}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                    setSelectedSubCategories([...selectedSubCategories, "TopWear"]);
                                } else {
                                    setSelectedSubCategories(selectedSubCategories.filter((prevCategory) => prevCategory !== "TopWear"))
                                }
                            }}
                            type="checkbox"
                            id="TopWear"
                            className="w-[0.9rem] h-[0.9rem] sm:w-[1rem] sm:h-[1rem] cursor-pointer"
                        />
                        <label htmlFor="TopWear" className="cursor-pointer">Top-Wear</label>
                    </div>

                    <div className='flex gap-[0.5rem] sm:gap-[0.7rem] text-(--text-secondary) items-center'>
                        <input
                            checked={selectedSubCategories.includes("BottomWear")}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                    setSelectedSubCategories([...selectedSubCategories, "BottomWear"]);
                                } else {
                                    setSelectedSubCategories(selectedSubCategories.filter((prevCategory) => prevCategory !== "BottomWear"))
                                }
                            }}
                            type="checkbox"
                            id="BottomWear"
                            className="w-[0.9rem] h-[0.9rem] sm:w-[1rem] sm:h-[1rem] cursor-pointer"
                        />
                        <label htmlFor="BottomWear" className="cursor-pointer">Bottom-Wear</label>
                    </div>

                    <div className='flex gap-[0.5rem] sm:gap-[0.7rem] text-(--text-secondary) items-center'>
                        <input
                            checked={selectedSubCategories.includes("WinterWear")}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                    setSelectedSubCategories([...selectedSubCategories, "WinterWear"]);
                                } else {
                                    setSelectedSubCategories(selectedSubCategories.filter((prevCategory) => prevCategory !== "WinterWear"))
                                }
                            }}
                            type="checkbox"
                            id="WinterWear"
                            className="w-[0.9rem] h-[0.9rem] sm:w-[1rem] sm:h-[1rem] cursor-pointer"
                        />
                        <label htmlFor="WinterWear" className="cursor-pointer">Winter-Wear</label>
                    </div>
                </div>
            </div>

             {/* SIZES */}
            <SizeSort selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
            
            {/* SORTING */}
            <select
                name="sorting"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                id=""
                className='
                    mt-[0.6rem] sm:mt-[0.7rem]
                    p-[0.5rem] sm:p-[0.6rem]
                    rounded-[0.4rem] sm:rounded-[0.5rem]
                    text-white text-[0.75rem] sm:text-[0.8rem]
                    bg-[#0C0A09]
                    w-full
                    cursor-pointer
                    outline-none
                    border border-stone-700
                '>
                <option value="relevant" className='bg-[#494745]'>Sort By: Relevant</option>
                <option value="lowToHigh" className='bg-[#494745]'>Sort By: Low to High</option>
                <option value="highToLow" className='bg-[#494745]'>Sort By: High to Low</option>
            </select>

           
        </div>
    )
}

export default MobileTabFilterView