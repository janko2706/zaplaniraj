import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import PricingCard from "~/Molecules/PricingCard/PricingCard";
import { api } from "~/utils/api";

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
      name: "Mjesecna pretplata",
      price: "8€ mjesecno",
      features: [
        "Reklamacija kroz platformu.",
        "Analitika svih pregleda Vaseg oglasa.",
        "Uvid u recenzije.",
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
      buttonText: "Pretplati se",
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
      onClick: async () => {
        const result = await createCheckoutSession({
          priceId: "price_1NqBSiLlVV4ETbZOx8mtxMDa",
          businessId: getBusinessById.data?.id ?? "",
        });
        if (result) {
          void router.push(result.checkoutUrl ?? "/");
        }
      },
      buttonText: "Pretplati se",
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
            buttonText={item.buttonText}
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
