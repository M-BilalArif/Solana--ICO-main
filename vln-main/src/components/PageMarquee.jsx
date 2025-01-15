import Marquee from "react-fast-marquee"

export default function PageMarquee() {
  return (
    <div className="common-marquee bg-primary !border-l-0 !border-r-0 border-2 md:border-4 border-solid border-black py-3 lg:py-4 xl:py-5">
        <Marquee autoFill={true} speed={60}>
            <h4 className="mb-0 text-uppercase font-bold uppercase text-2xl md:text-[32px] !leading-relaxed text-white mr-6">Buy $VLN now!</h4>
        </Marquee>
    </div>
  )
}