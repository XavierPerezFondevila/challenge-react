"use client";

import { Issue } from "@/services/types";
import { useRef, useState, useEffect } from "react";

interface IssuesSliderProps {
  issues: Issue[];
}

export default function IssuesSlider({ issues }: IssuesSliderProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = x - startX;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = x - startX;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleTouchEnd = () => setIsDragging(false);

  const calculateScrollProgress = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const progress = (carousel.scrollLeft / maxScroll) * 100;
    setScrollProgress(Math.min(Math.max(progress, 0), 100));
  };

  useEffect(() => {
    window.addEventListener("resize", calculateScrollProgress);
    setTimeout(() => {
      calculateScrollProgress();
    }, 0);

    return () => {
      window.removeEventListener("resize", calculateScrollProgress);
    };
  }, []);

  const imagePointerEvents = isDragging ? "pointer-events-none" : "pointer-events-auto";

  return (
    <div className="relative w-full select-none flex flex-col gap-6">
      <h2 className="uppercase text-[24px]/[24px] sm:text-[32px]/[32px] font-bold">Comics</h2>

      <div className="relative pb-6">
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto cursor-grab no-scrollbar"
          onScroll={calculateScrollProgress}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {issues.map((issue) => (
            <div
              key={issue.id}
              className={`w-full max-w-[180px] shrink-0 ${imagePointerEvents} flex flex-col`}
            >
              <img
                src={issue.image?.small_url}
                alt={issue.name}
                className="w-full h-[268px] object-cover"
              />
              { issue.name && (
                <div className="flex flex-col gap-2">
                  <div className="mt-2 text-sm font-medium line-clamp-2">{issue.name}</div>
                  <div className="text-xs text-primary h-3.5">{issue.coverDate}</div>
                </div>
              ) }
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D9D9D9]">
          <div
            className="h-1 bg-secondary transition-all duration-50"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
