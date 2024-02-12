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
  const [prvIndex, setPrvIndex] = useState(-1);
  const [nextIndex, setNextIndex] = useState(-1);

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
        className="banner-swiper"
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
