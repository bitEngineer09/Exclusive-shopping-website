import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import waterDrop from '../../assets/waterDrop.mp3';
import { authDataContext } from '../../store/AuthContext';
import HelpModal from './HelpModal';
import Robot from './Robot';
import Question from './Question';

const Ai = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [activeAi, setActiveAi] = useState(false);
    const navigate = useNavigate();
    const recognitionRef = useRef(null);
    const openingSound = new Audio(waterDrop);
    const { handleLogout, loggedinUserData } = useContext(authDataContext);
    const [showHelpModal, setShowHelpModal] = useState(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech recognition not supported in this browser.");
            toast.error("Speech recognition not supported.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript.trim().toLowerCase();
            console.log("Transcript:", transcript);

            if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
                speak("Opening search");
                setShowSearch(true);
                navigate("/collections");
            } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
                speak("Closing search");
                setShowSearch(false);
            } else if (transcript.includes("collection") || transcript.includes("product") || transcript.includes("products")) {
                speak("Opening collection page");
                navigate("/collections");
            } else if (transcript.includes("about")) {
                speak("Opening about page");
                navigate("/about");
                setShowSearch(false);
            } else if (transcript.includes("home")) {
                speak("Opening home page");
                navigate("/");
                setShowSearch(false);
            } else if (transcript.includes("wishlist")) {
                if (loggedinUserData) {
                    speak("Opening your wishlists");
                    navigate("/wishlist");
                } else {
                    speak("Please login to see your wishlist items");
                    navigate('/auth')
                }
                setShowSearch(false);
            } else if (transcript.includes("cart")) {
                if (loggedinUserData) {
                    speak("Opening your cart");
                    navigate("/cart");
                } else {
                    speak("Please login to access cart");
                    navigate('/auth')
                }
                setShowSearch(false);
            } else if (transcript.includes("profile")) {
                if (loggedinUserData) {
                    speak("Here is your profile");
                    navigate("/profile");
                } else {
                    speak("Please login to see your profile");
                    navigate('/auth')
                }
                setShowSearch(false);
            } else if (transcript.includes("order")) {
                if (loggedinUserData) {
                    speak("Showing your orders");
                    navigate("/myorder");
                } else {
                    speak("Please login to see your ordered items");
                    navigate('/auth')
                }
                setShowSearch(false);
            } else if (transcript.includes("contact")) {
                speak("Opening contact page");
                navigate("/contact");
                setShowSearch(false);
            } else if (transcript.includes("login")) {
                speak("Opening login page");
                navigate("/auth");
                setShowSearch(false);
            } else if (transcript.includes("logout")) {
                speak("Logging you out");
                handleLogout()
                navigate("/");
                setTimeout(() => {
                    window.location.reload();
                }, 500)
                setShowSearch(false);
            } else {
                speak("Command not recognized. Please try again.");
                toast.error("Command not recognized. Try again.");
            }
        };

        recognition.onerror = (e) => {
            console.error("Recognition error:", e);
            toast.error("Error with speech recognition.");
        };

        recognition.onend = () => {
            setActiveAi(false);
        };

        recognitionRef.current = recognition;
    }, [navigate, showSearch]);

    function speak(message) {
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    }

    const handleClick = () => {
        if (recognitionRef.current) {
            setActiveAi(true);
            recognitionRef.current.start();
            openingSound.play();
        } else {
            toast.error("Speech recognition not supported.");
        }
    };

    const handleHelpClick = (e) => {
        e.stopPropagation(); // Prevent triggering the AI activation
        setShowHelpModal(true);
    };


    return (
        <>
            <div className="fixed bottom-5 right-4 z-50 flex items-center gap-3 group">
                {/* Help/Question Mark Button */}
                <Question handleHelpClick={handleHelpClick} />

                {/* Robot Icon */}
                <Robot handleClick={handleClick} activeAi={activeAi} />
            </div>

            {/* Help Modal */}
            {showHelpModal && (
                <HelpModal showHelpModal={showHelpModal} setShowHelpModal={setShowHelpModal} />
            )}

        </>
    );
};



export default Ai;