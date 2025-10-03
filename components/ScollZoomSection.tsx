"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import meetingImage from "../public/assets/Ocean-Poster.jpg";

export default function ScrollImageSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: any;
    let ScrollTrigger: any;
    let triggerInstance: any; // store specific trigger

    async function loadGSAP() {
      gsap = (await import("gsap")).gsap;
      ScrollTrigger = (await import("gsap/dist/ScrollTrigger")).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || !imageRef.current) return;

      // store the timeline so we can kill its ScrollTrigger later
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        imageRef.current,
        { width: "70%", height: "70%", scale: 1 },
        { width: "100%", height: "100%", scale: 1.05, ease: "power1.out" }
      );

      // save the trigger instance for cleanup
      triggerInstance = tl.scrollTrigger;
    }

    loadGSAP();

    return () => {
      // ✅ kill just this trigger
      if (triggerInstance) {
        triggerInstance.kill();
      }

      // Or if you want to wipe *everything* GSAP created:
      // if (ScrollTrigger) {
      //   ScrollTrigger.getAll().forEach(t => t.kill());
      // }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Scroll Zoom Section */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        <div
          ref={imageRef}
          className="relative w-[70%] h-[70%]"
        >
          <Image
            src={meetingImage}
            alt="Business Meeting"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
