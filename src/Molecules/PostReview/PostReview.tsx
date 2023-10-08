import React from "react";
import Image from "next/image";
import { StarIcon, HandThumbUpIcon } from "@heroicons/react/20/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { format } from "date-fns";

type Props = {
  reviewerName: string;
  reviewerImg: string;
  dateOfReview: Date;
  numberOfStars: number;
  reviewText: string;
  reviewLikes: number;
};

function PostReview({
  reviewerName,
  reviewerImg,
  dateOfReview,
  numberOfStars,
  reviewLikes,
  reviewText,
}: Props) {
  const renderStars = () => {
    const starsArray = [];
    for (let index = 0; index < numberOfStars; index++) {
      starsArray.push(1);
    }
    if (numberOfStars <= 5) {
      const neddedStars = 5 - numberOfStars;
      for (let index = 1; index <= neddedStars; index++) {
        starsArray.push(0);
      }
    }
    return starsArray;
  };
  return (
    <div className="mb-8 rounded-2xl bg-[var(--bg-2)] p-3 sm:p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="w-15 h-15 shrink-0 overflow-hidden rounded-full">
            <Image
              width={60}
              height={60}
              src={reviewerImg}
              alt="image"
              className=" object-fit-cover h-full w-full"
            />
          </div>
          <div className="flex-grow">
            <h5 className="mb-1 font-semibold"> {reviewerName} </h5>
          </div>
        </div>
        <div className="text-sm-end">
          <p className="mb-1"> {format(dateOfReview, "dd/mm/yyyy")} </p>
        </div>
      </div>
      <div className="my-6 border border-dashed"></div>
      <div className="mb-3 flex gap-1">
        {renderStars().map((item, index) => {
          if (item === 1)
            return (
              <StarIcon
                key={index}
                className="h-5 w-5 text-[var(--tertiary)]"
              />
            );
          else
            return (
              <StarOutline
                key={index}
                className="h-5 w-5 text-[var(--tertiary)]"
              />
            );
        })}
      </div>
      <p className="clr-neutral-500 mb-0">{reviewText}</p>
      <div className="my-6 border border-dashed"></div>
      <div className="flex flex-wrap items-center gap-10">
        <div className="flex items-center gap-2 text-primary">
          <HandThumbUpIcon className="h-5 w-5" />
          <span className="inline-block"> {reviewLikes} </span>
        </div>
      </div>
    </div>
  );
}

export default PostReview;
