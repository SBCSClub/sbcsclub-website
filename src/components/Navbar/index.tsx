import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

const Navbar = () => {
    const [ minimized, setMinimized ] = useState(false);

    const handleScroll = useCallback(() => {
        if (window.scrollY > 100) {
            setMinimized(true);
        } else {
            setMinimized(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [ handleScroll ]);

    return (
        <div 
            style={{
                background: minimized ? "rgba(10, 10, 15, 0.75)" : "transparent",
                backdropFilter: minimized ? "blur(12px)" : undefined,
                WebkitBackdropFilter: minimized ? "blur(12px)" : undefined,
                borderBottom: minimized ? "1px solid rgba(255, 255, 255, 0.08)" : "transparent"
            }}
            className="fixed px-4 py-2 w-full z-50 transition-all duration-300">
            <nav className="max-w-7xl mx-auto flex justify-between items-center">
                <a href="#home" className="flex items-center space-x-3">
                    <div style={{ 
                        height: minimized ? 44 : 56, width: minimized ? 44 : 56 
                    }} className="relative transition-all duration-300">
                        <Image src={"/sbcsclub/logo.png"} layout="fill" objectFit="contain" alt="SBHS CS Club Logo" priority />
                    </div>
                    <span className="text-white font-semibold text-lg hidden sm:inline tracking-tight">SBHS <span className="text-[#fcc001]">CS Club</span></span>
                </a>
                <ul className="text-white text-sm md:text-base flex items-center space-x-3 md:space-x-6 p-2">
                    <li>
                        <a href="#home" className="hover:text-[#fcc001] transition-colors">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#overview" className="hover:text-[#fcc001] transition-colors">
                            Overview
                        </a>
                    </li>
                    <li>
                        <a href="#workshops" className="hover:text-[#fcc001] transition-colors">
                            Workshops
                        </a>
                    </li>
                    <li className="hidden sm:inline">
                        <a href="#events" className="hover:text-[#fcc001] transition-colors">
                            Events
                        </a>
                    </li>
                    <li className="hidden sm:inline">
                        <a href="#leadership" className="hover:text-[#fcc001] transition-colors">
                            Board
                        </a>
                    </li>
                    <li>
                        <a 
                            href="https://classroom.google.com/c/ODg1MjMwOTgxMDg4?cjc=b2bvgeri" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white text-black text-xs md:text-sm font-medium px-3.5 py-1.5 rounded-full hover:bg-[#fcc001] transition-all"
                        >
                            Join Classroom
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar; 