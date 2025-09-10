import HeroSection from "@/components/HeroSection";
import CategorySlider from "@/components/CategorySlider";
import ProductShowcase from "@/components/ProductShowcase";
import VideoSection from "@/components/VideoSection";
import CountryExports from "@/components/CountryExports";
import BlogSection from "@/components/BlogSection";
import BrandSection from "@/components/BrandSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BrochureSection from "@/components/BrochureSection";
import WeCare from "@/components/WeCare";
import CrystalAvatar from "./crystal-avatar/page";
import Foundation from "@/components/foundation";
import BusinessSection from "@/components/business";
import LifeAtNamakwala from "@/components/LifeAtNamakwala";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WeCare />
      <BusinessSection/>
      <Foundation/>
      <BrandSection />
      <LifeAtNamakwala/>
    </div>
  );
}
