import React, { useContext, useState } from 'react';
import { productDataContext } from '../../store/ProductContext';
import { IoStar } from "react-icons/io5";
import { authDataContext } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';

const Review = ({ reviews, id }) => {

    // USE STATE
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState("");
    const [visibleReviews, setVisibleReviews] = useState(6);

    // USE NAVIGATE
    const navigate = useNavigate();

    // CONTEXT DATA
    const { submitReview } = useContext(productDataContext);
    const { loggedinUserData } = useContext(authDataContext);

    const showMoreReviews = () => {
        setVisibleReviews(reviews.length);
    };

    return (
        <div className="text-white w-full">
            {/* SECTION HEADING */}
            <h2 className="
                text-2xl sm:text-3xl md:text-4xl
                font-semibold
                mb-6 md:mb-8
            ">
                Customer <span className='text-rose-700'>Reviews</span>
            </h2>

            {/* REVIEW FORM */}
            <div className="
                mb-8 md:mb-12
                p-4 md:p-6
                bg-zinc-900
                rounded-xl
            ">
                {/* RATING SELECTOR */}
                <div className='
                    flex flex-col sm:flex-row 
                    sm:items-center
                    gap-3 sm:gap-4
                    mb-4
                '>
                    <label className="
                        text-sm md:text-base
                        font-medium
                    ">
                        Your Rating:
                    </label>
                    <div className="flex gap-1 text-2xl md:text-3xl cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <IoStar
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(null)}
                                className={`
                                    transition-colors duration-200
                                    hover:scale-110
                                    ${(hover || rating) >= star
                                        ? "text-yellow-400"
                                        : "text-gray-500"
                                    }
                                `}
                            />
                        ))}
                    </div>
                </div>

                {/* COMMENT TEXTAREA */}
                <textarea
                    placeholder="Write a review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="
                        w-full 
                        h-32 md:h-40
                        p-3 md:p-4
                        border border-zinc-700 
                        bg-zinc-800
                        rounded-lg
                        text-white 
                        text-sm md:text-base
                        outline-none
                        focus:ring-2 focus:ring-rose-600
                        transition-all duration-200
                        resize-none
                    "
                />

                {/* SUBMIT BUTTON */}
                <button
                    onClick={() => {
                        if (loggedinUserData) {
                            submitReview(rating, comment, id)
                        } else {
                            navigate('/auth');
                        }
                    }}
                    className="
                        bg-amber-600 
                        hover:bg-amber-700
                        text-white 
                        px-6 md:px-8
                        py-2.5 md:py-3
                        rounded-lg
                        mt-4
                        font-medium
                        text-sm md:text-base
                        transition-colors duration-200
                        hover:shadow-lg
                    ">
                    Submit Review
                </button>
            </div>

            {/* REVIEWS LIST */}
            <div className="space-y-4 md:space-y-6">
                {reviews?.length > 0 ? (
                    <>
                        {reviews.slice(0, visibleReviews).map((rev, i) => (
                            <div
                                key={i}
                                className="
                                    p-4 md:p-6
                                    rounded-xl
                                    bg-zinc-900 
                                    text-white
                                    hover:bg-zinc-800
                                    transition-colors duration-200
                                ">
                                {/* RATING AND DATE */}
                                <div className="
                                    flex flex-col sm:flex-row
                                    sm:items-center 
                                    sm:justify-between
                                    gap-2 sm:gap-4
                                ">
                                    <div className="flex text-yellow-400 text-lg md:text-xl">
                                        {Array.from({ length: rev.rating }, (_, i) => (
                                            <IoStar key={i} />
                                        ))}
                                    </div>
                                    <span className="
                                        text-xs md:text-sm
                                        text-gray-400
                                    ">
                                        {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>

                                {/* COMMENT */}
                                <p className="
                                    mt-3 md:mt-4
                                    text-sm md:text-base
                                    text-zinc-200
                                    leading-relaxed
                                ">
                                    {rev.comment}
                                </p>
                            </div>
                        ))}

                        {/* SHOW MORE BUTTON */}
                        {visibleReviews < reviews.length && (
                            <button
                                onClick={showMoreReviews}
                                className="
                                    text-zinc-400 
                                    hover:text-emerald-400
                                    underline underline-offset-4
                                    text-sm md:text-base
                                    mt-4
                                    transition-colors duration-200
                                "
                            >
                                See more reviews ({reviews.length - visibleReviews} more)
                            </button>
                        )}
                    </>
                ) : (
                    <div className="
                        p-8 md:p-12
                        text-center
                        bg-zinc-900
                        rounded-xl
                        text-zinc-400
                    ">
                        <p className="text-base md:text-lg">
                            No reviews yet. Be the first to review!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Review;