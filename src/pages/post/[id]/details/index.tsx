"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Tooltip } from "react-tooltip";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import {
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import classNames from "~/utils/classNames";
import MainTemplate from "~/Templates/MainTemplate";
import PostReview from "~/Molecules/PostReview/PostReview";
import Pagination from "~/Molecules/Pagination/Pagination";
import { FaFacebook, FaInstagram, FaLinkedin, FaParking } from "react-icons/fa";
import CalendarComponent from "~/Atoms/Calendar/Calendar";
import useMenu from "~/hooks/useMenu/useMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, GetStaticPaths } from "next";

const Index = () => {
  const tooltipStyle = {
    backgroundColor: "#3539E9",
    color: "#fff",
    borderRadius: "10px",
  };
  const { userCompany, menus } = useMenu();
  return (
    <MainTemplate menus={menus} userCompany={userCompany}>
      <>
        <div className="bg-[var(--bg-2)]">
          <div className="container-fluid p-0">
            <div>
              <div className="col-span-12">
                <Swiper
                  spaceBetween={16}
                  centeredSlides
                  centeredSlidesBounds
                  breakpoints={{
                    1000: {
                      slidesPerView: 3,
                    },
                  }}
                  navigation={{
                    nextEl: ".btn-next",
                    prevEl: ".btn-prev",
                  }}
                  modules={[Navigation]}
                  className="swiper "
                >
                  <div className="swiper-wrapper ">
                    <SwiperSlide className="swiper-slide ">
                      <div className="block">
                        <Image
                          width={500}
                          height={600}
                          src="https://picsum.photos/200/300"
                          alt="image"
                          className="rounded-2xl"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide ">
                      <div className="block">
                        <Image
                          width={500}
                          height={600}
                          src="https://picsum.photos/300/500"
                          alt="image"
                          className="rounded-2xl"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide ">
                      <div className="block">
                        <Image
                          width={500}
                          height={600}
                          src="https://picsum.photos/400/300"
                          alt="image"
                          className="rounded-2xl"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide ">
                      <div className="block">
                        <Image
                          width={500}
                          height={600}
                          src="https://picsum.photos/200/300"
                          alt="image"
                          className="rounded-2xl"
                        />
                      </div>
                    </SwiperSlide>
                  </div>
                  <button className="btn-prev absolute left-4 top-[45%] z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-white duration-300 hover:bg-primary hover:text-white">
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button className="btn-next absolute right-4 top-[45%] z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-white duration-300 hover:bg-primary hover:text-white">
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[var(--bg-2)] px-3 py-[30px] lg:py-[60px]">
          <div className="container">
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
              <div className="col-span-12 xl:col-span-8">
                <div className="section-space--sm">
                  <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:p-6">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                      <h2 className="h2 mb-0 mt-4"> Burj Al Arab </h2>
                      <ul className="flex items-center gap-3">
                        <li>
                          <Link
                            href="#"
                            className="link grid h-8 w-8 place-content-center rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                          >
                            <HeartIcon className="h-5 w-5" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="link grid h-8 w-8 place-content-center rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                          >
                            <ArrowsRightLeftIcon className="h-5 w-5" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="link grid h-8 w-8 place-content-center rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                          >
                            <ShareIcon className="h-5 w-5" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <ul className="gap-md-0 flex flex-wrap items-center justify-between gap-4">
                      <li>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-5 w-5 text-[var(--secondary-500)]" />
                          <p className="mb-0"> 3890 Poplar Dr. </p>
                        </div>
                      </li>
                      <li className="text-lg text-primary">•</li>

                      <li>
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                          <p className="mb-0"> 4.5(66) </p>
                        </div>
                      </li>
                      <li className="text-lg text-primary">•</li>
                      <li>
                        <p className="mb-0 flex items-center gap-1">
                          <ClockIcon className="h-5 w-5 text-[var(--tertiary)]" />
                          <span className="clr-neutral-500">Published:</span>
                          Feb 9, 23
                        </p>
                      </li>
                    </ul>
                    <div className="my-8 border border-dashed"></div>
                    <ul className="flex flex-wrap items-center gap-3">
                      <li>
                        <span className="block text-lg font-medium">
                          Ukljuceno -
                        </span>
                      </li>
                      <li>
                        <div
                          data-tooltip-id="parking"
                          className="grid h-10 w-10 place-content-center rounded-full bg-bg2 text-primary"
                        >
                          <FaParking
                            width={28}
                            height={28}
                            className="  h-7 w-7"
                          />
                        </div>
                      </li>
                    </ul>
                    <Tooltip
                      id="parking"
                      style={tooltipStyle}
                      offset={7}
                      content="Parking"
                    />
                  </div>
                  <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:p-6">
                    <h4 className="mb-5 text-2xl font-semibold">Description</h4>
                    <p className="clr-neutral-500 mb-5">
                      The Burj Al Arab is a luxurious 7-star hotel located in
                      Dubai, United Arab Emirates. It is known for its
                      distinctive sail-shaped silhouette and its iconic status
                      as one of the world&apos;s most luxurious hotels. The
                      hotel offers a variety of amenities and services,
                      including private butler service, luxurious suites, a spa,
                      several restaurants and bars, and access to the
                      hotel&apos;s private beach.
                    </p>
                  </div>
                  <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:p-6">
                    <h4 className="mb-5 text-2xl font-semibold"> Services </h4>
                    <div className="mb-10">
                      <ul className="flex flex-wrap gap-4">
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="grid h-6 w-6 shrink-0 place-content-center rounded-full bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">Dry cleaning</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:p-6">
                    <h4 className="mb-5 text-2xl font-semibold">Advantages</h4>
                    <ul className="mb-5 flex flex-col gap-4">
                      <li>
                        <div className="flex gap-4">
                          <div className="grid h-6 w-6 shrink-0 place-content-center rounded-full bg-[var(--primary-light)]">
                            <i className="las la-check text-lg text-primary"></i>
                          </div>
                          <span className="inline-block">
                            World-class luxury: The hotel is known for its
                            opulent design and over-the-top luxury.
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex gap-4">
                          <div className="grid h-6 w-6 shrink-0 place-content-center rounded-full bg-[var(--primary-light)]">
                            <i className="las la-check text-lg text-primary"></i>
                          </div>
                          <span className="inline-block">
                            Unmatched service: The hotel prides itself on its
                            personalized service and attention to detail.
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex gap-4">
                          <div className="grid h-6 w-6 shrink-0 place-content-center rounded-full bg-[var(--primary-light)]">
                            <i className="las la-check text-lg text-primary"></i>
                          </div>
                          <span className="inline-block">
                            Exclusive amenities: Burj Al Arab offers a range of
                            exclusive amenities, including a private beach, an
                            outdoor pool, and a spa.
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex gap-4">
                          <div className="grid h-6 w-6 shrink-0 place-content-center rounded-full bg-[var(--primary-light)]">
                            <i className="las la-check text-lg text-primary"></i>
                          </div>
                          <span className="inline-block">
                            Incredible views: The hotel is located on a man-made
                            island, which offers incredible views of the Dubai
                            skyline and the Arabian Gulf.
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:p-6">
                    <h4 className="mb-5 text-2xl font-semibold">
                      Hotel Policies
                    </h4>
                    <ul className="mb-5 flex flex-col gap-4">
                      <li>
                        <div className="flex gap-4">
                          <div className="grid h-6 w-6 shrink-0 place-content-center rounded-full bg-[var(--primary-light)]">
                            <i className="las la-check text-lg text-primary"></i>
                          </div>
                          <span className="inline-block">
                            Check-in and check-out: Check-in time is 3:00 PM,
                            and check-out time is 12:00 PM
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex gap-4">
                          <div className="grid h-6 w-6 shrink-0 place-content-center rounded-full bg-[var(--primary-light)]">
                            <i className="las la-check text-lg text-primary"></i>
                          </div>
                          <span className="inline-block">
                            Children policy: Children of all ages are welcome at
                            Hotel. The hotel offers a range of amenities and
                            activities for children, including a kids club and
                            babysitting services.
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex gap-4">
                          <div className="grid h-6 w-6 shrink-0 place-content-center rounded-full bg-[var(--primary-light)]">
                            <i className="las la-check text-lg text-primary"></i>
                          </div>
                          <span className="inline-block">
                            Smoking policy: Our Hotel is a non-smoking hotel.
                            Smoking is prohibited in all rooms and public areas.
                            Violators may be subject to a cleaning fee.
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex gap-4">
                          <div className="grid h-6 w-6 shrink-0 place-content-center rounded-full bg-[var(--primary-light)]">
                            <i className="las la-check text-lg text-primary"></i>
                          </div>
                          <span className="inline-block">
                            Pet policy: Pets are not allowed at Hotel,with the
                            exception of guide dogs.
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:mb-14 lg:px-5 lg:py-8">
                    <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                        <h3 className="h3 mb-0"> 4.7 (21 reviews) </h3>
                      </div>
                    </div>
                    <PostReview
                      reviewerName={"Kiss Laura"}
                      reviewerImg={"https://picsum.photos/300/300"}
                      dateOfReview={new Date()}
                      numberOfStars={3}
                      reviewText={
                        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt temporibus odit minima vero repudiandae aliquid aliquam? Consequatur voluptate sapiente distinctio."
                      }
                      reviewLikes={200}
                    />
                    <Pagination />
                  </div>

                  <div className="mb-10 lg:mb-14">
                    <div className="rounded-2xl bg-white px-5 py-8">
                      <h4 className="mb-0 text-2xl font-semibold">
                        Write a review
                      </h4>
                      <div className="my-6 border border-dashed"></div>
                      <p className="mb-3 text-xl font-medium">Rating</p>
                      <div className="flex gap-2">
                        <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                        <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                        <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                        <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                        <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                      </div>

                      <form action="#">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label
                              htmlFor="review-name"
                              className="mb-3 block text-xl font-medium"
                            >
                              Name *
                            </label>
                            <input
                              type="text"
                              className="border-neutral-40 w-full rounded-full border bg-[var(--bg-1)] px-5 py-3 focus:outline-none"
                              placeholder="Enter Name.."
                              id="review-name"
                            />
                          </div>
                          <div className="col-span-12">
                            <label
                              htmlFor="review-email"
                              className="mb-3 block text-xl font-medium"
                            >
                              Email *
                            </label>
                            <input
                              type="text"
                              className="border-neutral-40 w-full rounded-full border bg-[var(--bg-1)] px-5 py-3 focus:outline-none"
                              placeholder="Enter Email.."
                              id="review-email"
                            />
                          </div>
                          <div className="col-span-12">
                            <label
                              htmlFor="review-review"
                              className="mb-3 block text-xl font-medium"
                            >
                              Review *
                            </label>
                            <textarea
                              id="review-review"
                              rows={5}
                              className="w-full rounded-2xl border bg-[var(--bg-1)] px-5 py-3 focus:outline-none"
                            ></textarea>
                          </div>
                          <div className="col-span-12">
                            <Link href="#" className="btn-primary">
                              Submit Review
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 xl:col-span-4">
                <div className="relative mb-6 pb-0">
                  <div className="rounded-2xl bg-white px-6 py-8">
                    <p className="mb-3 text-lg font-medium"> Price </p>
                    <div className="mb-6 flex items-start gap-2">
                      <div className="flex items-center gap-3">
                        <i className="las la-tag text-2xl"></i>
                        <p className="mb-0"> From </p>
                        <h3 className="h3 mb-0"> $399 </h3>
                      </div>
                      <i className="las la-info-circle text-2xl"></i>
                    </div>

                    <Tab.Group>
                      <Tab.List className="about-tab mb-7 flex gap-3">
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "focus:outline-none",
                              selected ? "font-medium text-primary" : ""
                            )
                          }
                        >
                          Booking Form
                        </Tab>
                        <span>|</span>
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "focus:outline-none",
                              selected ? "font-medium text-primary" : ""
                            )
                          }
                        >
                          Enquiry Form
                        </Tab>
                      </Tab.List>
                      <Tab.Panels className="tab-content mb-6 lg:mb-8">
                        <Tab.Panel>
                          <CalendarComponent column />
                        </Tab.Panel>
                        <Tab.Panel>
                          <form className="flex flex-col gap-5">
                            <input
                              type="text"
                              placeholder="Name..."
                              className="w-full rounded-full border bg-[var(--bg-1)] px-3 py-2 focus:outline-none md:px-4 md:py-3"
                              required
                            />
                            <input
                              type="email"
                              placeholder="Email..."
                              className="w-full rounded-full border bg-[var(--bg-1)] px-3 py-2 focus:outline-none md:px-4 md:py-3"
                              required
                            />
                            <textarea
                              rows={6}
                              placeholder="Message..."
                              className="w-full rounded-3xl border bg-[var(--bg-1)] px-3 py-2 focus:outline-none md:px-4 md:py-3"
                            ></textarea>
                          </form>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>

                    <Link
                      href="#"
                      className="link :bg-primary-400 mb-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white hover:text-white"
                    >
                      <span className="inline-block"> Proceed Booking </span>
                    </Link>
                  </div>
                </div>
                <div className="rounded-2xl bg-white px-6 py-8">
                  <div className="relative mx-auto mb-10 grid h-32 w-32 place-content-center rounded-full border border-[var(--primary)] bg-white p-4">
                    <Image
                      width={96}
                      height={96}
                      src="https://picsum.photos/200/300"
                      alt="image"
                      className="rounded-full"
                    />
                    <div className="white absolute bottom-0 right-0 grid h-8 w-8 place-content-center rounded-full border-2 bg-primary text-white">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <h4 className="mb-4 text-center text-2xl font-semibold">
                    Savannah Nguyen
                  </h4>
                  <ul className="mb-7 flex flex-wrap items-center justify-center gap-3">
                    <li>
                      <div className="flex items-center gap-1">
                        <i className="las la-star text-[var(--tertiary)]"></i>
                        <p className="mb-0"> 4.7 </p>
                        <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                      </div>
                    </li>
                  </ul>
                  <ul className="flex flex-wrap justify-center gap-3">
                    <li>
                      <Link
                        href="#"
                        className="link grid h-9 w-9 place-content-center rounded-full bg-[var(--primary-light)] text-primary duration-300 hover:bg-primary hover:text-white"
                      >
                        <FaFacebook className=" text-xl" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="link grid h-9 w-9 place-content-center rounded-full bg-[var(--primary-light)] text-primary duration-300 hover:bg-primary hover:text-white"
                      >
                        <FaInstagram className="lab la-instagram text-xl" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="link grid h-9 w-9 place-content-center rounded-full bg-[var(--primary-light)] text-primary duration-300 hover:bg-primary hover:text-white"
                      >
                        <FaLinkedin className="lab la-linkedin-in text-xl" />
                      </Link>
                    </li>
                  </ul>
                  <div className="my-7 border border-dashed"></div>
                  <ul className="max-text-30 mx-auto mb-10 flex flex-col gap-4">
                    <li>
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-5 w-5 text-primary" />
                        <p className="mb-0"> Joined in June 2018 </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center gap-2">
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-[var(--secondary)]" />
                        <p className="mb-0"> Response rate - 100% </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5 text-[var(--tertiary)]" />
                        <p className="mb-0"> Fast response </p>
                      </div>
                    </li>
                  </ul>
                  <div className="text-center">
                    <Link href="#" className="btn-outline  font-semibold">
                      See Host Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MainTemplate>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "hr", ["common", "dashboard"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: {
    result: {
      data?: {
        json: { id: string }[];
      };
    };
  } = await fetch(
    "https://zaplaniraj.vercel.app/api/trpc/businessPost.getAllPostsForPages"
  ).then((res) => {
    return res.json();
  });
  console.log("Result: ", result);
  if (!result?.result?.data) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const userData = result.result.data.json;
  const engPaths = userData.map((item) => {
    return {
      params: {
        id: item.id,
      },
      locale: "en-US",
    };
  });
  const hrPaths = userData.map((item) => {
    return {
      params: {
        id: item.id,
      },
      locale: "hr",
    };
  });
  const dePaths = userData.map((item) => {
    return {
      params: {
        id: item.id,
      },
      locale: "de-DE",
    };
  });
  return {
    paths: [...engPaths, ...dePaths, ...hrPaths],
    fallback: true,
  };
};
