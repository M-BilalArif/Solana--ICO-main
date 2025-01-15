import Time from './Time'
import logo1 from '../assets/img/banner-logo1.png'
import logo2 from '../assets/img/banner-logo2.png'
import logo3 from '../assets/img/logo.png'
import { useState } from 'react'

export default function BeforePresale({className,timeLeft}) {
    return (
        <div className={`max-w-[476px] banner-card border border-black bg-[#F6F6F6] rounded-3xl overflow-hidden ${className}`}>
            <div className="bg-[#A6DFF5] py-[14px] text-center">
                <p className='text-base md:text-lg lg:text-xl text-black !leading-[1.4] font-Gliker font-normal'>Presale start in:</p>
            </div>
            <div className="pb-6 pt-5 md:pt-8 lg:pt-10 bg-[#FFEF77] border-b border-black rounded-br-3xl rounded-bl-3xl px-5 lg:px-6 xl:px-8">
                <Time timeLeft={timeLeft} />
                <p className='text-black text-xs text-center !leading-none mt-7 md:mt-8 lg:mt-10'>Get Ready to Invest in a Purpose-Driven Crypto!</p>
            </div>
        </div>
    )
}
