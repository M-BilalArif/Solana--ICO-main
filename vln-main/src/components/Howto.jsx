import React from 'react'
import { Container, Row, Col } from './Grid'
import img1 from '../assets/img/howto/how-card-img-1.png'
import img2 from '../assets/img/howto/how-card-img-2.png'
import img3 from '../assets/img/howto/how-card-img-3.png'
import img4 from '../assets/img/howto/how-to-man-img.png'

export default function Howto() {
    const howto = [
        {
            img: img1,
            title: 'Connect Your Wallet',
            des: 'Visit our presale page and connect your wallet using one of the supported wallet options (e.g., MetaMask, Phantom, etc.).',
        },
        {
            img: img2,
            title: 'Choose Your Payment Option',
            des: 'Select your preferred payment method (e.g., USDT, SOL, or other supported currencies) and enter the amount of Vorlun Coin you want to purchase',
        },
        {
            img: img3,
            title: 'Complete Your Purchase',
            des: 'Confirm the transaction in your wallet and complete your purchase.',
        },
    ]
    return (
        <div className='howto pt-[60px] lg:pt-[90px] xl:pt-[130px] pb-[370px] md:pb-[172px] relative z-[1]'>
            <div className="image absolute -bottom-16 md:-bottom-14 lg:-bottom-16 xl:-bottom-[50px] 2xl:-bottom-[80px] left-8 md:left-0 lg:left-0 xl:left-20 2xl:left-[240px] z-[4]">
                <img src={img4} className='max-w-[300px] md:max-w-[300px] lg:max-w-[380px] xl:max-w-[385px] 2xl:max-w-[479px]' alt="" />
            </div>
            <Container>
                <Row>
                    <Col xs={12}>
                        <div className='max-w-[406px] lg:max-w-[512px]'>
                            <h2 className='text-[60px] text-center md:text-left md:text-[80px] lg:text-[90px] xl:text-[122px] text-[#030303] font-Gliker font-normal leading-[96px] tracking-[-2px] uppercase'>How to buy</h2>
                        </div>
                    </Col>
                </Row>
                <Row className='justify-end xl:-mr-[50px] md:-m-14'>
                    <Col xs={12} md={6} lg={5} className='relative'>
                        <div className='md:pr-6 lg:pr-12'>
                            {howto.map((item, index) => (
                                <div key={index} className={`w-full sm:w-[350px] lg:w-[380px] xl:w-[445px] p-[26px_24px_24px_20px] md:p-[44px_24px_28px_24px] lg:p-[54px_24px_38px_44px] xl:p-[64px_24px_48px_44px] bg-white border-[3px] overflow-hidden border-[#FFDF59] rounded-[20px] lg:rounded-[30px] xl:rounded-[40px] shadow-[6px_6px_0px_0px_#000;] relative z-[3] mb-6 lg:mb-12 ${index == 1 ? 'md:absolute md:top-1/2 md:-translate-y-1/2 md:right-full mr-2 md:mr-4 lg:mr-8 xl:mr-14' : ''}`}>
                                    <div className="svg absolute right-12 -top-2 z-[-1] w-[88px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="88" height="120" viewBox="0 0 92 120" fill="none">
                                            <path d="M1.24512 117.162V-2.4646H90.0242V117.162L45.6345 84.0579L1.24512 117.162Z" fill="#FFDF59" stroke="#231F20" strokeWidth="2" />
                                        </svg>
                                        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-3 text-[40px] text-black font-lato font-bold leading-[80%] uppercase '>0{index + 1}</span>
                                    </div>
                                    <img className='mb-6 md:mb-8 lg:mb-10 xl:mb-[50px]' src={item.img} alt="" />
                                    <h3 className='text-2xl md:text-[26px] lg:text-[32px] text-black font-Gliker font-normal leading-[120%] uppercase mb-4'>{item.title}</h3>
                                    <p className='text-lg md:text-lg lg:text-[22px] text-black font-Pragati font-bold leading-[140%]'>{item.des}</p>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
