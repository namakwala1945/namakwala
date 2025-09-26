"use client";

import data from "../locales/en/content.json";
import Image from "next/image";

export default function BrandPromise() {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 sm:p-8 md:p-12">
      <div className="text-center max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
            <span className="playfair text-gradient">{data.brandPromise.title}</span>
        </h3>
        <p className="text-muted-foreground mb-8 text-sm sm:text-base leading-relaxed">
          {data.brandPromise.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-8">
          {data.brandPromise.partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-white shadow-lg border hover:shadow-xl transition flex flex-col cursor-pointer"
            >
              {/* Top image with zoom effect */}
              <div className="w-full h-40 relative overflow-hidden">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={300}
                  height={160}
                  className="object-contain w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>

              <div className="w-full bg-gray-100 flex flex-col flex-grow p-3 min-h-[120px]">
                {/* Logo/Name */}
                <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center ">
                  {partner.name}
                </h3>

                {/* Paragraph / description */}
                <p className="mt-2 mb-4 text-sm text-gray-600 text-center px-3">
                  {partner.description || "Trusted partner delivering value worldwide."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
