import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import SmallSreenImage from "~/Assets/Hero/SmallScreenImage.jpeg";
import BigSreenImage from "~/Assets/Hero/BigScreenImage.png";
import Image from "next/image";
import { Parallax } from "react-scroll-parallax";

function HeroSection() {
  // TODO OPENAI API INTEGRATION
  // const [query, setQuery] = useState("");
  // const [answer, setAnswer] = useState("");

  // const chatRes =
  //   api.openapi.getTagsFromMessages.useQuery({
  //     query,
  //   }).data ?? "";

  const [confettiWidth, setConfettiWidth] = useState(0);
  const [confettiHeight, setConfettiHeight] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef !== null) {
      setConfettiHeight(mainRef.current?.clientHeight ?? 0);
      setConfettiWidth(mainRef.current?.clientWidth ?? 0);
    }
  }, [mainRef]);

  return (
    <section
      className="relative border-t bg-[var(--bg-1)] lg:border-t-0"
      ref={mainRef}
    >
      <Confetti
        height={confettiHeight}
        width={confettiWidth}
        numberOfPieces={100}
        opacity={0.7}
      />

      <div className="h-full px-3 pb-16 pt-[70px] sm:pt-[100px] md:pt-[80px] xl:pt-[80px]">
        <div className="container ">
          <div className="relative z-10  text-center ">
            <h1 className=" text-6xl font-semibold  text-neutral-700">
              Organiziraj svoj{" "}
              <span className="text-purple-800"> nezaboravan </span>
              provod
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-xl text-gray-500 md:mt-9">
              Pronalazak savrsenog restorana, muzike, kateringa, cvijeca, ...,
              te planiranje Vaseg slavlja nikada nije bilo lakse.{" "}
            </p>
            <div className="relative z-30 mx-auto mt-12 flex max-w-[1060px] flex-wrap items-center justify-center gap-3 rounded-xl ">
              <div className="">
                <Link
                  href="#"
                  className="flex w-full justify-center gap-3 rounded-lg bg-primary px-6 py-[14px] text-white opacity-70 transition-all duration-300 ease-in-out hover:opacity-100 xl:w-auto"
                >
                  Registracija
                </Link>
              </div>
              <div className="">
                <Link
                  href="#"
                  className="flex w-full justify-center gap-3 rounded-lg border border-primary px-6 py-[14px] text-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white xl:w-auto"
                >
                  <MagnifyingGlassIcon width={20} height={20} />
                  Istrazi poslovanja
                </Link>
              </div>
              {/* <div className="w-full py-10 text-3xl">ILI</div>
              <div className="w-full   px-2 pb-3 pt-0">
                <div className="pb-5  text-center text-lg">
                  Niste sigurni sto trazite? Pitajte Nas
                  <span className="text-2xl font-bold"> AI</span> ili stavite
                  maksimalno 3 slike te ce on pretraziti za Vas.
                </div>

                <Uploader
                  imageUrls={undefined}
                  maximumImages={0}
                  addToPictures={function (url: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  removeFromPictures={function (location: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={""}
                  deleteImageInDB={function (
                    location: string
                  ): Promise<boolean> {
                    throw new Error("Function not implemented.");
                  }}
                />
                <div className="w-full">
                  <button
                    type="button"
                    className="flex w-full justify-center gap-4 rounded-full bg-primary px-4 py-[14px] text-white opacity-70 transition-all duration-300 ease-in-out hover:opacity-100 xl:w-auto"
                  >
                    <MagnifyingGlassIcon width={20} height={20} />
                    Pretrazi
                  </button>
                </div>
              </div> */}
            </div>{" "}
            <Parallax speed={10} easing={"easeIn"} opacity={[1.4, 0]}>
              <div className="mt-8 hidden lg:block">
                <div className="relative mx-auto max-w-2xl rounded-t-xl border-[16px] border-slate-200 bg-slate-200 outline outline-slate-400  ">
                  <div className=" overflow-hidden rounded-xl bg-blue-400">
                    <Image
                      src={BigSreenImage}
                      alt={
                        "Respresentation of this website inside laptop mockup"
                      }
                      className="h-full rounded-xl border-2 border-slate-300"
                    />
                  </div>
                </div>
                <div className="relative mx-auto h-[42px]  max-w-2xl rounded-b-xl  bg-slate-300 outline outline-slate-400"></div>
                <div className="relative mx-auto mt-1  h-[95px] max-w-[83px] rounded-b-xl bg-slate-400 outline outline-slate-400 md:max-w-[142px]"></div>
              </div>
            </Parallax>
            <div className="absolute left-[55%] top-[35rem] hidden  scale-[.60]  lg:block">
              <div className="relative mx-auto h-[600px] w-[300px] rounded-[2.5rem] border-[14px] border-slate-600 bg-slate-400  ">
                <div className="absolute -start-[17px] top-[72px] h-[32px] w-[3px] rounded-s-lg bg-black "></div>
                <div className="absolute -start-[17px] top-[124px] h-[46px] w-[3px] rounded-s-lg bg-black "></div>
                <div className="absolute -start-[17px] top-[178px] h-[46px] w-[3px] rounded-s-lg bg-black "></div>
                <div className="h-full w-full rounded-3xl bg-red-500">
                  <Image
                    src={SmallSreenImage}
                    alt={"Respresentation of this website inside phone mockup"}
                    className="h-full rounded-3xl "
                  />
                </div>

                <div className="absolute -end-[17px] top-[142px] h-[64px] w-[3px] rounded-e-lg bg-black "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
