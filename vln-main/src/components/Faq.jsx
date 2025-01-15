import React from 'react'
import { Container, Row, Col } from './Grid'
import Accordion from './Accordion'
import CommonTitle from './CommonTitle';
import img from '../assets/img/faq/dog.png'
import shape from '../assets/img/faq/topshape.png'

export default function Faq() {
  const item = [
    {
      title: 'What is Vorlun Coin?',
      body: `<p>Vorlun Coin (VLN) is a cryptocurrency built on the Solana network, designed to support animal shelters worldwide. Our mission is to provide a scalable, efficient digital asset that helps create a sustainable future for vulnerable animals.</p>`,
    },
    {
      title: 'How can I buy Vorlun Coin?',
      body: `<p>You can buy Vorlun Coin during our presale by connecting your wallet to our website, selecting your preferred payment method, and completing the transaction. Tokens will be sent directly to your wallet</p>`,
    },
    {
      title: 'What is the total supply of Vorlun Coin?',
      body: `<p>The total supply is 1,000,000,000 (1 Billion) Vorlun Coins.</p>`,
    },
    {
      title: 'How is Vorlun Coin distributed?',
      body: `<ul>
          <li class='flex mb-1 items-center gap-2'>
            <span class='flex-[0_0_auto] size-[6px] rounded-full bg-[#1B2E4D]'></span>
            <span>50% – Presale</span>
          </li>
          <li class='flex mb-1 items-center gap-2'>
            <span class='flex-[0_0_auto] size-[6px] rounded-full bg-[#1B2E4D]'></span>
            <span>30% – Liquidity</span>
          </li>
          <li class='flex mb-1 items-center gap-2'>
            <span class='flex-[0_0_auto] size-[6px] rounded-full bg-[#1B2E4D]'></span>
            <span>10% – Marketing</span>
          </li>
          <li class='flex mb-1 items-center gap-2'>
            <span class='flex-[0_0_auto] size-[6px] rounded-full bg-[#1B2E4D]'></span>
            <span>5% – Development</span>
          </li>
          <li class='flex mb-1 items-center gap-2'>
            <span class='flex-[0_0_auto] size-[6px] rounded-full bg-[#1B2E4D]'></span>
            <span>5% – Team</span>
          </li>
          <li class='flex mb-1 items-center gap-2'>
            <span class='flex-[0_0_auto] size-[6px] rounded-full bg-[#1B2E4D]'></span>
            <span>100% LP Burned</span>
          </li>
        </ul>`,
    },
    {
      title: 'What is the vesting plan for Vorlun Coin?',
      body: `<p>To maintain market stability, we have a 30-day cliff period after launch. Following that, the remaining tokens are released over the next six months. Early investors will have 10% of their tokens unlocked at launch.</p>`,
    },
  ]
  return (
    <div className="faq common-padding relative z-[1] pt-[100px] md:pt-[90px] lg:pt-[150px] xl:pt-[180px] pb-14 md:pb-20 lg:pb-24 xl:pb-[140px]">
      <div className="shape absolute bottom-full left-0 w-full">
        <img src={shape} className='w-full' alt="" />
      </div>
      <Container className=''>
        <Row className="justify-center">
          <Col xs={12} lg={8} md={10}>
            <div className="">
              <div className="relative">
                <CommonTitle className='common-title text-center' title="FAQ" des="" />
                <div className="image absolute bottom-[48%] left-[56.5%] md:bottom-[40%] md:left-[51.5%] lg:bottom-[48%] lg:left-[51%] xl:bottom-[50%  xl:left-1/2 -translate-x-1/2 z-[-1]">
                  <img src={img} className='w-[50%] md:w-[75%] lg:w-[80%] xl:w-[100%]' alt="" />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={8} md={10} className='max-w-[736px]'>
            <Accordion items={item} activeItem={0} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}