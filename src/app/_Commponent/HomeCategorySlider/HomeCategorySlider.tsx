"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { CategoryType } from './../../../types/Category.type';


interface HomeCategorySliderProps {
  info: CategoryType[];
}

export default function HomeCategorySlider({ info }:HomeCategorySliderProps) {
  return (
    <>
      <div className="container w-[80%] mx-auto my-4 flex shadow-lg rounded-lg my-4">
        <Swiper
          spaceBetween={0}
          slidesPerView={5}
          modules={[Autoplay]}
          autoplay={{delay:2000}}
        >
          {info.map((category: CategoryType) => (
          <SwiperSlide key={category._id}>
            <div className="flex flex-col items-center">
              <div className="w-[120px] h-[120px] relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover" // fill space
                />
              </div>
              <p className="text-sm mt-2">{category.name}</p>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </>
  );
}
