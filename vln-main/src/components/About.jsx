import { Container, Row, Col } from './Grid'
import Marquee from 'react-fast-marquee'

import man from '../assets/img/about/about-man-img.png'
import logo from '../assets/img/about/about-logo.png'
import img1 from '../assets/img/about/featured-img-1.png'
import img2 from '../assets/img/about/featured-img-2.png'
import img3 from '../assets/img/about/featured-img-3.png'
import img4 from '../assets/img/about/featured-img-4.png'
import line from '../assets/img/border-shap.png'
import overlay from '../assets/img/color-shape.png'

export default function About() {
  const about = [
    {
      img: img1,
      url: '',
    },
    {
      img: img2,
      url: '',
    },
    {
      img: img3,
      url: '',
    },
    {
      img: img4,
      url: '',
    },
  ]
  return (
    <div className='about pt-[150px] lg:pt-20 xl:pt-[70px] bg-[#FEDB63] relative z-[1]'>
      <div className='absolute bottom-full left-0 w-full '>
        <img src={line} className='left-0 w-full h-auto z-[-1]' alt="" />
      </div>
      <Container>
        <Row>
          <Col xs={12}>
            <div className='flex justify-center'>
              <div>
                <div className='relative z-[-2] -mb-32 md:-mb-36 lg:-mb-48 xl:-mb-52'>
                  <img src={man} className='max-w-[70%] lg:max-w-[582px]' alt="" />
                </div>
                <div className='about-text bg-[#A6E0F5] p-[19px_18px_19px_22Px]  md:p-[49px_38px_49px_42Px]  lg:p-[60px_38px_60px_62Px]  xl:p-[69px_38px_69px_62Px] max-w-[1078px] rounded-xl md:rounded-2xl lg:rounded-3xl shadow-[6px_6px_0px_0px_#000;] lg:shadow-[8px_8px_0px_0px_#000;] mb-12 card'>
                  <h2 className='text-[50px] text-black font-Gliker font-medium leading-[140%] mb-2 lg:mb-4 uppercase'>about</h2>
                  <p className='text-lg md:[24px] lg:text-[30px] xl:text-[32px] text-[#161616] font-Gliker font-normal leading-[150%] uppercase'>VorlunCoin (VLN) is a cryptocurrency built on the Solana network, designed for efficiency and scalability. Our mission is to create a reliable digital asset that supports animal shelters worldwide. With fast transactions and low fees, VorlunCoin aims to make a meaningful impact while fostering growth within the crypto community.</p>
                </div>
              </div>
            </div>
            <a href='https://app.solidproof.io/projects/vorlun' target='_blank' className='hover:shadow-none flex gap-3 md:gap-6 px-6 md:px-[60px] lg:px-[90px] xl:px-[129px] py-3 md:py-[20px] lg:py-[29px] justify-center items-center w-max mx-auto border border-[#A6E0F5] bg-[#D54339] rounded-xl shadow-[3px_3px_0px_0px_#000;] mb-8 md:mb-10 lg:mb-12 xl:mb-[72px]'>
              <img src={logo} alt="" />
              <p className='text-[28px] font-Gliker font-semibold text-white leading-[140%] uppercase'>Audit</p>
            </a>
            <div className='text'>
              <h2 className='text-[50px] text-black text-center font-Gliker font-normal leading-[140%] uppercase mb-6 lg:mb-8 xl:mb-11'>fEATURED IN</h2>
            </div>
          </Col>
        </Row>
      </Container>
      <div className='flex items-center justify-center bg-[#D54339] py-6 border-l-0 border-r-0 border-4 border-black relative z-[1]'>
        <div className="hidden md:block absolute top-0 left-0 w-auto h-full z-[2]">
          <img src={overlay} className='md:-mx-10 lg:w-auto h-full' alt="" />
        </div>
        <div className="hidden md:block absolute top-0 right-0 -scale-x-100 w-auto h-full z-[2]">
          <img src={overlay} className='md:-mx-10 lg:w-auto h-full' alt="" />
        </div>
        <Marquee speed={70} direction='left' autoFill={true}>
          {about.map((item, index) => (
            <div className="flex items-center justify-center w-[200px] md:w-[260px] lg:w-[330px] h-[78px] bg-white py-2 md:py-3 lg:py-[14px] px-2 md:px-8 lg:px-[42] xl:px-[58px] border border-solid border-black rounded-[7px] mr-4 md:mr-6" key={index}>
              <img className="" src={item.img} alt="" />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
