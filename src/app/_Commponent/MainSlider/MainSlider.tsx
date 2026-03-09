"use client";
import React from "react";
import img1 from "../../../../public/images-20250823T142224Z-1-001/images/slider-image-1.jpeg";
import img2 from "../../../../public/images-20250823T142224Z-1-001/images/slider-image-2.jpeg";
import img3 from "../../../../public/images-20250823T142224Z-1-001/images/slider-image-3.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
export default function MainSlider() {
  return (
    <>
      <div className="container w-[80%] mx-auto p-4 my-5 flex shadow-lg rounded-lg">
        <div className="first w-3/4 ">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{delay:2000}}
          >
            <SwiperSlide><Image className="w-full h-[400px]" src={img1} alt=""></Image></SwiperSlide>
            <SwiperSlide><Image className="w-full h-[400px]" src={img2} alt=""></Image></SwiperSlide>
            <SwiperSlide><Image className="w-full h-[400px]" src={img3} alt=""></Image></SwiperSlide>
            
            
          </Swiper>
          
        </div>
        <div className="last w-1/4 ">
          <Image className="w-full h-[200px]" src={img2} alt=""></Image>
          <Image className="w-full h-[200px]" src={img3} alt=""></Image>
        </div>
      </div>
    </>
  );
}
