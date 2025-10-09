import React from 'react'

const CategorySort = ({
    selectedCategories, setSelectedCategories,
    selectedSubCategories, setSelectedSubCategories,
}) => {

    const categories = [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
    ]

    const subCategories = [
        { id: "topWear", label: "Top-Wear", value: "TopWear" },
        { id: "bottomWear", label: "Bottom-Wear", value: "BottomWear" },
        { id: "winterWear", label: "Winter-Wear", value: "WinterWear" },
    ]
    return (
        <div
            className="
                filter
                flex flex-col gap-[0.5rem]
                p-[0.8rem] sm:p-[1rem]
                bg-stone-950 rounded-[0.4rem]
                w-full
            ">
            {/* CATEGORIES */}
            <p
                className='
                    text-(--text-secondary)
                    text-[0.9rem] sm:text-[1rem]
                    font-semibold border-l-3
                    border-rose-700
                    pl-2
            '>CATEGORIES</p>

            <div
                className='
                    flex flex-col
                    gap-[0.5rem] sm:gap-[0.7rem]
                    mt-[0.3rem] sm:mt-[0.5rem]
                    text-(--text-secondary)
            '>
                {
                    categories.map((cate) => {
                        return (
                            <div key={cate.id} className='flex gap-[0.5rem] sm:gap-[0.7rem]'>
                                <input
                                    checked={selectedCategories.includes(cate.label)}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        if (isChecked) {
                                            setSelectedCategories([...selectedCategories, cate.label]);
                                        } else {
                                            setSelectedCategories(selectedCategories.filter((prevCategory) => prevCategory !== cate.label));
                                        }
                                    }}
                                    type="checkbox"
                                    id={cate.id}
                                    className="
                                        w-[1rem] h-[1rem] sm:w-[1.1rem] sm:h-[1.1rem]
                                        cursor-pointer accent-rose-700
                                        transition duration-200
                                    "/>
                                <label
                                    htmlFor={cate.id}
                                    className="
                                        text-[0.85rem] sm:text-[0.95rem]
                                        hover:text-rose-500 duration-150
                                        cursor-pointer
                                    ">
                                    {cate.label}
                                </label>
                            </div>
                        )
                    })
                }
            </div>


            {/* SUB-CATEGORIES */}
            <div
                className="
                    filter
                    p-[0.8rem] sm:p-[1rem]
                    bg-stone-800 rounded-[0.4rem]
                    flex flex-col
                    gap-[0.5rem] mt-[0.8rem] sm:mt-[1rem]
            ">
                <p
                    className='
                        text-(--text-secondary)
                        text-[0.9rem] sm:text-[1rem]
                        font-semibold border-l-3 border-rose-700
                        pl-2
                        mb-[0.3rem] sm:mb-[0.5rem]
                    '>SUB-CATEGORIES
                </p>

                <div className='flex flex-col gap-[0.5rem] sm:gap-[0.7rem] text-(--text-secondary) '>
                    {
                        subCategories.map((subCate) => {
                            return (
                                <div key={subCate.id} className='flex gap-[0.5rem] sm:gap-[0.7rem]'>
                                    <input
                                        checked={selectedSubCategories.includes(subCate.value)}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            if (isChecked) {
                                                setSelectedSubCategories([...selectedSubCategories, subCate.value]);
                                            } else {
                                                setSelectedSubCategories(selectedSubCategories.filter((prevCategory) => prevCategory !== subCate.value))
                                            }
                                        }}
                                        type="checkbox"
                                        id={subCate.id}
                                        className="
                                        w-[1rem] h-[1rem] sm:w-[1.1rem] sm:h-[1.1rem]
                                        cursor-pointer accent-rose-700
                                        transition duration-200
                                    "/>

                                    <label
                                        htmlFor={subCate.id}
                                        className="
                                        text-[0.85rem] sm:text-[0.95rem] 
                                        hover:text-rose-500 duration-150
                                        cursor-pointer
                                ">
                                        {subCate.label}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CategorySort