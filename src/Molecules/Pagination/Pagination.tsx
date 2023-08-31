import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Pagination() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-5 lg:pt-7">
      <span>Showing 1 to 7 of 20 entries</span>
      <ul className="flex flex-wrap gap-2">
        <li className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary duration-300 hover:bg-primary hover:text-white">
          <Link href="#">
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
        </li>
        <li className="flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-primary text-primary  duration-300 hover:bg-primary hover:text-white">
          <Link href="#">1</Link>
        </li>
        <li className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary duration-300 hover:bg-primary hover:text-white">
          <Link href="#">2</Link>
        </li>
        <li className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary duration-300 hover:bg-primary hover:text-white">
          <Link href="#">3</Link>
        </li>
        <li className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary duration-300 hover:bg-primary hover:text-white">
          <Link href="#">...</Link>
        </li>
        <li className="flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-primary text-primary  duration-300 hover:bg-primary hover:text-white">
          <Link href="#">
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
