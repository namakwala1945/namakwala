"use client";

import data from "../locales/en/content.json";
import Image from "next/image";

export default function BrandPromise() {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 sm:p-8 md:p-12">
      <div className="text-center max-w-4xl mx-auto">
        <h3 className="playfair font-bold mb-6 text-3xl sm:text-4xl text-gradient">
          {data.brandPromise.title}
        </h3>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base leading-relaxed">
          {data.brandPromise.description}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
          {data.brandPromise.partners.map((partner, index) => (
            <div
              key={index}
              className="p-1 w-[100px] sm:w-[130px] md:w-[180px] flex items-center justify-center shadow-lg bg-[#d2ab67]"
            >
              <Image
                src={partner.image}
                alt={partner.name}
                width={180}
                height={200}
                className="object-contain bg-white "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
