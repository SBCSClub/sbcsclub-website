import React from "react";

interface IMeetingDateProps {
    date: string; 
    note?: string;
    isHighlighted?: boolean;
}

const MeetingDate : React.FC<IMeetingDateProps> = ({ date, note, isHighlighted }) => {
    return (
        <div className={`p-3 flex justify-between items-center w-full sm:min-w-[220px] rounded-lg transition-all ${
            isHighlighted 
                ? "border border-[#fcc001]/40 bg-[#fcc001]/10 shadow-[0_0_15px_rgba(252,192,1,0.15)]" 
                : "border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
        }`}>  
            <span className={`text-sm md:text-base font-medium ${isHighlighted ? "text-white font-semibold" : "text-white/80"}`}>
                { date }
            </span>
            {note && (
                <span className={`text-xs px-2 py-0.5 rounded-full ml-2 font-mono ${
                    isHighlighted ? "bg-[#fcc001] text-black font-semibold" : "bg-white/10 text-white/70"
                }`}>
                    {note}
                </span>
            )}
        </div>
    )
}

export default MeetingDate;