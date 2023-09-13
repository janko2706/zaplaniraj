import { Tab } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import BasicCard from "~/Atoms/Card/BasicCard";
import { FaHourglassHalf } from "react-icons/fa";
import classNames from "~/utils/classNames";

function RecommendedIndex() {
  return (
    <section className="relative bg-[var(--bg-2)] py-[60px] lg:py-5">
      <div className="container">
        <div className="mx-auto flex max-w-[570px] flex-col items-center px-3 text-center">
          <h2 className="h2 mt-3 pb-8 pt-5 text-neutral-600 lg:pb-14">
            Preporuceni prostori
          </h2>
        </div>
        <div>
          <Tab.Group>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-3">
              <Tab.List className="flex flex-wrap gap-3">
                {Object.keys(featuredItems).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "rounded-full px-7 py-4 font-semibold leading-5 duration-300",
                        selected
                          ? "bg-primary text-white shadow outline-none"
                          : "bg-[var(--primary-light)] text-neutral-600 hover:bg-primary hover:text-white"
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Link href="#" className="btn-outline  flex items-center gap-2">
                Pogledaj sve
                <i className="las la-long-arrow-alt-right text-2xl"></i>
              </Link>
            </div>
            <Tab.Panels className="mt-2">
              {Object.values(featuredItems).map((posts, idx) => (
                <Tab.Panel key={idx} className="grid grid-cols-12 gap-6">
                  {posts.map((item) => (
                    <BasicCard key={item.id} item={item} />
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
          <div className="mt-10 flex justify-center">
            <Link
              href="#"
              className="btn-primary flex items-center gap-2 font-medium"
            >
              <FaHourglassHalf className="text text-lg" /> Pokazi jos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecommendedIndex;

const featuredItems = {
  Vjencanja: [
    {
      id: 2,
      address: "8558 Green Rd.",
      title: "Spring Lane Cinemas - 1351 Plaza Blvd, Sanford, NC 27330",

      price: "7,255",
      popular: false,
      images: ["https://picsum.photos/200/300"],
    },
    {
      id: 3,
      title: "RCE Theaters - 907 S Beckford Dr, Henderson, NC 27536",
      address: "8558 Green Rd.",

      price: "7,255",
      popular: true,
      images: ["https://picsum.photos/200/300"],
    },
    {
      id: 1,
      title: "Regal North Hills - 4150 Main at North Hills St, Releigh",
      address: "3890 Poplar Dr.",

      price: "5,256",
      popular: true,
      images: ["https://picsum.photos/200/300"],
    },
  ],
  Rodendani: [
    {
      id: 4,
      title: "Costco Wholesale - 1021 Oak Forest Ln, Myrtle Beach, SC",
      address: "8558 Parker Rd.",

      price: "7,255",
      popular: true,
      images: ["https://picsum.photos/200/300"],
    },
    {
      id: 1,
      title: "Regal North Hills - 4150 Main at North Hills St, Releigh",
      address: "3890 Poplar Dr.",

      price: "5,256",
      popular: true,
      images: ["https://picsum.photos/200/300"],
    },
  ],
  Sakramenti: [
    {
      id: 5,
      title: "Dollar General - 5416 Rock Quarry Rd, Raleigh, NC 27610",
      address: "8558 Green Rd.",

      price: "7,255",
      popular: false,
      images: ["https://picsum.photos/200/300"],
    },
    {
      id: 1,
      title: "Regal North Hills - 4150 Main at North Hills St, Releigh",
      address: "3890 Poplar Dr.",

      price: "5,256",
      popular: true,
      images: ["https://picsum.photos/200/300"],
    },
  ],
};
