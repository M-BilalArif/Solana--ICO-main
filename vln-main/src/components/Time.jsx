import React, { useEffect, useState } from 'react'

export default function Time({ timeLeft }) {
    const isTimeUp = Object.values(timeLeft).every(value => value === 0);
    return (
        <div className='w-full mb-2 md:mb-5 xl:mb-6 scale-[.8] md:scale-100'>
            <div className="flex items-center text-white justify-center">
                {isTimeUp ?
                    <p className='text-lg text-black text-center'>Presale Started</p>
                    :
                    Object.keys(timeLeft).map((interval, index) => (
                        <div key={index} className="time-box text-center">
                            <div className="text-[#0A0228] text-opacity-80 text-[15px] font-semibold leading-normal font-Gliker capitalize text-center  mb-3 md:mb-3">{interval}</div>
                            <div className="flex items-center text-center gap-[3px]">
                                <span className={`block mx-1 text-black ${index == 0 ? 'opacity-0 invisible hidden' : ''}`}>:</span>
                                {timeLeft[interval]?.toString().split("").map((item, i) => (
                                    <div key={i} className="text-lg md:text-xl py-2 md:py-[6px] px-4 border border-black rounded-[11px] w-[44px] inline-flex items-center justify-center bg-[#FAFAFA] text-black !leading-relaxed">{item === "0" ? "0" : item}</div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
