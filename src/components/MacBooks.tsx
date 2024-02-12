"use client";

import { getStoreItems } from "@/api/api";
import { items } from "@/constants/constants";
import React, { useEffect, useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

interface StoreItem {
  id: number;
  type: string;
  code: string;
  title: string;
  subtitle: string;
  viewType: string;
  items: {
    body: null;
    collectionId: number;
    createdAt: string;
    deletedAt: null;
    entityId: number;
    entityType: string;
    key: string;
    name: string;
    optionKey: null;
    prdType: number;

    publication: {
      id: number;
      title: string;
      code: string;
      productId: number;
      prdType: number;
      preface: string;
      prefaceIconUrl: string;
      media: {
        uri: string;
      }[];
      isTrial: boolean;
      tagsOnDesc: [];
      tagsOnImage: [];
      priceInfo: {
        discountPrice: number;
        discountRate: number;
      };
      rating: number;
    };
    seq: number;
    updatedAt: string;
    uuid: string;
  }[];
  // Add more properties as needed
}

const MacBooks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getStoreItems();
        setStoreItems(newData.items);
      } catch (error) {
        console.log("error ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("storeItems updated: ", storeItems);
  }, [storeItems]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const filteredItems = storeItems.filter(
    (item) => item.type === "SINGLE" && item.viewType === "TILE"
  );

  console.log("filteredItems ", filteredItems);
  return (
    <div className="flex justify-between items-center mx-auto md:mx-0 lg:mx-auto lg:max-w-4xl xl:max-w-5xl sm:w-2/4 md:w-full mb-8">
      <section className="flex flex-col justify-between items-center w-[240px] space-y-56">
        <div>
          <h3 className="box-title"> {filteredItems[8]?.title}</h3>
          <p className="box-subtitle">{filteredItems[8]?.subtitle}</p>
        </div>

        <div className="flex items-center space-x-4">
          <MdOutlineArrowBackIos color="rgb(153, 153, 153)" />
          <MdOutlineArrowForwardIos color="rgb(153, 153, 153)" />
        </div>
      </section>

      <Swiper
        className="lg:w-[100%] md:w-full "
        slidesPerView={4}
        spaceBetween={10}
        autoplay={{
          delay: 2400,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
      >
        {filteredItems &&
          filteredItems[8]?.items.map((item, index) => {
            return (
              <div key={index}>
                {item.publication.media[0].uri && (
                  <SwiperSlide key={index} className="w-full mx-0">
                    <div className="flex flex-col justify-center rounded-sm ">
                      <div className="p-0 m-0">
                        <img
                          className="rounded-lg"
                          src={item.publication.media[0].uri}
                          alt="image"
                        />
                        {item.publication.tagsOnImage.length != 0 && (
                          <div className="return-new relative bottom-8 z-20">
                            <img
                              src="/images/return-new.svg"
                              alt="return-new"
                            />
                            <p>returnable</p>
                          </div>
                        )}

                        <p className="text-sm text-wrap text-left truncate line-clamp-2 text-[rgb(51, 51, 51)]">
                          {item?.publication.title}
                        </p>
                      </div>

                      {(item.publication.priceInfo.discountRate ||
                        item.publication.priceInfo.discountPrice) && (
                        <div className="flex items-center mt-2 font-semibold text-[18px] gap-x-1">
                          <p className="">
                            {item.publication.priceInfo.discountRate} %
                          </p>
                          <div className="flex items-center">
                            <p>
                              {item.publication.priceInfo.discountPrice.toLocaleString()}
                            </p>
                            <p className="font-medium text-[12px]">원</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center w-[100%]">
                      {item?.publication.tagsOnDesc && (
                        <p className={"box-tags"}>
                          {item?.publication.tagsOnDesc}
                        </p>
                      )}
                      {item?.publication.isTrial && (
                        <p className="box-freetrail">Free trial</p>
                      )}
                    </div>
                    {item?.publication.rating && (
                      <div className="box-rating gap-x-1">
                        <div>
                          <img
                            src="/images/star-darkgray.svg"
                            alt="rating"
                            className="h-3 w-3"
                          />
                        </div>
                        <p className="text-[12px]">
                          {item?.publication.rating}
                        </p>
                      </div>
                    )}
                    {item?.publication.preface && (
                      <div className="box-preface font-semibold">
                        <img
                          src={item?.publication.prefaceIconUrl}
                          alt="Icon"
                        />
                        <p className="text-gray-700 font-normal">
                          {item?.publication.preface}
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                )}
              </div>
            );
          })}
      </Swiper>
    </div>
  );
};

export default MacBooks;
