import BannerCarousel from "@/components/BannerCarousel";
import Header from "@/components/Header";
import ProductPage from "@/components/ProductsPage";
import SmallIconsPage from "@/components/SmallIconsPage";
import StickyButton from "@/components/StickyButton";

export default function Home() {
  return (
    <main className="bg-white h-screen">
      <Header />
      <StickyButton />
      <BannerCarousel />
      <section className="flex flex-col items-center justify-between gap-y-4">
        <SmallIconsPage />
        <ProductPage />
      </section>
    </main>
  );
}
