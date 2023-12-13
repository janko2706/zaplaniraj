import { useUser } from "@clerk/nextjs";
import { HeartIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, type MouseEvent } from "react";
import { toast } from "react-toastify";
import { api } from "~/utils/api";

const notifyAdd = () => toast.success("Dodano u favorite.");
const notifyRemove = () => toast.error("Izbaceno iz favorita.");

type CardProps = {
  item: {
    id: number;
    title: string;
    address: string;
    priceRange: (number | null)[];
    type: string;
    img?: string | null;
  };
  isFavorite?: boolean;
  category: string;
};
const ListCard = ({ item, isFavorite, category }: CardProps) => {
  const [favorite, setFavorite] = useState<boolean>(isFavorite ?? false);
  const { id, address, title, img, priceRange, type } = item;
  const { mutateAsync: addToFavorites } = api.user.setFavorite.useMutation({
    onSuccess: () => {
      setFavorite(true);
      notifyAdd();
    },
  });
  const { mutateAsync: removeFavorite } = api.user.removeFavorite.useMutation({
    onSuccess: () => {
      setFavorite(false);
      notifyRemove();
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleFavorite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (favorite === true) {
      await removeFavorite({ postId: id });
    } else {
      await addToFavorites({ postId: id.toString() });
    }
  };
  const { replace } = useRouter();
  const { isSignedIn } = useUser();
  return (
    <div
      key={id}
      className="relative mx-3 flex cursor-pointer flex-wrap rounded-2xl p-3 shadow-md shadow-dark transition-all duration-300 hover:shadow-xl hover:shadow-dark lg:m-0 lg:flex-nowrap"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        void (async () => {
          await replace(`/post/${item.id}/details?category=${category}`);
        })();
      }}
    >
      {isSignedIn && (
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleFavorite}
          className="absolute  right-4 top-4 z-10 inline-block rounded-full bg-slate-100 p-2.5 text-primary transition-all duration-300 hover:shadow-lg "
        >
          {favorite ? (
            <HeartIcon className="h-8 w-8 text-red-500" />
          ) : (
            <HeartIconOutline className="h-8 w-8 text-red-500" />
          )}
        </button>
      )}
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
          <div className="line-clamp-2 max-w-[18rem] truncate pl-4 text-2xl font-medium text-neutral-700 lg:max-w-[40rem]">
            {title}
          </div>
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
          <div className="mx-3 md:mx-5">
            <p>
              <span className="text-sm">Opis usluge: </span>
              <span className="line-clamp-2 max-w-lg truncate text-lg">
                {" "}
                {type}{" "}
              </span>
            </p>
          </div>
          <div className="mx-3 md:mx-5">
            <div className=" border-t"></div>
          </div>
        </div>
        <div className="px-3 pb-5 pt-4 sm:px-4 md:px-5">
          <div className="flex flex-wrap items-center justify-start gap-5">
            <span className="text-xl font-medium text-primary">
              od {priceRange[0]}€ do {priceRange[1]}€
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                void (async () => {
                  await replace(
                    `/post/${item.id}/details?category=${category}`
                  );
                })();
              }}
              className="btn-outline "
            >
              Istrazi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListCard;
