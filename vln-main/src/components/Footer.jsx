import { Container, Row, Col } from './Grid'
import logo from '../assets/img/logo.png'
import footer_shape from '../assets/img/footer-shape.png'
import star from '../assets/img/footer-star.png'
import dex_scane from '../assets/img/dexscreener.png'
import dextool from '../assets/img/dextools.png'

import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import { twitter, telegram, instagram, dexscreener, dextools } from './PageLinks';
import Social from './Social';

export default function Footer() {

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
      name: 'instagram',
      icon: <FaInstagram />,
      url: instagram,
    },
    // {
    //   name: '',
    //   icon: (<img src={dex_scane} />),
    //   url: dexscreener,
    // },
    // {
    //   name: '',
    //   icon: (<img src={dextool} />),
    //   url: dextools,
    // }
  ];
  return (
    <div className='footer overflow-hidden pt-16 md:pt-20 lg:pt-28 xl:pt-[130px] pb-8 md:pb-12 lg:pb-16 xl:pb-[88px]'>
      <Container className='relative'>
        <div className="absolute left-0 top-0 -z-10"><img src={star} alt="" /></div>
        <Row>
          <Col xs={12} className='text-center'>
            <div className="relative mb-2 lg:mb-6 xl:mb-8">
              <img src={logo} alt="" className='mx-auto size-24 md:size-32 lg:size-auto' />
              <img src={footer_shape} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 mt-[10%]' alt="" />
            </div>
            <h3 className='font-bold text-6xl md:text-7xl lg:text-[100px] !leading-relaxed text-white md-2 md:mb-4 lg:mb-6 xl:mb-8'>$VLN</h3>
            <p className='text-[#0B1A34] font-Gliker font-normal !leading-[110%] text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 lg:mb-6 tracking-[0.24px]'>Followed Us</p>
            <Social className='justify-center mb-4 md:mb-6 lg:mb-8' socialIcons={socialIcons} />
            <p className='text-[#0B1A34] font-Gliker font-normal !leading-[110%] text-base md:text-lg lg:text-xl tracking-[0.2px]'>Copyright: © 2024 $VLN. All Rights Reserved.D</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
