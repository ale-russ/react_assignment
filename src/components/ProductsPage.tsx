"use client";

import React, { useEffect, useState } from "react";
import { getStoreItems } from "@/api/api";
import ProductCarousel from "./ProductCarousel";

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
  // Add more properties as needed
}

const ProductPage = () => {
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

  return (
    <main className="bg-white h-screen">
      {storeItems.map((items, index) => {
        return (
          items.type === "SINGLE" &&
          items.viewType === "TILE" && (
            <ProductCarousel
              key={items.id}
              title={items.title}
              subtitle={items.subtitle}
              items={items.items}
            />
          )
        );
      })}
    </main>
  );
};

export default ProductPage;
