import React from 'react'
import PropTypes from 'prop-types'

export default function Social({ className = "", socialIcons = [] }) {
  return (
    <ul className={`social-list flex items-center flex-wrap gap-4 ${className}`}>
      {socialIcons.map((item, index) => (
        <li key={index}>
          <a href={item.url} target="_blank" className="shadow-[2.5px_2.5px_0px_0px_#000] hover:shadow-none hover:scale-95 social-link flex items-center justify-center w-[var(--width)] h-[var(--width)] text-2xl border border-solid border-[#354764] bg-white rounded-lg text-black">
            {item.icon}
          </a>
        </li>
      ))}
    </ul>
  )
}


Social.propTypes = {
  className: PropTypes.string,
}