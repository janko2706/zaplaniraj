import { useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
import PricingCard from "~/Molecules/PricingCard/PricingCard";
import MainTemplate from "~/Templates/MainTemplate";
import useMenu from "~/hooks/useMenu/useMenu";

const Index = () => {
  const { userCompany, menus } = useMenu();
  const { openSignUp } = useClerk();

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
        openSignUp({ redirectUrl: "/onboarding" });
      },
      buttonText: "Registriraj se!",
    },
  ];
  return (
    <MainTemplate userCompany={userCompany} menus={menus}>
      <section className="h-full min-h-screen bg-transparent">
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
        <div className="mx-auto h-full max-w-screen-xl  px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
              Za poslovanja
            </h2>
            <p className="mb-5 font-light text-gray-500  sm:text-xl">
              Pridruzite Nam se vec danas, brzo i jednostavno!
            </p>
          </div>
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: {
                opacity: 1,
                scale: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ duration: 0.3, type: "spring" }}
            className="mx-auto  mt-52 grid w-full grid-cols-1 gap-6  md:grid-cols-2 lg:mt-0"
          >
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
          </motion.div>
        </div>
      </section>
    </MainTemplate>
  );
};

export default Index;
