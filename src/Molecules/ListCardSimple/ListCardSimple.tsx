import { TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { toast } from "react-toastify";

const notifyAdd = () => toast.success("Added to Wishlist.");
const notifyRemove = () => toast.error("Removed From Wishlist.");

type CardProps = {
  item: {
    id: number;
    title: string;
    icon: JSX.Element;
    handleDelete: () => Promise<void>;
  };
};
const ListCardSimple = ({ item }: CardProps) => {
  const { id, title, icon, handleDelete } = item;

  return (
    <div
      key={id}
      className="relative mx-10 flex  w-full cursor-pointer flex-wrap items-center rounded-2xl bg-white p-1 shadow-md shadow-dark transition-all duration-300 hover:shadow-xl hover:shadow-dark lg:flex-nowrap"
    >
      <div className="m-2 flex w-full items-center justify-between gap-3 truncate">
        <div className="flex items-center gap-2 truncate">
          {icon}
          <Link
            href={`/post/${id}/details`}
            className="truncate overflow-ellipsis pl-4 text-sm font-medium text-neutral-700 lg:text-xl"
          >
            {title}
          </Link>
        </div>
        <TrashIcon
          className="h-12 w-12 hover:text-red-400 lg:h-7 lg:w-7"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
export default ListCardSimple;
