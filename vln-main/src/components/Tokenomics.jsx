import { Container, Row, Col } from './Grid'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Add this import
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);  // Register the plugin
import tokenImg from '../assets/img/token-img.png'
import CommonTitle from './CommonTitle';
import Token from './Token';
import shape from '../assets/img/tokenomics-shape.png'
import border from '../assets/img/border-shap.png'
import img from '../assets/img/tokenomics-img.png'

export default function Tokenomics() {
  const tokenData = [
    {
      name: 'Presale',
      percent: 50,
      color: '#96D1F3',
    },
    {
      name: 'Liquidity',
      percent: 30,
      color: '#DE082A',
    },
    {
      name: 'marketing ',
      percent: 10,
      color: '#296CAA',
    },
    {
      name: 'Development',
      percent: `05`,
      color: '#29AA5A',
    },
    {
      name: 'team & advisors',
      percent: `05`,
      color: '#455057',
    },
  ];
  const totalPercent = tokenData.reduce((total, item) => total + parseFloat(item.percent), 0);


  const data = {
    labels: tokenData.map((item) => item.name),
    datasets: [
      {
        label: 'Value',
        data: tokenData.map((item) => item.percent),
        backgroundColor: tokenData.map((item) => item.color),
        borderColor: '#CDEEFF',
        borderWidth: 0,
        hoverOffset: 0,
        borderRadius: 0,
        cutout: 70,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        displayColors: false,
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || '';
            return `${label}: ${value}%`;
          },
        },
      },
      datalabels: {
        display: true,
        color: 'white',
        formatter: function (value) {
          return value + '%';
        },
        font: {
          weight: 'bold',
          size: 16,
        },
      },
    },
  };

  return (
    <div className='tokenomics bg-[#FEDB63]  relative z-[2] '>
      <div className="absolute bottom-full left-0 w-full h-[]">
        <img src={border} className='w-full' alt="" />
      </div>
      <Container className='overflow-hidden'>
        <Row className='items-center'>
          <Col xs={12}>
            <CommonTitle title="Tokenomics" className='relative z-[2]' />
          </Col>
          <Col xs={12} md={6} >
            <div className="max-w-[570px] relative z-[2]">
              <div className="  bg-white border-[3px] border-[#FFDF59] Shadow rounded-2xl lg:rounded-[32px] py-6 xl:py-10 px-6 xl:px-[34px] flex  flex-col gap-4 md:gap-5 xl:gap-6">
                {tokenData.map((item, index) => (
                  <div className="flex items-center justify-between border-b border-black pb-3" key={index} data-aos="fade-up" data-aos-duration={`1${index + 6}00`}>
                    <p className='text-black text-lg lg:text-xl xl:text-2xl uppercase'>{item.name}</p>
                    <p className='text-black text-lg lg:text-xl xl:text-2xl font-bold'>{item.percent}%</p>
                  </div>
                ))}
              </div>
              <div className="bg-white mt-5 lg:mt-8 border-[3px] border-[#FFDF59] Shadow rounded-2xl lg:rounded-[32px] py-4 lg:py-6 xl:py-[31px] px-6 xl:px-[34px] flex items-center justify-between">
                <p className='text-black text-lg lg:text-xl xl:text-2xl uppercase'>LP burned</p>
                <p className='text-black text-lg lg:text-xl xl:text-2xl font-bold'>{totalPercent}%</p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} className='flex justify-center'>
            <div>
              <div className="relative mt-10 md:mt-0 mx-auto md:mx-0 size-[350px] lg:size-[413px]" data-aos="fade-left">
                <div className='size-[800px] md:w-[1068px] md:h-[1104px] absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[3]'>
                  <img src={shape} className='' alt="" />
                </div>
                <img src={img} className='w-full max-w-[auto] h-full' alt="" />
              </div>
              <p className='p max-w-[416px] text-center mt-4 md:mt-6 xl:mt-8'>Total Supply <span>1,000,000,000 $VLN</span></p>
            </div>
          </Col>
          <Col xs={12}>
            <div className="flex justify-center mt-4 md:mt-8 lg:mt-12 xl:mt-[110px] ">
              <Token />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
