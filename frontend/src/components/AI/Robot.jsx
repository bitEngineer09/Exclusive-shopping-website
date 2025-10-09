import React from 'react';
import { BsRobot } from "react-icons/bs";

const Robot = ({ handleClick, activeAi }) => {
    return (
        <div onClick={handleClick} className="cursor-pointer">
            <BsRobot
                className={`
                    text-5xl text-rose-600
                    transition-transform duration-300 ease-in-out
                    ${activeAi
                    ? "scale-125 animate-pulse ring-4 ring-rose-300 rounded-full p-1 bg-white shadow-xl"
                    : "animate-bounce"
                    }
                    `}
            />
        </div>
    )
}

export default Robot