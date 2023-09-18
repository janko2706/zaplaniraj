"use client";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { Navigation, Pagination } from "swiper/modules";

const notifyAdd = () => toast.success("Added to Wishlist.");
const notifyRemove = () => toast.error("Removed From Wishlist.");

type CardProps = {
  item: {
    id: string;
    address: string;
    popular: boolean;
    priceRange: number[];
    title: string;
    images: string[];
    type: string;
  };
};
const ListCard = ({ item }: CardProps) => {
  const [favourite, setFavourite] = useState(false);
  const { id, address, popular, title, type, images, priceRange } = item;
  const handleFavorite = () => {
    setFavourite(!favourite);
    favourite ? notifyRemove() : notifyAdd();
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div key={id} className="group flex rounded-2xl border border-primary ">
      <div className="group  relative rounded-2xl">
        {images.length > 1 ? (
          <Swiper
            loop={true}
            pagination={{
              el: ".property-card-pagination",
              clickable: true,
            }}
            slidesPerView={1}
            spaceBetween={30}
            navigation={{
              nextEl: ".property-card-next",
              prevEl: ".property-card-prev",
            }}
            centeredSlides={true}
            modules={[Navigation, Pagination]}
            className="w-full lg:max-w-[70%]"
          >
            {images.map((img: string, i: number) => (
              <SwiperSlide key={i}>
                <Image
                  width={500}
                  height={5600}
                  src={img}
                  alt="image"
                  className={`m-auto max-h-72 rounded-2xl ${
                    isLoading
                      ? "scale-110 blur-2xl grayscale"
                      : "scale-100 blur-0 grayscale-0"
                  } object-cover transition-all duration-700 lg:object-contain`}
                  onLoadingComplete={() => setIsLoading(false)}
                />
              </SwiperSlide>
            ))}
            <div className="swiper-pagination property-card-pagination"></div>
            <div className="swiper-button-prev property-card-prev !opacity-0 duration-300 group-hover:!opacity-100"></div>
            <div className="swiper-button-next property-card-next !opacity-0 duration-300 group-hover:!opacity-100"></div>
          </Swiper>
        ) : (
          <div className="property-card__img">
            <Image
              width={400}
              height={280}
              src={images[0] ? images[0] : ""}
              alt="image"
              className="w-full rounded-2xl"
            />
          </div>
        )}

        {popular && (
          <span className="absolute">
            <span className="relative -left-4 bottom-5 z-10 inline-block rounded-t rounded-br bg-primary px-9 py-2.5 text-sm font-medium text-white before:absolute before:-bottom-2 before:left-0 before:h-2 before:w-2 before:rounded-bl-md before:bg-[#2628A6] ">
              Available online booking
            </span>
          </span>
        )}
      </div>
      <div className="col-span-12 md:col-span-7">
        <div>
          <div className="mb-3 mt-2 flex items-center gap-1 pl-4 pt-3">
            <i className="las la-map-marker-alt text-lg text-[#9C742B]"></i>
            <span className="inline-block">{address}</span>
          </div>
          <Link
            href="property-details-1"
            className="pl-4 text-xl font-medium text-neutral-700"
          >
            {title}
          </Link>
        </div>
        <div className="mx-3 md:mx-5">
          <div className=" border-dash-long border-t"></div>
        </div>
        <div className="px-3 pb-5 pt-4 sm:px-4 md:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xl font-medium text-primary">
              €{priceRange[0]} / €{priceRange[1]}
            </span>
            <Link href="/property-details-1" className="btn-outline ">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListCard;
