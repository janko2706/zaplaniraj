import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { useState } from "react";
const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export default function ChooseCategory() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<
    | SingleValue<{
        value: string;
        label: string;
      }>
    | undefined
  >(undefined);
  const options = [
    { value: "muzika", label: "Muzika" },
    { value: "prostor", label: "Prostor" },
    { value: "prostor_i_catering", label: "Prostor i Catering" },
    { value: "transport", label: "Transport" },
    { value: "torte", label: "Torte" },
    { value: "cvijece", label: "Cvijece" },
    { value: "vjencanice", label: "vjencanice" },
    { value: "vjencanice_i_torte", label: "Vjencanice i torte" },
    { value: "ostalo", label: "Ostalo" },
  ];

  return (
    <motion.div
      className="z-10 mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
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
    >
      <motion.div
        variants={STAGGER_CHILD_VARIANTS}
        className="flex flex-col items-center space-y-10 text-center"
      >
        <p className="text-2xl font-bold tracking-tighter text-primary">
          Dobrodosli u ZAplaniraj
        </p>
        <h1 className="font-display max-w-md text-3xl font-semibold text-gray-700 transition-colors sm:text-4xl">
          Izaberite kategoriju poslovanja
        </h1>
      </motion.div>
      <motion.div variants={STAGGER_CHILD_VARIANTS} className="w-full">
        <Select
          options={options}
          className="w-full"
          placeholder="odaberi..."
          onChange={(value) => setSelectedItem(value)}
        />
        <button
          type="button"
          disabled={selectedItem === undefined}
          className="mx-auto  mt-5 flex  items-center justify-center overflow-hidden rounded-2xl border p-2 transition-colors hover:bg-blue-500 hover:text-white disabled:opacity-30 disabled:hover:cursor-not-allowed"
          onClick={() => {
            void (async () => {
              await router.push("/onboarding/company/PricingPlan", undefined, {
                locale: router.locale,
              });
            })();
          }}
        >
          <p>Dalje</p>
          <ArrowRightIcon className="pointer-events-none ml-3  h-5 w-5 " />
        </button>

        <h1 className="pt-10">
          Nema vase kategorije? Odaberite opciju &quot;Ostalo&quot;, te cemo ju
          mi ubrzo dodati!
        </h1>
      </motion.div>
    </motion.div>
  );
}
