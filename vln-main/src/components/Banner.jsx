import { useState, useEffect } from 'react'
import { Container, Row, Col } from './Grid'
import BannerCard from './BannerCard'
import BeforePresale from './BeforePresale'
import dog from '../assets/img/dog.svg'
import Token from './Token2'
import shape from '../assets/img/banner-shape.png'
import cloud from '../assets/img/cloud.png'
import pdf_1 from '../assets/pdf/pdf-2.pdf'
import pdf_2 from '../assets/pdf/pdf-2.pdf'

import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
export default function Banner() {
  const targetDate = new Date("2025-01-06T23:59:59");
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      timeLeft.days = timeLeft.days <= 9 ? `0${timeLeft.days}` : timeLeft.days;
      timeLeft.hours = timeLeft.hours <= 9 ? `0${timeLeft.hours}` : timeLeft.hours;
      timeLeft.minutes = timeLeft.minutes <= 9 ? `0${timeLeft.minutes}` : timeLeft.minutes;
      timeLeft.seconds = timeLeft.seconds <= 9 ? `0${timeLeft.seconds}` : timeLeft.seconds;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`banner relative z-[2] ${timeLeft.days !== undefined && timeLeft.days >= 0?'!pb-28 lg:!pb-36':""}`}>
      <Container className='relative z-[1]'>
        <Row className='justify-center lg:justify-normal'>
          <Col xs={12} md={11} lg={6}>
            <div className="banner-content lg:max-w-[655px] mx-auto lg:mx-0 text-center lg:text-start">
              <h1 className='text-[#FEDB63] font-bold uppercase leading-normal font-Gliker mb-3 lg:mb-4'>Empowering Shelters, One Token at a Time</h1>
              
              <p className='lg:max-w-[540px] mx-auto lg:mx-0 text-black font-normal text-lg md:text-xl xl:text-[22px] font-indie mb-4 md:mb-6 lg:mb-9 xl:mb-10'>Vorlun combines the fun of crypto with a purpose supporting animal shelters. Built on Solana, every transaction helps provide care and hope to animals in need. Join us in making a difference, one token at a time!</p>
              <div className="flex items-center gap-4 justify-center lg:justify-normal">
                <a href={pdf_1} target='_blank' className="btn">Vorlun</a>
                <a href={pdf_2} target='_blank' className="btn btn2">White paper</a>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="relative lg:first:w-max bottom-[-73px]">
              <div>
                <img src={dog} className={`absolute bottom-[95%] -z-[1] left-1/2 -translate-x-1/2 ${timeLeft.days !== undefined && timeLeft.days >= 0 ? '-mb-5 md:-mb-2' : ''}`} alt="" />
              </div>
              <div className="flex lg:block justify-center mt-10 lg:mt-0">
                {/* {timeLeft.days !== undefined && timeLeft.days >= 0 ? */}
                  {/* // <BeforePresale timeLeft={timeLeft} className="mx-auto rounded-3xl" /> */}
                  // :
                  <BannerCard timeLeft={timeLeft} className="mx-auto rounded-3xl" />
                {/* } */}
              </div>
              <div className='w-[1068px] h-[1104px] absolute top-[17%] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10'>
                <img src={shape} className='' alt="" />
              </div>
            </div>
          </Col>
        </Row>
        <div className="hidden md:block absolute left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 -top-[70px] md:-top-16 lg:-top-12 md:right-6 lg:right-0">
          <Token />
        </div>
      </Container>
      <div className="absolute max-w-[30%] lg:max-w-full top-0 left-1/2 z-[2]  -translate-x-1/2 ">
        <img src={cloud} alt="" />
      </div>
    </div>
  )
}
