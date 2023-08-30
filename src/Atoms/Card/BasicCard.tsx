import { HeartIcon } from "@heroicons/react/20/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PreviewModal from "~/Molecules/PreviewModal/PreviewModal";

import { toast } from "react-toastify";
import Image from "next/image";
const notifyAdd = () => toast.success("Added to Wishlist.");
const notifyRemove = () => toast.error("Removed From Wishlist.");

type Props = {
  item: {
    id: number;
    address: string;
    images: string[];
    price: string;
    title: string;
    popular: boolean;
  };
};

export default function BasicCard({ item }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [previewPicture, setPreviewPicture] = useState<string>("");

  const [favourite, setFavourite] = useState(false);
  const handleFavorite = () => {
    setFavourite(!favourite);
    favourite ? notifyRemove() : notifyAdd();
  };
  const { id, address, images, popular, price, title } = item;

  return (
    <div
      key={id}
      className="col-span-12 px-3 md:col-span-6 xl:col-span-4 xl:px-0"
    >
      <div className="rounded-2xl bg-white p-2 shadow-xl">
        <div className="group relative rounded-2xl">
          {images.length > 1 ? (
            <Swiper
              loop={true}
              pagination={{
                el: ".property-card-pagination",
                clickable: true,
              }}
              navigation={{
                nextEl: ".property-card-next",
                prevEl: ".property-card-prev",
              }}
              modules={[Navigation, Pagination]}
              className="swiper property-card-slider group"
            >
              {images.map((img: string, i: number) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <div>
                    <Image
                      width={400}
                      height={280}
                      src={img}
                      alt="image"
                      className="w-full rounded-2xl"
                    />
                  </div>
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
          <button
            onClick={handleFavorite}
            className="absolute right-4 top-4 z-10 inline-block rounded-full bg-slate-100 p-2.5 text-primary "
          >
            {favourite ? (
              <HeartIcon className="h-8 w-8 text-red-500" />
            ) : (
              <HeartIconOutline className="h-8 w-8 text-red-500" />
            )}
          </button>
          {popular && (
            <span className="absolute">
              <span className="relative -left-4 bottom-5 z-10 inline-block rounded-t rounded-br bg-primary px-9 py-2.5 text-sm font-medium text-white before:absolute before:-bottom-2 before:left-0 before:h-2 before:w-2 before:rounded-bl-md before:bg-[#2628A6] ">
                Popular
              </span>
            </span>
          )}
        </div>
        <div className="p-2 sm:p-4 lg:p-5">
          <div className="mb-4 mt-5 flex items-center gap-1 sm:mt-3">
            <i className="las la-map-marker-alt text-lg text-[#9C742B]"></i>
            <span className="inline-block">{address} </span>
          </div>
          <Link
            href="property-details-1"
            className="mb-4 text-base font-medium text-neutral-700 sm:text-xl"
          >
            {title}
          </Link>
        </div>
        <div className="property-card__body mx-5 py-0">
          <div className=" border-t border-dashed"></div>
        </div>
        <div className="px-2 pb-5 pt-3 sm:px-5">
          <div className="flex flex-wrap items-center justify-between">
            <span className="text-xl font-medium text-primary">${price}</span>
            <button
              onClick={() => {
                setOpen(true);
                setPreviewPicture(images[0] ?? "");
              }}
              className="btn-outline"
            >
              Vise
            </button>
          </div>
        </div>
      </div>
      <PreviewModal
        name={title}
        open={open}
        setOpen={setOpen}
        previewPicture={previewPicture}
      />
    </div>
  );
}
