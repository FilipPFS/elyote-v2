"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { markingCards } from "@/constants";

export function CarouselSize() {
  const itemsPerPage = 6;
  const pages = Array.from(
    { length: Math.ceil(markingCards.length / itemsPerPage) },
    (_, pageIndex) =>
      markingCards.slice(
        pageIndex * itemsPerPage,
        (pageIndex + 1) * itemsPerPage
      )
  );

  return (
    <div className="relative w-full mt-2">
      <Carousel opts={{ align: "start" }} className="relative w-full">
        <CarouselContent className="flex">
          {pages.map((page, pageIndex) => (
            <CarouselItem
              key={pageIndex}
              className="grid justify-items-center grid-cols-3 gap-4"
            >
              {page.map((card, index) => (
                <Link
                  href={card.link}
                  key={index}
                  className="w-fit flex flex-col gap-1.5 items-center"
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <span className="w-3/4 max-sm:text-sm text-center leading-none">
                    {card.title}
                  </span>
                </Link>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 inset-y-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-2 inset-y-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
