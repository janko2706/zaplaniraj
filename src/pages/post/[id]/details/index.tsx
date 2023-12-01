import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Tooltip } from "react-tooltip";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { PlusCircleIcon, StarIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import type { WholePostType } from "~/utils/types";
import {
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
import { FaFacebook, FaGlobe, FaInstagram, FaParking } from "react-icons/fa";
import CalendarComponent from "~/Atoms/Calendar/Calendar";
import useMenu from "~/hooks/useMenu/useMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";

type CustomDehydrateState = {
  json: {
    queries: {
      state: {
        data: WholePostType;
      };
    }[];
  };
};

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const postData: CustomDehydrateState = props.trpcState;

  const { updateStatistics } = useStatistics();

  const { query } = useRouter();
  const category = query.category;

  const [post, setPost] = useState<WholePostType | undefined>();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (postData) {
      setPost(postData.json.queries[0]?.state.data);
    }
  }, [postData]);
  useEffect(() => {
    if (isSignedIn) {
      const month = format(new Date(), "LLLL");
      if (!post?.statisticId) return;
      if (!category) return;
      void (async () => {
        await updateStatistics({
          id: post?.statisticId ?? 0,
          month,
          category: category as string,
        });
      })();
    }
  }, [isSignedIn, updateStatistics, post]);

  const tooltipStyle = {
    backgroundColor: "#3539E9",
    color: "#fff",
    borderRadius: "10px",
  };
  const { userCompany, menus } = useMenu();
  if (!post)
    return (
      <div className="flex h-screen w-full items-center justify-center ">
        <LoadingSpinner spinnerHeight="h-14" spinnerWidth="w-14" />
      </div>
    );
  const pictures = post.pictures?.split(",");
  const offerPictures = post.offerPictures?.split(",");
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
                    {pictures ? (
                      pictures.map((item, idx) => {
                        if (item === "") return;
                        return (
                          <SwiperSlide className="swiper-slide " key={idx}>
                            <div className="block">
                              <Image
                                width={500}
                                height={600}
                                src={item}
                                alt="image"
                                className="rounded-2xl"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })
                    ) : (
                      <></>
                    )}
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
                      <h2 className="h2 mb-0 mt-4"> {post.title} </h2>
                      <ul className="flex items-center gap-3">
                        <li>
                          <Link
                            href="#"
                            className="link grid h-8 w-8 place-content-center rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                            data-tooltip-id="like-post"
                          >
                            <HeartIcon className="h-5 w-5" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            data-tooltip-id="add-to-project"
                            className="link grid h-8 w-8 place-content-center rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                          >
                            <PlusCircleIcon className="h-5 w-5" />
                          </Link>
                        </li>

                        <li>
                          <Link
                            href="#"
                            className="link grid h-8 w-8 place-content-center rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                            data-tooltip-id="share-post"
                          >
                            <ShareIcon className="h-5 w-5" />
                          </Link>
                        </li>
                      </ul>
                      <Tooltip
                        id={"add-to-project"}
                        style={tooltipStyle}
                        offset={7}
                        content="Dodaj u plan"
                      />
                      <Tooltip
                        id={"share-post"}
                        style={tooltipStyle}
                        offset={7}
                        content="Podijeli oglas"
                      />
                      <Tooltip
                        id={"like-post"}
                        style={tooltipStyle}
                        offset={7}
                        content="Dodaj u favorite"
                      />
                    </div>
                    <ul className="gap-md-0 flex flex-wrap items-center justify-between gap-4">
                      <li>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-5 w-5 text-[var(--secondary-500)]" />
                          <p className="mb-0"> {post.location} </p>
                        </div>
                      </li>
                      {post.reviews.length ? (
                        <>
                          <li className="text-lg text-primary">•</li>
                          <li>
                            <div className="flex items-center gap-1">
                              <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                              <p className="mb-0">
                                {post.statistics.averageReviewGrade}
                              </p>
                            </div>
                          </li>
                        </>
                      ) : (
                        <></>
                      )}

                      <li className="text-lg text-primary">•</li>
                      <li>
                        <p className="mb-0 flex items-center gap-1">
                          <ClockIcon className="h-5 w-5 text-[var(--tertiary)]" />
                          <span className="clr-neutral-500">
                            Najranije dostupno:
                          </span>
                          {post.earlisetAvailable
                            ? format(
                                new Date(
                                  post.earlisetAvailable ?? "20/02/2024"
                                ),
                                "dd / MM / yyy"
                              )
                            : ""}
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
                      {post.parkingPlaces ? (
                        <li>
                          <div
                            data-tooltip-id="parking"
                            className="flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-bg2 px-2 text-primary"
                          >
                            {post.parkingPlaces} <span>-</span>
                            <FaParking
                              width={28}
                              height={28}
                              className="h-7 w-7"
                            />
                          </div>
                        </li>
                      ) : (
                        <></>
                      )}
                    </ul>
                    <Tooltip
                      id="parking"
                      style={tooltipStyle}
                      offset={7}
                      content={`Ukljuceno ${
                        post.parkingPlaces ? post.parkingPlaces : 0
                      } mjesta za parking.`}
                    />
                  </div>
                  <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:p-6">
                    <h4 className="mb-5 text-2xl font-semibold">
                      Opis poslovanja
                    </h4>
                    <p className="clr-neutral-500 mb-5">
                      {post.companyDescription}
                    </p>
                  </div>
                  <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:p-6">
                    <h4 className="mb-5 text-2xl font-semibold">Opis usluge</h4>
                    <p className="clr-neutral-500 mb-5">
                      {post.serviceDescription}
                    </p>
                  </div>
                  {offerPictures && offerPictures[0] !== "" ? (
                    <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:p-6">
                      <h4 className="mb-5 text-2xl font-semibold">
                        Slike ponude
                      </h4>
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
                          {offerPictures.map((item, idx) => {
                            if (item === "") return;
                            return (
                              <SwiperSlide className="swiper-slide " key={idx}>
                                <div className="block">
                                  <Image
                                    width={500}
                                    height={600}
                                    src={item}
                                    alt="image"
                                    className="rounded-2xl"
                                  />
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </div>
                        <button className="btn-prev absolute left-4 top-[45%] z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-white duration-300 hover:bg-primary hover:text-white">
                          <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <button className="btn-next absolute right-4 top-[45%] z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-white duration-300 hover:bg-primary hover:text-white">
                          <ChevronRightIcon className="h-5 w-5" />
                        </button>
                      </Swiper>
                    </div>
                  ) : (
                    <></>
                  )}
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

                  {post.reviews && post.reviews.length ? (
                    <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:mb-14 lg:px-5 lg:py-8">
                      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                          <h3 className="h3 mb-0">
                            {post.statistics.averageReviewGrade} (
                            {post.statistics.numberOfReviews} reviews)
                          </h3>
                        </div>
                      </div>
                      {post.reviews.map((item, idx) => {
                        return (
                          <PostReview
                            key={idx}
                            reviewerName={item.userName}
                            dateOfReview={item.createdAt}
                            numberOfStars={item.starts}
                            reviewText={item.reviewText}
                            reviewLikes={item.likes}
                          />
                        );
                      })}
                      <Pagination count={20} currentPage={1} />
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="mb-10 lg:mb-14">
                    <div className="rounded-2xl bg-white px-5 py-8">
                      <h4 className="mb-0 text-2xl font-semibold">
                        Ostavite recenziju
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
                              Ime *
                            </label>
                            <input
                              type="text"
                              className="border-neutral-40 w-full rounded-full border bg-[var(--bg-1)] px-5 py-3 focus:outline-none"
                              defaultValue={
                                user ? user.fullName ?? undefined : undefined
                              }
                              placeholder={"Unesite ime..."}
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
                              defaultValue={
                                user
                                  ? user.emailAddresses[0]?.emailAddress ??
                                    undefined
                                  : undefined
                              }
                              placeholder={"Unesite email..."}
                              id="review-email"
                            />
                          </div>
                          <div className="col-span-12">
                            <label
                              htmlFor="review-review"
                              className="mb-3 block text-xl font-medium"
                            >
                              Recenzija *
                            </label>
                            <textarea
                              id="review-review"
                              rows={5}
                              className="w-full rounded-2xl border bg-[var(--bg-1)] px-5 py-3 focus:outline-none"
                              placeholder="Vase misljene o poslovanju..."
                            ></textarea>
                          </div>
                          <div className="col-span-12">
                            <button
                              type="submit"
                              onClick={(e) => e.preventDefault()}
                              className="btn-primary"
                            >
                              Posalji recenziju
                            </button>
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
                    <p className="mb-3 text-lg font-medium"> Cijena </p>
                    <div className="mb-6 flex items-start gap-2">
                      <div className="flex items-center gap-3">
                        <i className="las la-tag text-2xl"></i>
                        <p className="mb-0"> Od </p>
                        <h3 className="h3 mb-0"> {post.priceRangeMin}€ </h3>
                        <p className="mb-0"> Do </p>
                        <h3 className="h3 mb-0"> {post.priceRangeMax}€ </h3>
                      </div>
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
                  <h2 className="mb-4 text-center text-4xl font-semibold">
                    {post.business?.name ?? ""}
                  </h2>
                  {post.statistics.averageReviewGrade ? (
                    <ul className="mb-7 flex flex-wrap items-center justify-center gap-3">
                      <li>
                        <div className="flex items-center gap-1">
                          <i className="las la-star text-[var(--tertiary)]"></i>
                          <p className="mb-0">
                            {post.statistics.averageReviewGrade}
                          </p>
                          <StarIcon className="h-5 w-5 text-[var(--tertiary)]" />
                        </div>
                      </li>
                    </ul>
                  ) : (
                    <></>
                  )}
                  <ul className="flex flex-wrap justify-center gap-3">
                    {post.website ? (
                      <li>
                        <Link
                          href={post.website}
                          target="_blank"
                          className="link grid h-9 w-9 place-content-center rounded-full bg-[var(--primary-light)] text-primary duration-300 hover:bg-primary hover:text-white"
                        >
                          <FaGlobe className=" text-xl" />
                        </Link>
                      </li>
                    ) : (
                      <></>
                    )}
                    {post.facebookLink ? (
                      <li>
                        <Link
                          href={post.facebookLink}
                          target="_blank"
                          className="link grid h-9 w-9 place-content-center rounded-full bg-[var(--primary-light)] text-primary duration-300 hover:bg-primary hover:text-white"
                        >
                          <FaFacebook className=" text-xl" />
                        </Link>
                      </li>
                    ) : (
                      <></>
                    )}
                    {post.instagramLink ? (
                      <li>
                        <Link
                          href={post.instagramLink}
                          target="_blank"
                          className="link grid h-9 w-9 place-content-center rounded-full bg-[var(--primary-light)] text-primary duration-300 hover:bg-primary hover:text-white"
                        >
                          <FaInstagram className="lab la-instagram text-xl" />
                        </Link>
                      </li>
                    ) : (
                      <></>
                    )}
                  </ul>
                  <div className="my-7 border border-dashed"></div>
                  <ul className="max-text-30 mx-auto mb-10 flex flex-col gap-4">
                    <li>
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-5 w-5 text-primary" />
                        <p className="mb-0">
                          {" "}
                          Joined in{" "}
                          {format(
                            new Date(
                              post.business?.user?.createdAt ?? "10/10/2023"
                            ),
                            "LLLL yyyy"
                          )}{" "}
                        </p>
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

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { stripe } from "~/server/stripe/client";
import { useEffect, useState } from "react";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";
import { useUser } from "@clerk/nextjs";
import useStatistics from "~/Organisms/CompanySpecific/useStatistics";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma: prisma,
      userId: null,
      stripe: stripe,
    },
    transformer: superjson,
  });
  const id = parseInt(params?.id as string, 10);
  await helpers.businessPost.getPostById.prefetch({ postId: id });

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "hr", [
        "common",
        "dashboard",
      ])),
      trpcState: helpers.dehydrate(),
      id,
    },
    revalidate: 1,
  };
};

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
