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
        {sliderData.map(({ id, bg, bg2, category }) => (
          <SwiperSlide className="h-full relative flex justify-center items-center" key={id}>
            <div className="hidden md:block absolute top-0 w-full h-full"onClick={()=>navigate('/searchPage',{state:{category}})}>
              <img className="object-cover h-full w-full" src={bg} alt="background" />
            </div>
            <div className="block md:hidden absolute top-0 w-full h-full"onClick={()=>navigate('/searchPage',{state:{category}})}>
              <img className="object-cover h-full w-full" src={bg2} alt="background" />
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
