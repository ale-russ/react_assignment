import BannerCarousel from "@/components/BannerCarousel";
import ElectricMats from "@/components/ElectricMats";
import GamingDevices from "@/components/GamingDevices";
import Header from "@/components/Header";
import HotDeals from "@/components/HotDeals";
import LGProducts from "@/components/LGProducts";
import LogiTech from "@/components/LogiTech";
import MacBooks from "@/components/MacBooks";
import NewIn from "@/components/NewIn";
import NewStoreEvent from "@/components/NewStoreEvent";
import Recommended from "@/components/Recommended";

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
        <HotDeals />
        <NewIn />
        <NewStoreEvent />
        <LogiTech />
        <LGProducts />
        <GamingDevices />
        <ElectricMats />
        <Recommended />
        <MacBooks />
      </section>
      
    </main>
  );
}
