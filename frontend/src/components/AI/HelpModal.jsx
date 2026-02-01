import React from 'react';
import { FaMicrophoneAlt } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { FaRegLightbulb } from "react-icons/fa";

const HelpModal = ({ setShowHelpModal }) => {

    const closeHelpModal = () => {
        setShowHelpModal(false);
    };

    return (
        <div
            onClick={closeHelpModal}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl bg-opacity-50 p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white p-4 sm:p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <BsRobot className="text-2xl sm:text-3xl md:text-4xl" />
                            <div>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Navigation Bot</h2>
                                <p className="text-xs sm:text-sm opacity-90">Voice-Controlled Navigation Assistant</p>
                            </div>
                        </div>
                        <button onClick={closeHelpModal} className="text-2xl sm:text-3xl hover:text-gray-200 transition-colors">
                            ×
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">

                    {/* What is this? */}
                    <div className="mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                            <span className="text-xl sm:text-2xl"><BsRobot /></span>
                            What is this?
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            This is a voice-controlled navigation bot that can open different pages on the website by listening to your voice commands.
                            Just click on the robot icon and speak your command!
                        </p>
                    </div>

                    {/* How to Use */}
                    <div className="mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                            <span className="text-xl sm:text-2xl"><FaMicrophoneAlt /></span>
                            How to Use?
                        </h3>
                        <ol className="list-decimal list-inside text-sm sm:text-base text-gray-600 space-y-1.5 sm:space-y-2">
                            <li className='flex items-center gap-1'>Click on the robot icon <BsRobot /></li>
                            <li>When the icon grows and pulses, speak your command</li>
                            <li>The bot will respond and navigate to the page</li>
                        </ol>
                    </div>

                    {/* Available Commands */}
                    <div className="mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                            <span className="text-xl sm:text-2xl"><CgNotes /></span>
                            Available Commands
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                            <CommandItem command="Open home" description="Navigates to the Home page" />
                            <CommandItem command="Open about" description="Navigates to the About page" />
                            <CommandItem command="Open collection / products" description="Opens the Collections page" />
                            <CommandItem command="Open wishlist" description="Opens your wishlist (Login required)" />
                            <CommandItem command="Open cart" description="Opens your shopping cart (Login required)" />
                            <CommandItem command="Open profile" description="Opens your profile (Login required)" />
                            <CommandItem command="Open order" description="Shows your orders (Login required)" />
                            <CommandItem command="Open contact" description="Opens the Contact page" />
                            <CommandItem command="Login" description="Opens the Login page" />
                            <CommandItem command="Logout" description="Logs you out of your account" />
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded">
                        <h4 className="font-bold flex items-center gap-1 text-blue-800 mb-2 text-sm sm:text-base">
                            <FaRegLightbulb /> Pro Tips:
                        </h4>
                        <ul className="text-blue-700 text-xs sm:text-sm space-y-1 list-disc list-inside">
                            <li>Speak clearly and slowly for better recognition</li>
                            <li>Wait 1 second before speaking after clicking the icon</li>
                            <li>If the command isn't recognized, try again</li>
                            <li>Make sure to allow microphone permissions</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-100 p-3 sm:p-4 rounded-b-lg flex justify-end">
                    <button
                        onClick={closeHelpModal}
                        className="bg-rose-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors font-medium text-sm sm:text-base">
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HelpModal;

const CommandItem = ({ command, description }) => (
    <div className="flex items-start gap-3 border-b border-gray-200 pb-2 last:border-0 last:pb-0">
        <span className="text-rose-600 font-mono text-sm font-semibold mt-0.5">"{command}"</span>
        <span className="text-gray-600 text-sm flex-1">→ {description}</span>
    </div>
)