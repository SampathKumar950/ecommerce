import { Swiper, SwiperSlide } from 'swiper/react';
import { sliderData } from './Data';
import { EffectFade, Autoplay, Navigation } from 'swiper/modules'; // Import Navigation module
import 'swiper/css/effect-fade';
import 'swiper/css';
import 'swiper/css/navigation'; // Import Navigation styles
import { useNavigate } from 'react-router-dom';

const HeroSlider = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <Swiper
        modules={[EffectFade, Autoplay, Navigation]}  // Add Navigation module here
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-button-next', // Custom next button class
          prevEl: '.swiper-button-prev', // Custom prev button class
        }}
        effect="slide"  // Enable fade effect
        className="heroSlider h-[250px]"
      >
        {sliderData.map(({ id, title, bg, category }) => (
          <SwiperSlide className="h-full relative flex justify-center items-center" key={id}>
            <div className="z-20 text-white text-center" >
              <h1 className="font-primary text-[32px] uppercase tracking-[2px] max-w-[920px] lg:text-[68px] text-white leading-tight mb-6">
                {title}
              </h1>
            </div>

            <div className="absolute top-0 w-full h-full"onClick={()=>navigate('/searchPage',{state:{category}})}>
              <img className="object-cover h-full w-full" src={bg} alt="background" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Previous Button */}
      <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2 rounded-full">
      </div>

      {/* Custom Next Button */}
      <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2 rounded-full">
      </div>
    </div>
  );
};

export default HeroSlider;
