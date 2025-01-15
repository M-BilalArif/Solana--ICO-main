import React from 'react'
import { Container, Row, Col } from './Grid'
import img from '../assets/img/roadmap/img.png'
import border from '../assets/img/roadmap/border.png'
import CommonTitle from './CommonTitle'

export default function Roadmap() {
    const card = [
        {
            head: 'Foundation & Development',
            content: [
                {
                    text: 'Finalize whitepaper and tokenomics.',
                },
                {
                    text: 'Launch the website and presale page.',
                },
                {
                    text: 'Begin partnerships with animal shelters',
                },
                {
                    text: 'Integrate wallet support and payment options for presale.',
                },
            ]

        },
        {
            head: 'Launch & Community Growth',
            content: [
                {
                    text: 'Launch Vorlun Coin presale on the website.',
                },
                {
                    text: 'List Vorlun Coin on decentralized exchanges (DEXs).',
                },
                {
                    text: 'Expand marketing efforts and build community on social media.',
                },
                {
                    text: 'Onboard additional animal shelters for global support.',
                },
            ]

        },

        {
            head: 'Expansion & Utility',
            content: [
                {
                    text: 'Introduce staking options for Vorlun Coin holders.',
                },
                {
                    text: 'Implement donation tracking system for full transparency.',
                },
                {
                    text: 'Expand partnerships with shelters worldwide.',
                },
                {
                    text: 'Start charity events and collaborations to boost awareness.',
                },
            ]

        },

    ]
    return (
        <div className='roadmap pt-8 md:pt-[70px] lg:pt-[130px] xl:pt-[150px] 2x:pt-[180px] -mb-5'>
            <Container>
                <div className="  lg:mb-[-150px]">
                    <CommonTitle className='lg:pr-16' title="Roadmap"/>
                </div>
                <Row className='items-end'>
                    <Col xs={12} lg={5} className='flex md:justify-center lg:pb-16 xl:pb-[85px]'>
                        <div className="relative">
                            <div className="absolute right-[-13%] md:right-[-15%] xl:right-[-21%] top-[13%] md:top-[10%] xl:top-[11%] ">
                                <img src={border} className='lg:h-[630px] xl:h-[680px] ' alt="" />
                            </div>
                            {card.map((item, index) => (
                                <div key={index} className="card mb-5 lg:mb-4 xl:mb-6">
                                    <h4 className='pb-4 text-[#FEF8F8] font-Gliker text-xl lg:text-lg xl:text-xl font-normal !leading-[120%] uppercase tracking-[.4px]'>{item.head}</h4>
                                    {item.content.map((item, index) => (
                                        <div key={index} className="flex gap-2 ">
                                            <div className="flex-[0_0_auto] bg-[#FEDB63] w-[16px] h-[16px] border-solid border-[1px] border-black rounded-full"></div>
                                            <p className='md:pb-3 lg:pb-2 xl:pb-3 text-[#0B0015] font-Gliker text-sm font-semibold !leading-[150%]'>{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col xs={12} lg={7} className='flex justify-center -mb-2 md:mb-[-32px] pt-4 md:pt-8 xl:pt-0'>
                        <div className="roadmap-content">
                            <div className=" ">
                                <img src={img} className='' alt="" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
