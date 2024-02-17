"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BiSearch, BiX } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { items } from "@/constants/constants";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { motion, useScroll } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { scrollXProgress } = useScroll();
  const [showIcon, setShowIcon] = useState(false);

  const handleNext = () => setCurrentSlideIndex(1);

  const handlePrev = () => setCurrentSlideIndex(0);

  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    setShowIcon(inputValue.length > 0);
  };

  return (
    <section
      className="fixed top-0 w-[100%] bg-white h-[76px] z-50 flex flex-col border-[rgb(238, 238, 238)]
    "
    >
      <div
        className={`flex justify-between items-center mx-auto lg:mx-auto lg:max-w-4xl xl:max-w-5xl sm:w-2/4 md:w-full lg:w-11/12 h-[100%] text-gray-600`}
      >
        <div className="flex items-center gap-3">
          <Link href="">
            <img
              className="w-24 lg:w-[146px]"
              src="/images/logo-new.svg"
              alt="logo"
            />
          </Link>
          <div className="hidden lg:flex md:flex items-center gap-1 cursor-pointer">
            <IoMdMenu
              size={20}
              color="rgb(0, 208, 148)"
              onClick={() => setIsOpen(!isOpen)}
            />
            <p className="mr-1 text-[#1DB954] text-lg">카테고리</p>
          </div>
        </div>
        <div className="hidden lg:flex md:flex items-center px-4 py-[10px] gap-2 rounded-[4px] border border-gray-300 focus:border-[#1DB954]">
          <BiSearch className="cursor-pointer w-[20px]" size={20} />
          <input
            onChange={handleInputChange}
            type="text"
            className="rounded-8 border border-transparent focus:border-transparent focus:outline-none tracking-tighter text-sm leading-tight flex-grow pr-10"
            placeholder="살까말까 고민된다면 검색해보세요!"
          />
          {showIcon && (
            <div className="rounded-full bg-gray-200">
              <BiX color="white" />
            </div>
          )}
        </div>
        <div className="hidden lg:flex md:flex items-center gap-3">
          <Link href="">
            <img
              src="/images/home-event.svg"
              alt="home-event"
              className="w-8 h-8"
            />
          </Link>
          <div className="h-[15px] w-[1px] bg-gray-200" />
          <Link href="">
            <p className="text-[14px] tracking-tighter font-semibold">
              로그인 / 회원가입
            </p>
          </Link>
        </div>
        <div className="lg:hidden md:hidden flex items-center gap-4 mr-2">
          <GoBell className="text-gray-500" size={25} />
          <BiSearch className="text-gray-500" size={25} />
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-200" />
      {isOpen ? (
        <div className="absolute inset-0 h-48 z-10 hidden lg:flex items-center justify-center top-16 overflow-x-auto bg-white text-gray-700">
          <motion.div
            className="flex items-center mx-auto"
            initial={{ x: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <button
              onClick={handlePrev}
              className={currentSlideIndex === 0 ? "hidden" : "flex mr-8"}
            >
              <MdOutlineArrowBackIosNew />
            </button>
            <div className="flex items-center">
              {items &&
                items
                  .slice(currentSlideIndex * 9, currentSlideIndex * 9 + 9)
                  .map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center space-y-4 mx-3"
                    >
                      <img
                        className="h-20 w-20"
                        src={item.url}
                        alt={item.label}
                      />
                      <p className="text-[15px]">{item.label}</p>
                    </div>
                  ))}
            </div>
            <button
              onClick={handleNext}
              className={currentSlideIndex === 1 ? "hidden" : "flex ml-8"}
            >
              <MdOutlineArrowForwardIos />
            </button>
          </motion.div>
        </div>
      ) : null}
    </section>
  );
};

export default Header;
