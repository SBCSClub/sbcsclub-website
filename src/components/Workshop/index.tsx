import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useDimensions from "../../hooks/useDimensions";

export interface IWorkshopProps {
    name: string; 
    images: string[];
    teachers: string; 
    description?: string; 
    prereq?: string;
    topics?: string[];
    workshop: string | null; 
    setWorkshop: (e:string | null) => void; 
}

const Workshop : React.FC<IWorkshopProps> = ({ 
    setWorkshop, 
    workshop, 
    name, 
    teachers, 
    images, 
    description,
    prereq,
    topics
}) => {
    const [ expanded, setExpanded ] = useState(false);
    const [ boxProperties, setBoxProperties ] = useState<{
        left?: number,
        top?: number,
        width?: number,
        height?: number,
    }>({
        left: 0,
        top: 0,
        width: undefined,
        height: 310
    })

    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleExpand = useCallback((e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!containerRef.current) return; 

        if (workshop !== null) {
            setWorkshop(null);
        }

        const nextExpanded = !expanded;
        setExpanded(nextExpanded);

        if (nextExpanded) {
            const { x, y } = containerRef.current.getBoundingClientRect();

            const contentHeight = containerRef.current.scrollHeight; 
            const height = contentHeight < window.innerHeight - 75 ? Math.max(contentHeight + 30, 480) : 520; 
            const targetWidth = Math.min(window.innerWidth - 32, 440);

            const leftGoal = Math.max(16, (window.innerWidth / 2) - (targetWidth / 2)); 
            const leftAdjustment = leftGoal - x;

            const topGoal = Math.max(60, (window.innerHeight / 2) - (height / 2)); 
            const topAdjustment = topGoal - y;

            setWorkshop(name);
            setBoxProperties({
                left: leftAdjustment,
                top: topAdjustment,
                height: height,
                width: targetWidth
            });

            window.document.body.style.overflow = "hidden";
        } else {
            setWorkshop(null);
            setBoxProperties({
                left: 0,
                top: 0,
                height: undefined,
                width: undefined
            });

            window.document.body.style.overflow = "auto";
        }
    }, [ expanded, name, setWorkshop, workshop ]);

    const { width, height } = useDimensions({ enableDebounce: true });

    const dimensionsRef = useRef({ width: width, height: height });

    useEffect(() => {
        if (!expanded || !containerRef.current || boxProperties.left === 0 || boxProperties.top === 0) {
            dimensionsRef.current = { width, height };
            return;
        }

        if (width === dimensionsRef.current.width && height === dimensionsRef.current.height) {
            dimensionsRef.current = { width, height };
            return; 
        } 

        setExpanded(false);
        setBoxProperties({
            height: undefined,
            width: undefined,
            left: 0,
            top: 0
        })

        window.document.body.style.overflow = "auto";
        dimensionsRef.current = { width, height };
    }, [ expanded, width, height, boxProperties ]);

    useEffect(() => {
        if (workshop !== null && workshop !== name && expanded) {
            setExpanded(false);
            setBoxProperties({
                left: 0,
                top: 0,
                height: undefined,
                width: undefined
            });
        }
    }, [ workshop, name, expanded ]);

    const getPrereqColor = (p?: string) => {
        if (!p) return "border-white/10 bg-white/5 text-white/70";
        if (p.toLowerCase().includes("none") || p.toLowerCase().includes("zero") || p.toLowerCase().includes("no prior")) {
            return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
        }
        if (p.toLowerCase().includes("ap") || p.toLowerCase().includes("csa")) {
            return "border-red-500/30 bg-red-500/10 text-red-400";
        }
        return "border-[#fcc001]/30 bg-[#fcc001]/10 text-[#fcc001]";
    };

    return (
        <div className="relative w-[300px] my-4 mx-3 h-[320px]">
            <div 
                ref={containerRef}
                style={{ 
                    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: expanded ? 999 : undefined,
                    overflowY: expanded ? "auto" : "hidden",
                    ...boxProperties,
                }}
                onClick={handleExpand}
                className={clsx(
                    "flex absolute w-[300px] border-[rgba(255,255,255,0.12)] border flex-col items-center bg-[#101015] rounded-xl p-5 z-10 cursor-pointer shadow-xl",
                    !expanded && "h-[320px] bg-opacity-70 hover:border-[#fcc001]/40 hover:bg-opacity-90 hover:scale-[1.02]",
                    expanded && "shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-[#fcc001]/50 bg-[#121218]"
                )}>
                {
                    expanded && (
                        <button 
                            type="button"
                            aria-label="Close workshop details"
                            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
                        >
                            <FontAwesomeIcon 
                                width={16} 
                                icon={faXmark} 
                            />
                        </button>
                    )
                }

                {/* Prerequisite Pill */}
                {prereq && (
                    <div className="mb-2">
                        <span className={clsx("text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border", getPrereqColor(prereq))}>
                            {prereq}
                        </span>
                    </div>
                )}

                <div className="my-2 flex justify-center items-center">
                    {
                        images.map((url, index) => (
                            <Image 
                                key={index}
                                objectFit="contain" 
                                width={90}
                                height={90}
                                src={url} 
                                alt={`${name} workshop`}
                                style={{ borderRadius: "10px" }}
                            />
                        ))
                    }
                </div>
                <div className="flex flex-col items-center space-y-1 mt-1 text-center">
                    <h3 className="text-white font-semibold text-lg">{ name }</h3>
                    <p className="text-[#fcc001] font-medium text-xs">Leads: <span className="text-white/80">{ teachers }</span></p>
                </div>

                {!expanded && (
                    <div className="mt-auto pt-2">
                        <span className="text-xs text-white/50 group-hover:text-white flex items-center gap-1 font-mono">
                            Click for details -&gt;
                        </span>
                    </div>
                )}

                <div 
                    style={{
                        opacity: expanded ? 1 : 0,
                        display: expanded ? "block" : "none"
                    }}
                    className="mt-4 w-full text-left space-y-4 transition-opacity">
                    
                    <div>
                        <h4 className="text-xs font-semibold text-[#fcc001] uppercase tracking-wider">About Workshop</h4>
                        <p className="text-white/80 text-sm mt-1 leading-relaxed">
                            { description }
                        </p>
                    </div>

                    {topics && topics.length > 0 && (
                        <div>
                            <h4 className="text-xs font-semibold text-[#77deff] uppercase tracking-wider">Core Topics Covered</h4>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {topics.map((t, idx) => (
                                    <span key={idx} className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs text-white/50 font-mono">
                        <span>Meeting Slot: 2026-27 Bi-Monthly</span>
                        <span>Click X to close</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workshop;