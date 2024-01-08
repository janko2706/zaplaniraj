import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { toast } from "react-toastify";
import blobGif1 from "~/Assets/Pricing/blobGif.gif";
import blobGif2 from "~/Assets/Pricing/blobGif2.gif";
import reviewVector from "~/Assets/Pricing/reviewVector.svg";
import statisticsVector from "~/Assets/Pricing/statisticsVector.svg";
import platform from "~/Assets/Pricing/platform.svg";
import PricingCard from "~/Molecules/PricingCard/PricingCard";
import MainTemplate from "~/Templates/MainTemplate";
import useMenu from "~/hooks/useMenu/useMenu";

const Index = () => {
  const { userCompany, menus } = useMenu();
  const { openSignUp, user } = useClerk();

  const pricingOptions = [
    {
      name: "Mjesecna pretplata",
      price: "8€ mjesecno",
      features: [
        "Reklamacija kroz platformu.",
        "Analitika svih pregleda Vaseg oglasa.",
        "Uvid u recenzije.",
      ],
      onClick: () => {
        if (user) {
          toast.error("Vec ste prijavljeni");
        }
        openSignUp();
      },
      buttonText: "Registriraj se!",
    },
    {
      name: "Godisnja pretplata",
      price: "72€ godisnje",
      features: [
        "3 mjeseca besplatno.",
        "Reklamacija kroz platformu.",
        "Analitika svih pregleda Vaseg oglasa.",
        "Uvid u recenzije.",
      ],
      onClick: () => {
        if (user) {
          toast.error("Vec ste prijavljeni");
        }
        openSignUp({ redirectUrl: "/onboarding" });
      },
      buttonText: "Registriraj se!",
    },
  ];

  return (
    <MainTemplate userCompany={userCompany} menus={menus}>
      <section className="h-full min-h-screen bg-transparent">
        <div className="mx-auto mb-0 mt-4 max-w-screen-md text-center lg:mb-6">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
            Za poslovanja
          </h2>
          <p className="mb-5 font-light text-gray-500  sm:text-xl">
            Pridruzite Nam se vec danas, brzo i jednostavno!
          </p>
        </div>
        <div
          className="absolute inset-x-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
        <div className="mx-auto h-full max-w-7xl  px-4 pb-8 lg:px-6 lg:py-8">
          <div className="mx-auto  mt-10 grid w-full grid-cols-1 gap-6  md:grid-cols-2 lg:mt-6">
            {pricingOptions.map((item, key) => {
              return (
                <PricingCard
                  key={key}
                  name={item.name}
                  price={item.price}
                  features={item.features}
                  buttonText={item.buttonText}
                  onClick={item.onClick}
                />
              );
            })}
          </div>
        </div>
        <div className="mx-auto mb-0 mt-4 max-w-screen-md text-center lg:mb-6">
          <h2 className="my-20 text-4xl font-extrabold tracking-tight text-gray-900 ">
            Sto Vas ocekuje?
          </h2>
        </div>
        <div className="mx-5 flex flex-col items-center justify-center gap-16 md:mx-20  lg:mx-2 lg:gap-20">
          <div className="relative flex h-72 w-full max-w-7xl items-center justify-center  gap-7 ">
            <Image
              src={blobGif1}
              alt="A slow animated blob for background"
              className="hidden h-full w-[40rem] opacity-5 lg:block"
            />
            <Image
              src={statisticsVector as string}
              alt="A slow animated blob for background"
              className="absolute -left-20 hidden  h-60 opacity-90 lg:block"
            />

            <div className="flex h-full w-full flex-col rounded-2xl border border-t-8 border-blue-200 pt-3">
              <p className="text-center text-2xl font-semibold">
                Sva analitika na jednom mjestu
              </p>
              <p className="p-5 text-lg ">Unaprijedite Vase poslovanje</p>
            </div>
          </div>
          <div className="flex h-72 w-full max-w-7xl items-center justify-center   gap-7">
            <div className="flex h-full w-full flex-col rounded-2xl border border-t-8 border-blue-300 pt-3">
              <p className="text-center text-2xl font-semibold">
                Lako dodite do recenzija
              </p>
              <p className="p-5 text-lg ">Unaprijedite Vase poslovanje</p>
            </div>{" "}
            <Image
              src={blobGif2}
              alt="A slow animated blob for background"
              className=" hidden h-96 w-96 opacity-0 lg:block"
            />{" "}
            <Image
              src={blobGif2}
              alt="A slow animated blob for background"
              className="absolute left-[70%] hidden h-96 w-96 opacity-20 lg:block"
            />{" "}
            <Image
              src={blobGif1}
              alt="A slow animated blob for background"
              className="absolute left-[70%] hidden w-72 opacity-10 lg:block"
            />
            <Image
              src={reviewVector as string}
              alt="A slow animated blob for background"
              className="absolute left-[65%] hidden h-72 opacity-80 lg:block"
            />
          </div>{" "}
          <div className="relative mb-10 flex h-72 w-full max-w-7xl items-center  justify-center gap-7">
            <Image
              src={blobGif2}
              alt="A slow animated blob for background"
              className="hidden w-96 opacity-20 lg:block"
            />
            <Image
              src={platform as string}
              alt="A slow animated blob for background"
              className="absolute -left-40 hidden  h-52 opacity-90 lg:block"
            />

            <div className="flex h-full w-full flex-col rounded-2xl border border-t-8 border-blue-200 pt-3">
              <p className="text-center text-2xl font-semibold">
                Postanite dio ove uzbudljive platforme!
              </p>
              <p className="p-5 text-lg ">Unaprijedite Vase poslovanje</p>
            </div>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
};

export default Index;
