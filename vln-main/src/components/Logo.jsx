import React from 'react'
import logo from '../assets/img/logo.png'
import {Link} from 'react-scroll'

export default function Logo() {
  return (
    <Link className="logo block cursor-pointer" to="banner" spy={true} smooth={true} duration={600} offset={0}>
        <img className='w-10' src={logo} alt="site-logo" />
    </Link>
  )
}
