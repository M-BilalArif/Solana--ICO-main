import PropTypes from "prop-types";
import React, { useState } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

export default function Token({ address = "FDPrMr3Kdy8CZP4yefnyiTrYgHBAzPbC2DaiHBxPV7ms" }) {
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
        <div className="">
            <p className="text-black text-center md:text-end font-semibold !leading-[120%] text-xl md:text-[25px] mb-2">Contract: </p>
            <div className="flex items-center gap-4">
                <p className="text-black opacity-80 font-normal !leading-[120%] text-base "> {token.substring(0, 4)}.............{token.substring(token.length - 9)}</p>
                <button onClick={() => copyHandle()} className="bg-transparent p-0 border-0 text-black text-[24px]">
                    {copied ? <LuCopyCheck /> : <LuCopy />}
                </button>
            </div>
        </div>
    )
}

Token.propType = {
    address: PropTypes.string
}