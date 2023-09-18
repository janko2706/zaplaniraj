import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Pagination() {
  return (
    <div className="col-span-12">
      <nav>
        <ul className="flex justify-center gap-3">
          <li className="page-item">
            <Link
              className="page-link lh-1 grid h-10 w-10 place-content-center rounded-full border border-[var(--primary)] p-0 text-primary"
              href="#"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link lh-1 grid h-10 w-10 place-content-center rounded-full border border-[var(--primary)] bg-primary p-0 text-white"
              href="#"
            >
              1
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link lh-1 grid h-10 w-10 place-content-center rounded-full border border-[var(--primary)] p-0 text-primary"
              href="#"
            >
              2
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link lh-1 grid h-10 w-10 place-content-center rounded-full border border-[var(--primary)] p-0 text-primary"
              href="#"
            >
              3
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link lh-1 grid h-10 w-10 place-content-center rounded-full border border-[var(--primary)] p-0 text-primary"
              href="#"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
