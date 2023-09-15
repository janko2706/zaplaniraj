import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

function PricingPlan() {
  const user = useUser();
  const { mutateAsync: createCheckoutSession } =
    api.stripe.createCheckoutSession.useMutation();
  const getBusinessById = api.bussines.getById.useQuery({
    clerkId: user.user ? user.user.id : "",
  });
  const router = useRouter();
  const pricingOptions = [
    {
      name: "Classic",
      price: 4,
      features: [
        "First month free",
        "Twice weekly email newsletter",
        "Weekly email newsletter",
      ],
      onClick: async () => {
        const result = await createCheckoutSession({
          priceId: "price_1NnKsCLlVV4ETbZO1222v7qx",
          businessId: getBusinessById.data?.id ?? "",
        });
        if (result) {
          void router.push(result.checkoutUrl ?? "/");
        }
      },
    },
    {
      name: "Pro",
      price: 7,
      features: [
        "First month free",
        "Twice weekly email newsletter",
        "Weekly email newsletter",
      ],
      onClick: async () => {
        const result = await createCheckoutSession({
          priceId: "price_1NqBSiLlVV4ETbZOx8mtxMDa",
          businessId: getBusinessById.data?.id ?? "",
        });
        if (result) {
          void router.push(result.checkoutUrl ?? "/");
        }
      },
    },
  ];
  return (
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
            onClick={item.onClick}
          />
        );
      })}
    </motion.div>
  );
}

export default PricingPlan;

type PricingCardProps = {
  name: string;
  price: number;
  features: string[];
  onClick: () => Promise<void>;
};

const PricingCard = ({ name, price, features, onClick }: PricingCardProps) => {
  return (
    <motion.div
      variants={STAGGER_CHILD_VARIANTS}
      className="rounded-lg border-t-4 border-blue-400 bg-white p-5 shadow"
    >
      <p className=" text-3xl font-medium uppercase text-black">{name}</p>

      <p className="mt-4 text-2xl  font-medium text-gray-600">
        {price} € per month
      </p>

      <div className="mt-8">
        <ul className="grid grid-cols-1 gap-4">
          {features.map((item, key) => {
            return (
              <li key={key} className="inline-flex items-center text-gray-600">
                <svg
                  className="mr-2 h-4 w-4 fill-current text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                </svg>
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8">
        <button
          className="w-full rounded-lg bg-gray-400 px-3 py-2 text-white transition-all duration-300 hover:bg-blue-500"
          onClick={() => {
            void (async () => await onClick())();
          }}
        >
          Start free trial
        </button>
      </div>
    </motion.div>
  );
};
