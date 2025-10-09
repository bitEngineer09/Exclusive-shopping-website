import React from 'react';
import { IoStarSharp } from "react-icons/io5";

const RatingStars = ({ rating }) => {
    const totalStars = 5;

    return (
        <div className="flex">
            {Array.from({ length: totalStars }, (_, index) => (
                <IoStarSharp
                    key={index}
                    className={`cursor-pointer ${index < rating ? "text-yellow-400" : "text-gray-400"}`}
                />
            ))}
        </div>
    );
};

export default RatingStars;
