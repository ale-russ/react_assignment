import BannerCarousel from "@/components/BannerCarousel";
import ProductPage from "@/components/ProductsPage";

import SmallIconsPage from "@/components/SmallIconsPage";
import StickyButton from "@/components/StickyButton";
import Head from "next/head";

export default function Home() {
  return (
    <main className="bg-white h-screen">
      <StickyButton />
      <BannerCarousel />
      <section className="flex flex-col items-center justify-between gap-y-4">
        <SmallIconsPage />
        <ProductPage />
      </section>
    </main>
  );
}
