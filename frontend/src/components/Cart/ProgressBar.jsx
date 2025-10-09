import React from 'react'

const ProgressBar = ({ value, max }) => {

    // second arg ensures that final values never goes above 100
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div
            className="
                h-[1.2rem]
                bg-rose-800
                rounded-full
                "
            style={{ width: `${percentage}%` }}
        >
        </div>
    )
}

export default ProgressBar