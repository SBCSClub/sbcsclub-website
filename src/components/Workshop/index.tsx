import Image from "next/image";
import React, { useState } from "react";

interface IWorkshopProps {
    name: string; 
    images: string[];
    teachers: string; 
    description?: string; 
}

const Workshop : React.FC<IWorkshopProps> = ({ name, teachers, images, description }) => {
    const [ expanded, setExpanded ] = useState(false);

    return (
        <div onClick={(() => setExpanded(!expanded))} className="relative w-[280px] my-3 mx-3 h-[280px]">
            <div 
                style={{ 
                    // width: expanded ? "100vw" : 280,
                    // height: expanded ? "100vh" : 280,
                    zIndex: expanded ? 999 : undefined
                }}
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
            </div>
        </div>
    )
}

export default Workshop;