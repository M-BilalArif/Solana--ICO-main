import PropTypes from "prop-types";
import { useState } from "react";

export default function Accordion({ items, activeItem }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? activeItem : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item bg-white border-solid border-[2px] md:border-[3px] border-[#0B1A34] rounded-2xl md:rounded-[20px] lg:rounded-[24px]">
          <button onClick={() => toggleAccordion(index)} className={`!border-0 accordion-button flex items-center justify-between w-full ${activeIndex === index ? "" : "collapsed"}`}>
            <span className='text-[#0B1A34] font-Gliker text-sm md:text-base lg:text-lg font-bold !leading-[100%]'>{item.title}</span>
            {activeIndex != index ? (
              <div className="bg-[#0B1A34] text-white p-1 md:p-2 rounded-[8px]  md:w-[32px] md:h-[32px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12C24 11.4237 23.5328 10.9565 22.9565 10.9565H15.0435C13.9389 10.9565 13.0435 10.0611 13.0435 8.95652V1.04348C13.0435 0.467182 12.5763 0 12 0C11.4237 0 10.9565 0.467181 10.9565 1.04348V8.95652C10.9565 10.0611 10.0611 10.9565 8.95652 10.9565H1.04348C0.467182 10.9565 0 11.4237 0 12C0 12.5763 0.467181 13.0435 1.04348 13.0435H8.95652C10.0611 13.0435 10.9565 13.9389 10.9565 15.0435V22.9565C10.9565 23.5328 11.4237 24 12 24C12.5763 24 13.0435 23.5328 13.0435 22.9565V15.0435C13.0435 13.9389 13.9389 13.0435 15.0435 13.0435H22.9565C23.5328 13.0435 24 12.5763 24 12Z" fill="currentColor" />
            </svg>
            </div>
            ) : (
            <div className="bg-[#0B1A34] flex items-center text-white p-1 md:p-2 rounded-[8px] w-[24px] h-[24px] md:w-[32px] md:h-[32px] ">
              <svg width="16" height="4" viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.0435 0.956543H22.9565C23.5328 0.956543 24 1.42372 24 2.00002C24 2.57632 23.5328 3.0435 22.9565 3.0435H13.0435H10.9565H1.04348C0.467181 3.0435 0 2.57632 0 2.00002C0 1.42372 0.467182 0.956543 1.04348 0.956543H10.9565H13.0435Z" fill="currentColor" />
            </svg>
            </div>
            )}
          </button>
          <div className={`accordion-body -mt-[var(--padding)] font-bold text-sm !leading-normal ${activeIndex != index ? "" : "collapsed"}`}
            dangerouslySetInnerHTML={{ __html: item.body }}
          ></div>
        </div>
      ))}
    </div>
  );
}

Accordion.propTypes = {
  items: PropTypes.array,
  activeItem: PropTypes.number
}