import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import {
  CheckCircleIcon,
  PlusCircleIcon,
  StarIcon,
  HeartIcon as HeartSolid,
} from "@heroicons/react/20/solid";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { FaFacebook, FaGlobe, FaInstagram } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PostReview from "~/Molecules/PostReview/PostReview";
import MainTemplate from "~/Templates/MainTemplate";
import useMenu from "~/hooks/useMenu/useMenu";
import type { WholePostType } from "~/utils/types";

type CustomDehydrateState = {
  json: {
    queries: {
      state: {
        data: WholePostType;
      };
    }[];
  };
};

const notifyAdd = () => toast.success("Dodano u favorite.");
const notifyRemove = () => toast.error("Izbaceno iz favorita.");

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const postData: CustomDehydrateState = props.trpcState;

  const { updateStatistics } = useStatistics();

  const { query, reload } = useRouter();
  const category = query.category;

  const [openPlanModal, setOpenPlanModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<"budget" | "post">("post");
  const [post, setPost] = useState<WholePostType | undefined>();
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [selectedPrice, setSelectedPrice] = useState<
    | {
        name: string;
        id?: number;
        unit?: string;
        price?: number;
        maximum?: number;
        onClick?: MouseEventHandler<HTMLLIElement> | undefined;
      }
    | undefined
  >({ name: "Koju uslugu zelite?" });
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
          category: getTranslationForStatistics(category as string),
        });
      })();
    }
  }, [isSignedIn, updateStatistics, post, category]);

  const { mutateAsync: createReview } =
    api.businessPost.createPostReview.useMutation({
      onSuccess: () => {
        reload();
        toast.success("Recenzija poslana.");
      },
    });

  const { mutateAsync: addToFavorites } = api.user.setFavorite.useMutation({
    onSuccess: () => {
      setFavorite(true);
      notifyAdd();
    },
  });
  const { data } = api.businessPost.getFavoritePosts.useQuery();

  const { mutateAsync: removeFavorite } = api.user.removeFavorite.useMutation({
    onSuccess: () => {
      setFavorite(false);
      notifyRemove();
    },
  });
  const [favorite, setFavorite] = useState<boolean>(
    data?.some((i) => i.id === post?.id) ?? false
  );

  const postReviewAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void (async () =>
      await createReview({
        postId: post?.id ?? 0,
        stars: starsArray.filter((e) => e.color === "text-yellow-300").length,
        reviewText: reviewText,
        userName: user && user.fullName ? user.fullName : userName,
      }))();
  };

  const [starsArray, setStarsArray] = useState<{ color: string }[]>([
    { color: "text-yellow-300" },
    { color: "text-slate-300" },
    { color: "text-slate-300" },
    { color: "text-slate-300" },
    { color: "text-slate-300" },
  ]);
  const [reviewText, setReviewText] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

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
                          <button
                            type="button"
                            className="link grid h-8 w-8 place-content-center rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                            data-tooltip-id="like-post"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={async () => {
                              if (favorite) {
                                await removeFavorite({
                                  postId: post.id ?? 0,
                                });
                                return;
                              } else {
                                await addToFavorites({
                                  postId: post.id.toString() ?? "",
                                });
                                return;
                              }
                            }}
                          >
                            {!favorite ? (
                              <HeartIcon className={`h-5 w-5 `} />
                            ) : (
                              <HeartSolid
                                className={`} h-5 w-5
                                text-red-500`}
                              />
                            )}
                          </button>
                        </li>
                        <li>
                          <button
                            data-tooltip-id="add-to-project"
                            className="link grid h-8 w-8 place-content-center rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                            onClick={() => {
                              setModalAction("post");
                              setOpenPlanModal(true);
                            }}
                          >
                            <PlusCircleIcon className="h-5 w-5" />
                          </button>
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
                        <a
                          href={`https://www.google.com/maps/place/${post.location}`}
                          target="_blank"
                          className="flex items-center gap-2 transition-all duration-200 ease-in-out hover:text-blue-400"
                        >
                          <MapPinIcon className="h-5 w-5 text-[var(--secondary-500)]" />
                          <p className="mb-0"> {post.location} </p>
                        </a>
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
                  {post.prices.length ? (
                    <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:p-6">
                      <h4 className="mb-5 text-2xl font-semibold">
                        Izracunaj cijenu usluge
                      </h4>

                      <HeroDropdown
                        options={post.prices}
                        selected={selectedPrice}
                        setSelected={setSelectedPrice}
                      />
                      {selectedPrice &&
                        selectedPrice.name !== "Koju uslugu zelite?" && (
                          <div className="mt-8 flex flex-col rounded-lg  bg-slate-100 p-2">
                            <div className="w-full">
                              <div className="m-5 flex flex-col gap-3">
                                <p className="font-bold">
                                  <span className="font-normal">Cijena:</span>{" "}
                                  {selectedPrice.price}€ po {selectedPrice.unit}
                                </p>
                                <p className="font-bold">
                                  <span className="font-normal">
                                    Maksimalna kolicina:
                                  </span>{" "}
                                  {selectedPrice.maximum}
                                </p>
                              </div>
                              <div className="m-5 flex items-center justify-start gap-3">
                                <p className="line-clamp-1 w-fit">
                                  Unesite potrebnu kolicinu:
                                </p>
                                <input
                                  type="number"
                                  max={selectedPrice.maximum}
                                  min={0}
                                  placeholder="Potrebna kolicina..."
                                  className="m-4 w-40 rounded-lg bg-slate-200 px-2"
                                  onChange={(e) => {
                                    const calcPrice =
                                      Number(
                                        e.target.value as unknown as number
                                      ) * (selectedPrice.price ?? 0);

                                    setCalculatedPrice(
                                      Number(
                                        e.target.value as unknown as number
                                      ) > (selectedPrice.maximum ?? 0)
                                        ? 0
                                        : calcPrice
                                    );
                                  }}
                                />
                              </div>
                            </div>
                            <hr className="border border-dashed border-slate-400" />

                            <div className="mb-3 ml-4 mt-6 flex w-fit gap-4 rounded-lg bg-primary px-4 py-1 text-xl text-white">
                              Izracunata cijena: {calculatedPrice}€
                            </div>
                          </div>
                        )}
                      <button
                        className="mt-10 rounded-lg bg-blue-500 px-3 py-2 text-white transition-all duration-300 ease-in-out hover:bg-blue-700 disabled:opacity-20 disabled:hover:bg-blue-300"
                        disabled={calculatedPrice === 0}
                        type="button"
                        onClick={() => {
                          setModalAction("budget");
                          setOpenPlanModal(true);
                        }}
                      >
                        Dodaj cijenu u plan
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {user &&
                  !post.reviews.some((e) => e.userName === user.fullName) ? (
                    <div className="mb-10 lg:mb-14">
                      <div className="rounded-2xl bg-white px-5 py-8">
                        <h4 className="mb-0 text-2xl font-semibold">
                          Ostavite recenziju
                        </h4>
                        <div className="my-6 border border-dashed"></div>
                        <form onSubmit={postReviewAction}>
                          <p className="mb-3 text-xl font-medium">Rating</p>
                          <div className="mb-2 flex gap-1">
                            {starsArray.map((color, idx) => {
                              return (
                                <i
                                  key={idx}
                                  className={`h-6 w-6 ${color.color} transition-all duration-200 ease-in-out hover:cursor-pointer`}
                                  onClick={() =>
                                    setStarsArray((prev) => {
                                      const newArray = [...prev];
                                      return newArray.map((_item, index) => {
                                        if (idx <= index - 1)
                                          return {
                                            color: "text-slate-300",
                                          };
                                        return {
                                          color: "text-yellow-300",
                                        };
                                      });
                                    })
                                  }
                                >
                                  <StarIcon />
                                </i>
                              );
                            })}
                          </div>
                          <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12">
                              <label
                                htmlFor="review-name"
                                className="mb-3 block text-xl font-medium"
                              >
                                Ime i prezime *
                              </label>
                              <input
                                required
                                type="text"
                                className="border-neutral-40 w-full rounded-full border bg-[var(--bg-1)] px-5 py-3 focus:outline-none"
                                readOnly={user && user.fullName ? true : false}
                                value={
                                  user ? user.fullName ?? undefined : undefined
                                }
                                placeholder={"Unesite ime..."}
                                id="review-name"
                                onChange={(e) => setUserName(e.target.value)}
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
                                required
                                id="review-review"
                                rows={5}
                                className="w-full rounded-2xl border bg-[var(--bg-1)] px-5 py-3 focus:outline-none"
                                placeholder="Vase misljene o poslovanju..."
                                onChange={(e) => setReviewText(e.target.value)}
                              ></textarea>
                            </div>
                            <div className="col-span-12">
                              <button type="submit" className="btn-primary">
                                Posalji recenziju
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-10 flex items-center gap-6 rounded-2xl bg-white p-3 sm:p-4 lg:mb-14 lg:px-5 lg:py-8">
                      <CheckCircleIcon className="h-10 w-10 text-green-400" />
                      Hvala na recenziji.
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-12 xl:col-span-4">
                {post.reviews &&
                  (post.reviews.length ? (
                    <div className="mb-10 rounded-2xl bg-white p-3 sm:p-4 lg:mb-14 lg:px-5 lg:py-8">
                      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <h3 className=" mb-0">
                            ({post.statistics.numberOfReviews} recenzija)
                          </h3>
                          <div className="flex items-center gap-1">
                            <h3 className="text-2xl">Prosjek: </h3>{" "}
                            {starsArray.map((color, idx) => {
                              let newColor = color.color;
                              if (idx < post.statistics.averageReviewGrade) {
                                newColor = "text-yellow-300";
                              }
                              return (
                                <i
                                  key={idx}
                                  className={`h-4 w-4 ${newColor} transition-all duration-200 ease-in-out hover:cursor-pointer`}
                                >
                                  <StarIcon />
                                </i>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <Swiper
                        spaceBetween={16}
                        centeredSlides
                        centeredSlidesBounds
                        breakpoints={{
                          1000: {
                            slidesPerView: 1,
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
                          {post.reviews.map((item, idx) => {
                            return (
                              <SwiperSlide className="swiper-slide " key={idx}>
                                <PostReview
                                  key={idx}
                                  reviewerName={item.userName}
                                  dateOfReview={item.createdAt}
                                  numberOfStars={item.starts}
                                  reviewText={item.reviewText}
                                  reviewLikes={item.likes}
                                />
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
                  ))}

                <div className="rounded-2xl bg-white px-6 py-8">
                  <h2 className="mb-4 text-center text-4xl font-semibold">
                    <span className="text-2xl font-normal">Vlasnik: </span>{" "}
                    {post.business?.name ?? ""}
                  </h2>
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
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PlansModal
          selectedBudget={{
            name: selectedPrice?.name ?? "",
            price: calculatedPrice,
          }}
          action={modalAction}
          open={openPlanModal}
          setOpen={setOpenPlanModal}
          postId={post.id}
        />
      </>
    </MainTemplate>
  );
};

export default Index;

import { useUser } from "@clerk/nextjs";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { useRouter } from "next/router";
import {
  useEffect,
  useState,
  type FormEvent,
  type MouseEventHandler,
} from "react";
import { toast } from "react-toastify";
import superjson from "superjson";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";
import { HeroDropdown } from "~/Molecules/HeroSection/HeroDropdown/HeroDropdown";
import useStatistics from "~/Organisms/CompanySpecific/useStatistics";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { stripe } from "~/server/stripe/client";
import { api } from "~/utils/api";
import { getTranslationForStatistics } from "~/utils/translationHelpers";
import PlansModal from "~/Organisms/PlansModal/PlansModal";

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
