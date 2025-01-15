import PropTypes from "prop-types";
import React, { useState } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

export default function Token({address="FDPrMr3Kdy8CZP4yefnyiTrYgHBAzPbC2DaiHBxPV7ms"}) {
    const token = address;
    const [copied, setCopied] = useState(false);
    const copyHandle = () => {
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }
    return (
        <div className="token w-full rounded-2xl md:rounded-3xl bg-white flex items-center max-w-max border-2 md:border-[3px] border-black relative z-[1] px-4 md:px-6 xl:px-10 py-4 md:py-5 xl:py-[23px] gap-6">
            <p className="text-[#1B1919] font-semibold !leading-[120%] text-lg md:text-[25px] flex items-center gap-1 line-clamp-1 text-nowrap ">CA: <span className="text-lg md:text-[23px] font-normal tracking-[1.38px]">{token}</span></p>
            <button onClick={() => copyHandle()} className="bg-transparent p-0 border-0 text-black text-2xl md:text-[40px] xl:text-[52px]">
                {copied ? <LuCopyCheck /> : <LuCopy />}
            </button>
        </div>
    )
}

Token.propType = {
    address:PropTypes.string
}