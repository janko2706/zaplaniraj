import { AnimatePresence } from "framer-motion";
import UserType from "./chooseUserType";
import { useOnboarding } from "~/hooks/onboarding/useOnboarding";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Index() {
  const { createUser, doesUserExists, getUserOnboarding } = useOnboarding();
  const { replace } = useRouter();

  useEffect(() => {
    void (() => {
      if (doesUserExists.data === 300) {
        void (async () => {
          await createUser().catch((err) => toast.error(`${err}`));
        })();
      } else if (doesUserExists.data === 200) {
        if (getUserOnboarding.data) {
          switch (getUserOnboarding.data) {
            case "done":
              void (async () => {
                await replace(`/`);
              })();
              break;
            case "welcome":
              break;
            case getUserOnboarding.data:
              void (async () => {
                await replace(`/onboarding/company/${getUserOnboarding.data}`);
              })();
              break;

            default:
              break;
          }
        }
      }
    })();
  }, [getUserOnboarding.isLoading]);

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col items-center justify-center overflow-x-hidden">
      <div
        className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
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
      <AnimatePresence mode="sync">
        <UserType />
      </AnimatePresence>
    </div>
  );
}
