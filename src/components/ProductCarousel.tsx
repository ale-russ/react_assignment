import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Grid } from "swiper/modules";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

interface ProductCarouselProps {
  title?: string;
  subtitle?: string;
  items?: {
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
      isExistResidual: boolean;
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
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  items,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 959);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 959);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log("smallScreen: ", isSmallScreen);
  return (
    <div
      className={`flex ${
        isSmallScreen ? "flex-col" : "flex-row"
      } justify-between items-center md:items-start sm:items-start mx-auto md:mx-0 lg:mx-auto lg:max-w-4xl xl:max-w-5xl sm:w-2/4 md:w-full mb-8`}
    >
      <section className="flex flex-col justify-between items-center md:items-start sm:items-start w-[240px] md:w-full space-y-56">
        <div>
          <h3 className="box-title"> {title}</h3>
          <p className="box-subtitle">{subtitle}</p>
        </div>
        {!isSmallScreen && (
          <div className="flex items-center space-x-4">
            <MdOutlineArrowBackIos color="rgb(153, 153, 153)" />
            <MdOutlineArrowForwardIos color="rgb(153, 153, 153)" />
          </div>
        )}
      </section>

      {!isSmallScreen ? (
        <Swiper
          className="lg:w-[100%] md:w-full sm:w-96"
          slidesPerView={4}
          spaceBetween={10}
          autoplay={{
            delay: 2400,
            disableOnInteraction: false,
          }}
          modules={[Grid, Autoplay, Pagination, Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
        >
          {items &&
            items?.map((item, index) => (
              <SwiperSlide key={index} className="w-full mx-0">
                {item.publication.media[0].uri && (
                  <div className="flex flex-col justify-center rounded-sm ">
                    <div className="p-0 m-0">
                      <img
                        className="rounded-lg"
                        src={item.publication.media[0].uri}
                        alt="image"
                      />

                      {item.publication?.tagsOnImage.length !== 0 && (
                        <div className="return-new relative bottom-8 z-20">
                          <img src="/images/return-new.svg" alt="return-new" />
                          <p>returnable</p>
                        </div>
                      )}
                      {!item.publication.isExistResidual && (
                        <div className="out-of-stock relative bottom-20 z-50">
                          <p>Temporarily out of stock</p>
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
                )}
                <div className="flex items-center w-[100%]">
                  {item?.publication.tagsOnDesc && (
                    <p className={"box-tags"}>{item?.publication.tagsOnDesc}</p>
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
                    <p className="text-[12px]">{item?.publication.rating}</p>
                  </div>
                )}
                {item?.publication.preface && (
                  <div className="box-preface font-semibold">
                    <img src={item?.publication.prefaceIconUrl} alt="Icon" />
                    <p className="text-gray-700 font-normal">
                      {item?.publication.preface}
                    </p>
                  </div>
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <ProductGRidView items={items} />
      )}
    </div>
  );
};

export default ProductCarousel;

const ProductGRidView: React.FC<ProductCarouselProps> = ({ items }) => {
  console.log;
  return (
    <div className="grid grid-cols-2 gap-x-4">
      {items &&
        items?.map((item, index) => (
          <div key={index} className="w-full mx-4">
            {item.publication.media[0].uri && (
              <div className="flex flex-col justify-center rounded-sm ">
                <div className="p-0 m-0">
                  <img
                    className="rounded-lg"
                    src={item.publication.media[0].uri}
                    alt="image"
                  />

                  {item.publication?.tagsOnImage.length !== 0 && (
                    <div className="return-new relative bottom-8 z-20">
                      <img src="/images/return-new.svg" alt="return-new" />
                      <p>returnable</p>
                    </div>
                  )}
                  {!item.publication.isExistResidual && (
                    <div className="out-of-stock relative bottom-20 z-50">
                      <p>Temporarily out of stock</p>
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
            )}
            <div className="flex items-center w-[100%]">
              {item?.publication.tagsOnDesc && (
                <p className={"box-tags"}>{item?.publication.tagsOnDesc}</p>
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
                <p className="text-[12px]">{item?.publication.rating}</p>
              </div>
            )}
            {item?.publication.preface && (
              <div className="box-preface font-semibold">
                <img src={item?.publication.prefaceIconUrl} alt="Icon" />
                <p className="text-gray-700 font-normal">
                  {item?.publication.preface}
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
