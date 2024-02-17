"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { getBannerData } from "@/api/api";

// Define the type for the shortcut items
interface BannerCarousel {
  pcImageUrl: string;
  title: string;
}

const BannerCarousel = () => {
  const [data, setData] = useState<BannerCarousel[]>([]);
  // const [prvIndex, setPrvIndex] = useState(-1);
  // const [nextIndex, setNextIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getBannerData();
        setData(newData);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center relative overflow-hidden">
      <Swiper
        className="lg:!overflow-visible overflow-hidden mx-auto lg:mx-auto lg:max-w-4xl xl:max-w-5xl sm:w-2/4 md:w-full lg:w-11/12"
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={true}
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={item.pcImageUrl} alt={item.title} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
