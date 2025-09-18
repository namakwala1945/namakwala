"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  TrendingUp,
  Shield,
} from "lucide-react";
import Image from "next/image";
// Import JSON data
import slides from "../locales/en/heroBanner.json";
import YearsOfExcellence from "./YearsOfExcellence";
import Link from "next/link";
const features = [
  { icon: Globe, text: "50+ Countries" },
  { icon: TrendingUp, text: <YearsOfExcellence /> },
  { icon: Shield, text: "ISO Certified" },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[89vh] overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 top-0">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              slide.id - 1 === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              className="object-cover"
              fill
              priority 
              fetchPriority="high"
              quality={70}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="/optimized/placeholder-large.webp"
            />
            <div className="absolute inset-0 hero-gradient opacity-80"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center mt-5 poppins">
        <div className="w-[95%] mx-auto px-4 md:px-8 lg:px-12 mt-5">
          <div className="max-w-6xl mt-5">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  slide.id - 1 === currentSlide
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8 absolute"
                }`}
              >
                <h2 className="text-accent text-lg md:text-lg font-semibold mb-2 animate-fade-in">
                  {slide.subtitle}
                </h2>
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight playfair">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-1xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button
                   aria-label="About Us"
                    variant="export"
                    size="lg"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap 
             text-base px-6 py-3 rounded-lg bg-transparent text-white border border-white 
             hover:bg-white/10 transition"
                  >
                    <Link href="/about">about us</Link>
                  </Button>
                  {/* <Button
                    variant="export"
                    size="lg"
                    className="hover-lift bg-transparent text-white border-white"
                  >
                    Contact Us
                  </Button> */}
                </div>
              </div>
            ))}

            {/* Features */}
            <div className="flex flex-wrap gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2 py-1 text-white"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <feature.icon className="w-6 h-6 text-accent" />

                {/* Check if it's a component */}
                {typeof feature.text === "object" ? (
                  <span className="font-light flex items-center gap-1">
                    {feature.text} {/* Your <YearsOfExcellence /> component */}
                    <span>Years of Excellence</span> {/* Extra text */}
                  </span>
                ) : (
                  <span className="font-light">{feature.text}</span>
                )}
              </div>
            ))}
          </div>

          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-accent scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
