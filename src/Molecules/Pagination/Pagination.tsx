import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  count: number;
  currentPage: number;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  onClickPage?: (pageClicked: number) => void;
};

function Pagination({
  count,
  currentPage,
  onClickLeft,
  onClickRight,
  onClickPage,
}: Props) {
  const pagesNedded = Math.round(count / 5);
  const arr = new Array(pagesNedded === 0 ? 1 : pagesNedded).fill(0);

  return (
    <div className="col-span-12 pb-6">
      <nav>
        <ul className="flex justify-center gap-3">
          <li>
            <button
              type="button"
              onClick={onClickLeft}
              className=" lh-1 grid h-10 w-10 place-content-center rounded-full border border-[var(--primary)] p-0 text-primary hover:bg-primary hover:text-white"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          </li>
          {arr.map((_i, idx) => {
            const currentPageNumber = idx + 1;
            return (
              <li key={idx}>
                <button
                  className={` lh-1 grid h-10 w-10 place-content-center rounded-full border border-[var(--primary)] hover:bg-primary hover:text-white ${
                    currentPageNumber === currentPage
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  } p-0 `}
                  type="button"
                  onClick={() => onClickPage && onClickPage(currentPageNumber)}
                >
                  {currentPageNumber}
                </button>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              className=" lh-1 grid h-10 w-10 place-content-center rounded-full border border-[var(--primary)] p-0 text-primary hover:bg-primary hover:text-white"
              onClick={onClickRight}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
