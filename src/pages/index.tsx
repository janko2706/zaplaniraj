import MainTemplate from "~/Templates/MainTemplate";
import ContentMarginsTemplate from "~/Templates/ContentMarginsTemplate";
import HeroSection from "~/Molecules/HeroSection/HeroSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { CgRing } from "react-icons/cg";
import { FaChurch, FaBirthdayCake } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import PerfectWeddingImage from "../Assets/PerfectWeddingImage.jpeg";
import ChampagneCelebration from "../Assets/ChampagneCelebration.jpeg";
import RodendanSlavlje from "../Assets/RodendanSlavlje.jpg";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import Image from "next/image";
import PreviewModal from "~/Molecules/PreviewModal/PreviewModal";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [previewPicture, setPreviewPicture] = useState<string>("");
  const [name, setPreviewName] = useState<string>("");

  const sliderItems = [
    {
      title: "Vjenjcanja",
      icon: (
        <CgRing className=" m-auto  h-14 w-14 text-white lg:h-20 lg:w-20" />
      ),
    },
    {
      title: "Rodendani",
      icon: (
        <FaBirthdayCake className=" m-auto  h-14 w-14 text-white lg:h-20 lg:w-20" />
      ),
    },
    {
      title: "Sakramenti",
      icon: (
        <FaChurch className=" m-auto  h-14 w-14 text-white lg:h-20 lg:w-20" />
      ),
    },
    {
      title: "Slavlja",
      icon: (
        <LuPartyPopper className=" m-auto  h-14 w-14 text-white lg:h-20 lg:w-20" />
      ),
    },
  ];
  const products = [
    {
      id: 1,
      name: "Earthen Bottle",
      href: "#",
      price: "$48",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 2,
      name: "Nomad Tumbler",
      href: "#",
      price: "$35",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt:
        "Olive drab green insulated bottle with flared screw lid and flat top.",
    },
    {
      id: 3,
      name: "Focus Paper Refill",
      href: "#",
      price: "$89",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
      imageAlt:
        "Person using a pen to cross a task off a productivity paper card.",
    },
    {
      id: 4,
      name: "Machined Mechanical Pencil",
      href: "#",
      price: "$35",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
      imageAlt:
        "Hand holding black machined steel mechanical pencil with brass tip and top.",
    },
    // More products...
  ];

  return (
    <>
      <MainTemplate>
        <>
          {/* HERO SECTION */}
          <div className="w-full bg-slate-100">
            <ContentMarginsTemplate>
              <HeroSection />
            </ContentMarginsTemplate>
          </div>
          {/* INTERESTED SECTION */}
          <ContentMarginsTemplate>
            <>
              <div
                className="text-center text-4xl font-bold"
                id="istraziPocetna"
              >
                Sto Vas zanima?
              </div>
              <div className=" my-10 h-96 rounded-xl bg-slate-100 py-20">
                <Swiper
                  centeredSlides
                  slidesPerView={3}
                  spaceBetween={20}
                  pagination={{
                    clickable: true,
                  }}
                  navigation
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {sliderItems.map((item, key) => {
                    return (
                      <SwiperSlide
                        key={key}
                        className="flex cursor-pointer flex-col rounded-2xl bg-slate-200 py-3   shadow-xl transition-all duration-300 hover:bg-slate-300 "
                      >
                        <div
                          className="mx-auto  mb-10
                          flex h-20
                          w-20
                         justify-center rounded-full bg-purple-800 p-3 shadow-2xl lg:h-32 lg:w-32"
                        >
                          {item.icon}
                        </div>
                        <div className="text-center font-normal sm:text-base lg:text-2xl">
                          {item.title}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </>
          </ContentMarginsTemplate>
          {/* MARKETING MUMO JUMBO */}
          <ContentMarginsTemplate>
            <Image
              src={PerfectWeddingImage}
              alt="Represents the perfect wedding situation"
              className="hidden max-h-full w-full object-center lg:block"
            />
          </ContentMarginsTemplate>
          <ContentMarginsTemplate>
            <div className="flex gap-10">
              <div className=" flex flex-col gap-10 ">
                <div className="flex h-fit flex-col justify-start gap-8 ">
                  <div className=" text-center text-5xl font-semibold italic">
                    Dogovori savrsenu zabavu u{" "}
                    <span className="text-purple-800">rekordnom </span>vremenu
                  </div>
                  <div className="px-3 text-xl lg:px-0">
                    Dobrodošli na našu platformu gdje stvaranje nezaboravnog
                    događanja postaje jednostavno i kreativno iskustvo. Bez
                    obzira trebate li organizirati rođendansku zabavu, timsku
                    izgradnju ili poseban događaj, naša intuitivna platforma
                    omogućuje vam da lako pretvorite svoje ideje u stvarnost.
                    <br />
                    <br />
                    Počnite stvarati svoje jedinstveno iskustvo jos danas!
                  </div>
                </div>
                <Image
                  src={ChampagneCelebration}
                  alt="Represents the perfect wedding situation"
                  className="bg-url hidden h-full w-full lg:block"
                />
              </div>
              <Image
                src={RodendanSlavlje}
                alt="Represents the perfect wedding situation"
                className="mt-20 hidden w-1/3 object-center lg:block"
              />
            </div>
          </ContentMarginsTemplate>
          {/* FEATURED WEDDING VENUES */}
          <ContentMarginsTemplate>
            <>
              <div
                className="text-center text-4xl font-bold"
                id="istraziPocetna"
              >
                Preporuceno u kategoriji{" "}
                <span className="text-purple-800">VJENCANJA</span>
              </div>
              <div className=" my-10 rounded-xl bg-slate-100 py-10">
                <Swiper
                  centeredSlides
                  slidesPerView={3}
                  spaceBetween={20}
                  pagination={{
                    clickable: true,
                  }}
                  navigation
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {products.map((product, key) => {
                    return (
                      <SwiperSlide
                        key={key}
                        className="flex cursor-pointer flex-col rounded-2xl"
                      >
                        <a
                          key={product.id}
                          href={product.href}
                          onClick={() => {
                            setOpen(true);
                            setPreviewPicture(product.imageSrc);
                            setPreviewName(product.name);
                          }}
                          className="group"
                        >
                          <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
                            <Image
                              width={100}
                              height={100}
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <h3 className="mt-4 text-center text-lg text-gray-700">
                            {product.name}
                          </h3>
                        </a>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </>
          </ContentMarginsTemplate>
          {/* BUSINESS ASSOCIATES LINK */}
          <div className="w-full bg-slate-100">
            <ContentMarginsTemplate>
              <div
                style={{ alignItems: "center" }}
                className="container flex w-full justify-center  align-middle sm:py-12 lg:flex-row  lg:py-6"
              >
                <div className="flex flex-col justify-center rounded-sm  text-center  ">
                  <h1 className=" text-5xl font-bold sm:text-6xl">
                    Imas poslovanje za koje mislis da bi trebalo biti tu?
                  </h1>
                  <p className="mb-8 mt-6 text-center text-lg sm:mb-12">
                    Postani dio ove uzbudljive platforme vec danas.
                  </p>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-center">
                    <a
                      href="#istraziPocetna"
                      className="rounded-md bg-slate-300 px-8 py-3 text-lg font-semibold text-primaryBlue transition-all duration-300 hover:bg-purple-800 hover:text-white"
                    >
                      Pridruzi nam se
                    </a>
                  </div>
                </div>
              </div>
            </ContentMarginsTemplate>
          </div>
          <PreviewModal
            name={name}
            open={open}
            setOpen={setOpen}
            previewPicture={previewPicture}
          />
        </>
      </MainTemplate>
    </>
  );
}
