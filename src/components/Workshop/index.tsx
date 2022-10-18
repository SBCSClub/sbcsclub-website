import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";

interface IWorkshopProps {
    name: string; 
    images: string[];
    teachers: string; 
    description?: string; 
}

const Workshop : React.FC<IWorkshopProps> = ({ name, teachers, images, description }) => {
    const [ expanded, setExpanded ] = useState(false);
    const [ boxProperties, setBoxProperties ] = useState({
        left: 0,
        top: 0,
        width: 280,
        height: 280
    })

    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleExpand = useCallback((e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!containerRef.current) return; 

        setExpanded(true);

        
    }, []);

    return (
        <div className="relative w-[280px] my-3 mx-3 h-[280px]">
            <div 
                ref={containerRef}
                style={{ 
                    zIndex: expanded ? 999 : undefined,
                    overflow: expanded ? "auto" : "hidden",
                    ...boxProperties
                }}
                onClick={handleExpand}
                className="flex transition-all absolute w-[280px] my-3 mx-3 h-[280px] border-[rgba(255,255,255,0.1)] border flex-col items-center bg-[#111111] rounded-md p-6 z-10 bg-opacity-50">
                <div className="my-3">
                    {
                        images.map((url, index) => (
                            <Image key={index} objectFit="contain" width={100} height={100} src={url} />
                        ))
                    }
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <h1 className="text-white font-medium text-xl text-center">{ name } </h1>
                    <h2 className="text-white opacity-75 text-base">{ teachers }</h2>
                </div>
                <div 
                    style={{
                        opacity: expanded ? 1 : 0
                    }}
                    className="my-3">
                    <p className="text-white font-normal">
                        { description }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Workshop;