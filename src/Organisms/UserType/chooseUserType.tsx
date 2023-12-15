import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { BriefcaseIcon, CakeIcon } from "@heroicons/react/24/outline";
import { useOnboarding } from "~/hooks/onboarding/useOnboarding";
import { toast } from "react-toastify";
const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

export default function UserType() {
  const router = useRouter();
  const { setOnboarding } = useOnboarding();
  async function asyncFunction(type: string) {
    switch (type) {
      case "user":
        await setOnboarding({ onboardingLevel: "done" }).then(async () => {
          await router.replace({
            pathname: `user/dashboard`,
          });
          toast.success(`Dobrodosli u Zaplaniraj`);
        });

        break;
      case "company":
        try {
          await setOnboarding({ onboardingLevel: "isBussines" });
          await router.push({
            pathname: "/onboarding/company",
          });
        } catch (error) {
          toast.error("Molimo osvjezite strnicu te probajte ponovo");
        }
        break;
      default:
        break;
    }
  }

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
          Koji ste tip korisnika?
        </h1>
      </motion.div>
      <motion.div
        variants={STAGGER_CHILD_VARIANTS}
        className="grid w-full grid-cols-1 gap-6  rounded-md   text-white md:grid-cols-2 md:divide-x"
      >
        <button
          onClick={() => {
            void (async () => {
              await asyncFunction("user");
            })();
          }}
          className="flex min-h-[200px] flex-col items-center justify-center space-y-5 overflow-hidden bg-gray-800 p-5 transition-colors hover:bg-blue-500 md:p-10"
        >
          <CakeIcon className="pointer-events-none  h-auto w-12 sm:w-12" />
          <p>Zelim organizirati dogadaje</p>
        </button>

        <button
          onClick={() => {
            void (async () => {
              await asyncFunction("company");
            })();
          }}
          className="flex min-h-[200px] flex-col items-center justify-center space-y-5 overflow-hidden bg-gray-800 p-5 transition-colors hover:bg-blue-500 md:p-10"
        >
          <BriefcaseIcon className="pointer-events-none  h-auto w-12 sm:w-12" />
          <p>Zelio bih oglasiti svoje usluge</p>
        </button>
      </motion.div>
    </motion.div>
  );
}
