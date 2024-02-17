"use client";

import { getShortCutsData } from "@/api/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Shortcut {
  title: string;
  imageUrl: string;
  linkUrl: string;
}

const SmallIconsPage = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShortCutsData();
        setShortcuts(data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-56 lg:h-48 flex items-center justify-center top-16 overflow-x-auto bg-white text-gray-700">
      <div className="lg:flex md:flex items-center sm:grid sm:grid-cols-5 gap-y-4 mx-auto lg:mx-auto lg:max-w-4xl xl:max-w-5xl md:w-full lg:w-11/12">
        {shortcuts &&
          shortcuts.map((item) => (
            <Link href={item.linkUrl} key={item.title}>
              <div className="flex flex-col items-center space-y-4 mx-3">
                <img
                  className="h-16 w-16"
                  src={item.imageUrl}
                  alt={item.title}
                />
                <p className="text-[13px]">{item.title}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SmallIconsPage;
