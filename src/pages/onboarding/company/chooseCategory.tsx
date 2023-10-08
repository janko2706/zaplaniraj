import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export default function ChooseCategory() {
  const router = useRouter();
  const { mutateAsync: setOnboarding } = api.user.setOnboarding.useMutation();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >();
  const [businessName, setBusinessName] = useState<string | undefined>();
  const [categories, setCategories] = useState<
    | {
        id: number;
        value: string;
        label: string;
      }[]
    | undefined
  >(undefined);
  const [selectedItem, setSelectedItem] = useState<
    | SingleValue<{
        value: string;
        label: string;
      }>
    | undefined
  >(undefined);

  const getAll = api.businessCategoryType.getAll.useQuery();

  useEffect(() => {
    setCategories(getAll.data);
  }, [getAll.data]);

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
          Detalji o Vasem poslovanju
        </h1>
      </motion.div>
      <motion.div variants={STAGGER_CHILD_VARIANTS} className="w-full">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-600 "
          >
            Ime Poslovanja &#42;
          </label>
          <input
            type="text"
            id="name"
            onChange={(input) => setBusinessName(input.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900"
            placeholder="Restoran Moj Grill..."
          />
        </div>
      </motion.div>
      <motion.div variants={STAGGER_CHILD_VARIANTS} className="w-full">
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-medium text-gray-600 "
        >
          Kategorija Vaseg Poslovanja &#42;
        </label>
        <Select
          id="category"
          options={categories}
          className="w-full"
          placeholder="odaberi..."
          onChange={(value) => {
            setSelectedItem(value);
            if (value) {
              setSelectedCategoryId(value.id);
            }
          }}
        />
        <button
          type="button"
          disabled={
            selectedItem === undefined ||
            businessName === undefined ||
            businessName === ""
          }
          className="mx-auto  mt-5 flex  items-center justify-center overflow-hidden rounded-2xl border p-2 transition-colors hover:bg-blue-500 hover:text-white disabled:opacity-30 disabled:hover:cursor-not-allowed"
          onClick={() => {
            void (async () => {
              if (selectedCategoryId && businessName) {
                await setOnboarding({
                  businessName: businessName,
                  typeOfBusinessId: selectedCategoryId,
                  onboardingLevel: "businessDetails",
                });

                await router.push("/onboarding/company/payment", undefined, {
                  locale: router.locale,
                });
              }
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
