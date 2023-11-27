import { type Dispatch, Fragment, type SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { HeroDropdown } from "~/Molecules/HeroSection/HeroDropdown/HeroDropdown";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import type { UserPlan } from "@prisma/client";
import { CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import Button from "~/Atoms/Button/Button";
import { api } from "~/utils/api";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPlans: Dispatch<SetStateAction<UserPlan[]>>;
};

function CreatePlanModal({ open, setOpen, setPlans }: Props) {
  const iconClasses = "h-7 w-7";
  const categories = [
    {
      name: "Vjenjcanje",
      icon: <CgRing className={iconClasses} />,
    },
    {
      name: "Rodendan",
      icon: <FaBirthdayCake className={iconClasses} />,
    },
    {
      name: "Sakrament",
      icon: <FaChurch className={iconClasses} />,
    },
    {
      name: "Slavlje",
      icon: <LuPartyPopper className={iconClasses} />,
    },
  ];
  const PlanCategory = [
    "VJENCANJE",
    "RODENDAN",
    "SAKRAMENT",
    "SLAVLJE",
  ] as const;
  const getEnumForCategory = (category: string) => {
    switch (category) {
      case "Vjenjcanje":
        return PlanCategory[0];
      case "Rodendan":
        return PlanCategory[2];
      case "Sakrament":
        return PlanCategory[1];
      case "Slavlje":
        return PlanCategory[3];

      default:
        return PlanCategory[0];
    }
  };
  const [name, setName] = useState<string>("");
  const { mutateAsync: createPlan, isLoading } =
    api.userPlans.createUserPlans.useMutation({
      onSuccess: (a) => {
        setPlans((prev) => [...prev, a]);
        setOpen(false);
        toast.success("Plan napravljen!");
      },
    });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createPlan({
      name,
      planCategory: getEnumForCategory(selectedCategory?.name ?? ""),
    });
  };
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 mb-12 overflow-y-auto lg:mb-0">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="relative flex w-full transform text-left text-base transition md:my-8 md:max-w-xl md:px-4 lg:max-w-xl">
                <div className="relative flex w-full items-center  rounded-3xl bg-white px-4 pb-8 pt-10 shadow-2xl sm:px-6 sm:pt-8 md:p-6  lg:p-8 ">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-12"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                  {isLoading ? (
                    <div className="absolute left-1/3 top-1/3">
                      <LoadingSpinner
                        spinnerHeight="h-12"
                        spinnerWidth="w-12"
                      />
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className=" flex h-full w-full items-center justify-center gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <form
                      className={`${
                        isLoading ? "opacity-10" : "opacity-100"
                      } flex flex-col gap-5 transition-all duration-300`}
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onSubmit={handleSubmit}
                    >
                      <p>Ime plana:</p>
                      <input
                        type="text"
                        placeholder="Moj rodendan..."
                        className="w-full rounded-full border bg-[var(--bg-1)] px-3 py-2 focus:outline-none md:px-4 md:py-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <p>Kategorija: </p>
                      <HeroDropdown
                        size={"full"}
                        options={categories}
                        selected={selectedCategory}
                        setSelected={setSelectedCategory}
                      />
                      <Button
                        text="Spremi"
                        className="flex h-fit w-full items-center justify-center gap-3 rounded-xl border border-primary p-3 text-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
                      />
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default CreatePlanModal;
