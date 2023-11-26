import { TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type CardProps = {
  item: {
    id: number;
    title: string;
    handleDelete: () => Promise<void>;
  };
};
const ListCardSimple = ({ item }: CardProps) => {
  const { id, title, handleDelete } = item;

  return (
    <div
      key={id}
      className="relative flex  w-full cursor-pointer flex-wrap items-center rounded-2xl bg-white p-1 shadow-md shadow-dark transition-all duration-300 hover:shadow-xl hover:shadow-dark lg:flex-nowrap"
    >
      <div className=" flex w-full items-center justify-between gap-3 truncate">
        <div className="flex items-center gap-2 truncate">
          <Link
            href={`/post/${id}/details`}
            className="truncate overflow-ellipsis p-2 pl-4 text-sm font-medium text-neutral-700 lg:text-xl"
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
