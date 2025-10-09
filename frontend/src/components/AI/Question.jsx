import React from 'react'

const Question = ({ handleHelpClick }) => {
    return (
        <div
            onClick={handleHelpClick}
            className="relative cursor-pointer transition-transform hover:scale-110"
        >
            <div
                className="
                    w-7 h-7
                    rounded-full 
                    bg-white text-rose-600
                    font-bold 
                    flex items-center justify-center
                    text-base shadow-lg
                    hover:scale-105 transition-colors
                ">
                ?
            </div>

            {/* Tooltip for Help Button */}
            <div
                className="
                    absolute bottom-12 right-0
                    bg-zinc-800
                    text-white text-xs
                    whitespace-nowrap 
                    px-3 py-1
                    rounded shadow-md opacity-0
                    group-hover:opacity-100 transition-opacity pointer-events-none
                ">
                Help & Commands
            </div>
        </div>
    )
}

export default Question