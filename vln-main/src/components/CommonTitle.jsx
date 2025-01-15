import React from 'react'
import PropTypes from "prop-types"
CommonTitle.propTypes = {
  subTitle:PropTypes.string,
  title:PropTypes.string,
  des:PropTypes.string,
  className:PropTypes.string,
}

export default function CommonTitle({ subTitle, title, des, className='' }) {
    return (
      <div className={`common-title ${className}`}>
        {subTitle ? (<span className='block'>{subTitle}</span>) : ''}
        <h2>{title}</h2>
        {des ? (<p>{des}</p>) : ''}
      </div>
    )
  }
  