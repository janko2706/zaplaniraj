import Image from "next/image";
import Link from "next/link";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { useState } from "react";
import { HeartIcon, MapPinIcon, StarIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

const notifyAdd = () => toast.success("Added to Wishlist.");
const notifyRemove = () => toast.error("Removed From Wishlist.");

type CardProps = {
  item: {
    id: string;
    address: string;
    popular: boolean;
    priceRange: number[];
    title: string;
    img: string;
    type: string;
  };
};
const ListCard = ({ item }: CardProps) => {
  const [favourite, setFavourite] = useState(false);
  const { id, address, popular, title, type, img, priceRange } = item;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleFavorite = () => {
    setFavourite(!favourite);
    favourite ? notifyRemove() : notifyAdd();
  };

  return (
    <div
      key={id}
      className="relative mx-3 flex cursor-pointer flex-wrap rounded-2xl p-3 shadow-md shadow-dark transition-all duration-300 hover:shadow-xl hover:shadow-dark lg:m-0 lg:flex-nowrap"
    >
      <button
        onClick={handleFavorite}
        className="absolute  right-4 top-4 z-10 inline-block rounded-full bg-slate-100 p-2.5 text-primary transition-all duration-300 hover:shadow-lg "
      >
        {favourite ? (
          <HeartIcon className="h-8 w-8 text-red-500" />
        ) : (
          <HeartIconOutline className="h-8 w-8 text-red-500" />
        )}
      </button>
      <div className=" relative flex w-full justify-center  rounded-2xl lg:w-fit lg:justify-normal">
        {img ? (
          <Image
            width={300}
            height={300}
            src={img}
            alt="image"
            className={`rounded-2xl  lg:m-5 ${
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            }  object-cover transition-all duration-700 `}
            onLoadingComplete={() => setIsLoading(false)}
          />
        ) : null}
      </div>
      <div className="flex w-full flex-col justify-between lg:m-5">
        <div>
          <Link
            href={`/post/${id}/details`}
            className="pl-4 text-2xl font-medium text-neutral-700"
          >
            {title}
          </Link>
          <div className="mb-3 mt-2 flex items-center gap-1 pl-4 pt-3">
            <i className="las la-map-marker-alt text-lg text-[#9C742B]"></i>
            <span className="inline-flex gap-3">
              <MapPinIcon className="h-5 w-5" />
              {address}
            </span>
          </div>
          <div className="mx-3 md:mx-5">
            <div className=" border-t"></div>
          </div>
        </div>
        <div className="px-3 pb-5 pt-4 sm:px-4 md:px-5">
          <div className="flex flex-wrap items-center justify-start gap-5">
            <span className="text-xl font-medium text-primary">
              €{priceRange[0]} / €{priceRange[1]}
            </span>
            {popular && (
              <div className="relative z-10 inline-flex gap-4 rounded-md bg-primary px-9 py-2.5 text-sm font-medium text-white">
                <StarIcon className="h-5 w-5" />
                <div> Available online booking</div>
              </div>
            )}
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
