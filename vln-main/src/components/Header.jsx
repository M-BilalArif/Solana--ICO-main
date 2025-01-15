import { useEffect, useState } from 'react';
import { Container } from './Grid'
import { Link } from 'react-scroll';
import Logo from './Logo';
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import { twitter, telegram, instagram, buy_now, } from './PageLinks';
import Social from './Social';
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
export default function Header() {
  const navLinks = [
    {
      btn_title: 'About',
      to: 'about',
      offset: 0,
    },
    {
      btn_title: 'How To Buy',
      to: 'howto',
      offset: 0,
    },
    {
      btn_title: 'Tokenomics',
      to: 'tokenomics',
      offset: 0,
    },
    {
      btn_title: 'Roadmap',
      to: 'roadmap',
      offset: 0,
    },
    {
      btn_title: 'Faq',
      to: 'faq',
      offset: -100,
    },
  ];
  const [isMenu, setIsMenu] = useState(false);
  const handleTouchStart = () => {
    setIsMenu(!isMenu);
  };

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScroll = window.scrollY > 200;
      setScrolled(isScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled, setScrolled]);


  const socialIcons = [
    {
      name: 'twitter',
      icon: <FaXTwitter />,
      url: twitter
    },
    {
      name: 'telegram',
      icon: <FaTelegramPlane />,
      url: telegram
    },
    {
      name: '',
      icon: <FaInstagram />,
      url: instagram
    }
  ];

  return (
    <>
      <header className={`heading ${scrolled ? 'position-fixed' : ''}`}>
        <Container>
          <div className='heading-wrap flex items-center'>
            <div className="flex items-center mr-auto md:gap-10 lg:gap-14 xl:gap-16">
              <Logo />
              <nav className={`heading-menu ${isMenu ? 'show-menu' : ''}`}>
                <div className="title flex items-center justify-between lg:hidden">
                  <Logo />
                  <button className="heading-toggler" onClick={() => setIsMenu(!isMenu)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <g clipPath="url(#clip0_4181_4837)">
                        <path d="M30 10L10 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 10L30 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_4181_4837">
                          <rect width="40" height="40" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
                <ul className="lg:flex gap-1 items-center">
                  {navLinks.map((link, index) => (
                    <li key={index} className={`block ${index === navLinks.length - 1 ? 'mb-0' : 'mb-2 lg:mb-0'}`}>
                      <Link className="heading-link capitalize" to={link.to} spy={true} smooth={true} duration={600} offset={link.offset} onClick={() => window.innerWidth <= 991 && handleTouchStart(link.to)}>{link.btn_title}</Link>
                    </li>
                  ))}
                  <li className="lg:hidden mt-6">
                    <Social className='justify-center' socialIcons={socialIcons} />
                  </li>
                </ul>
              </nav>
            </div>
            {/* aithay kithay masla e */}
            <div className="heading-actions flex items-center flex-wrap gap-4">
              <div className="hidden md:block">
                <Social socialIcons={socialIcons} />
              </div>
              <a   className='btn'><WalletMultiButton/></a>
           
              <button className="heading-toggler lg:hidden" onClick={() => setIsMenu(!isMenu)}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_4181_4831)">
                    <path d="M6.66504 10H33.3317" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.66504 20H33.3317" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.66504 30H33.3317" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_4181_4831">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

    </>
  )
}
