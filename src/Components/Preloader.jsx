// src/components/Preloader.jsx
import React, { useState, useEffect } from 'react';

const Preloader = ({ isLoading }) => {
    // This state controls the slide-out animation
    const [isHiding, setIsHiding] = useState(false);
    // This state will remove the component from the DOM after the animation is done
    const [isGone, setIsGone] = useState(false);

    useEffect(() => {
        // When the parent component tells us loading is finished...
        if (!isLoading) {
            // ...trigger the slide-out animation.
            setIsHiding(true);

            // Set a timer to remove the component completely after the animation finishes.
            // The duration should match the longest transition duration below (1000ms = 1s).
            const timer = setTimeout(() => {
                setIsGone(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    // If the component is "gone", render nothing.
    if (isGone) {
        return null;
    }

   return (
        <div 
            className={`fixed inset-0 bg-[#3a2d21] z-50 flex overflow-hidden transition-opacity duration-500 ease-in-out ${isHiding ? 'opacity-0' : 'opacity-100'}`}
        >
            {/* Left Door */}
            <div 
                className={`absolute top-0 left-0 h-full w-1/2 bg-[url('/wood-texture.jpg')] bg-cover bg-right flex justify-end items-center transition-transform duration-[3000ms] ease-in-out ${isHiding ? '-translate-x-full' : 'translate-x-0'}`}
            >
                {/* --- NEW WRAPPER DIV --- */}
                {/* This allows us to stack the title and subtitle vertically */}
                <div className="flex flex-col items-end pr-4 text-right">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider drop-shadow-lg">
                        Surulere Flood
                    </h1>
                    {/* --- NEW SUBTITLE --- */}
                    <p className="mt-2 text-xl text-gray-300 font-light drop-shadow-md">
                        created by
                    </p>
                </div>
            </div>

            {/* Right Door */}
            <div 
                className={`absolute top-0 right-0 h-full w-1/2 bg-[url('/wood-texture.jpg')] bg-cover bg-left flex justify-start items-center transition-transform duration-[3000ms] ease-in-out ${isHiding ? 'translate-x-full' : 'translate-x-0'}`}
            >
                {/* --- NEW WRAPPER DIV --- */}
                <div className="flex flex-col items-start pl-4 text-left">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider drop-shadow-lg">
                        Hazard Map
                    </h1>
                    {/* --- NEW SUBTITLE --- */}
                    <p className="mt-2 text-xl text-gray-300 font-light drop-shadow-md">
                        Idowu Olamide
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Preloader;