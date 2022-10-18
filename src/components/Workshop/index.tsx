import clsx from "clsx";
import exp from "constants";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface IWorkshopProps {
    name: string; 
    images: string[];
    teachers: string; 
    description?: string; 
    workshop: string | null; 
    setWorkshop: (e:string | null) => void; 
}

const Workshop : React.FC<IWorkshopProps> = ({ setWorkshop, workshop, name, teachers, images, description }) => {
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

        if (!!workshop) {
            setWorkshop(null);
        }

        setExpanded(!expanded);

        if (!expanded) {
            const { x, y, width } = containerRef.current.getBoundingClientRect();

            const contentHeight = containerRef.current.scrollHeight; 
            const height = contentHeight < window.innerHeight - 75 ? contentHeight : 500; 

            const leftGoal = Math.abs((window.innerWidth / 2) - (width / 2)); 
            const leftAdjustment = leftGoal - x;

            const topGoal = Math.abs((window.innerHeight / 2) - (height / 2)); 
            const topAdjustment = topGoal - y;

            setWorkshop(name);
            setBoxProperties({
                ...boxProperties,
                left: leftAdjustment,
                top: topAdjustment,
                height: height
            });

            window.document.body.style.overflow = "hidden";
        }  else {
            setWorkshop(null);
            setBoxProperties({
                left: 0,
                top: 0,
                height: 280,
                width: 280
            });

            window.document.body.style.overflow = "auto";
        }
    }, [ expanded, boxProperties, name, workshop, name  ]);

    
    useEffect(() => {
        if (workshop !== null && workshop !== name && expanded) {
            setWorkshop(null);
            setExpanded(false);
            setBoxProperties({
                left: 0,
                top: 0,
                height: 280,
                width: 280
            });
            window.document.body.style.overflow = "auto";
        }
    }, [ workshop ]);

    return (
        <div className="relative w-[280px] my-3 mx-3 h-[280px]">
            <div 
                ref={containerRef}
                style={{ 
                    transition: "all 300ms ease",
                    zIndex: expanded ? 999 : undefined,
                    overflow: expanded ? "auto" : "hidden",
                    ...boxProperties
                }}
                onClick={handleExpand}
                className={clsx(
                    "flex absolute w-[280px] my-3 mx-3 h-[280px] border-[rgba(255,255,255,0.1)] border flex-col items-center bg-[#111111] rounded-md p-6 z-10",
                    !expanded && "bg-opacity-50"
                )}>
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
                    className="my-3 transition-opacity">
                    <p className="text-white font-normal">
                        { description }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Workshop;