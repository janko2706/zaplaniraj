import React, { useEffect, useState } from "react";
import { CgRing } from "react-icons/cg";
import { FaBirthdayCake, FaChurch } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Spotlight from "~/Molecules/SpotlightCard/Spotlight";
import SpotlightCard from "~/Molecules/SpotlightCard/SpotlightCard";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import {
  ChevronDoubleRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import classNames from "~/utils/classNames";
import { api } from "~/utils/api";
import Button from "~/Atoms/Button/Button";
import PlanCard from "~/Molecules/PlanCard/PlanCard";
import type { UserPlan } from "@prisma/client";
import { toast } from "react-toastify";
import CreatePlanModal from "../CreatePlanModal/CreatePlanModal";

function MyPlans() {
  const iconClasses = "h-7 w-7";
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const router = useRouter();

  const [plans, setPlans] = useState<UserPlan[]>([]);
  const { mutateAsync: deleteUserPlan } =
    api.userPlans.deleteUserPlan.useMutation({
      onSettled: (_a, _b, c) => {
        setPlans((prev) => prev.filter((i) => i.id !== c.planId));
        toast.success("Plan je izbrisan!");
      },
    });
  const deletePlan = async (id: string) => {
    await deleteUserPlan({
      planId: id,
    });
  };

  const getPlanIcon = (category: string) => {
    switch (category) {
      case "BIRTHDAY":
        return <FaBirthdayCake className={`${iconClasses}`} />;

      case "WEDDING":
        return <CgRing className={`${iconClasses}`} />;

      case "CELEBRATION":
        return <LuPartyPopper className={`${iconClasses}`} />;

      case "SACRAMENT":
        return <FaChurch className={`${iconClasses}`} />;
      default:
        return <LuPartyPopper className={`${iconClasses}`} />;
    }
  };
  const { data } = api.userPlans.getUserPlans.useQuery();

  useEffect(() => {
    setPlans(data ?? []);
  }, [data]);

  return (
    <section className="  h-full w-full  px-5 py-5 ">
      <ul>
        <li>
          <div className=" rounded-2xl bg-white p-3 sm:p-4 lg:p-4">
            <Tab.Group>
              <Tab.List className="col-span-12 mb-4 flex flex-wrap justify-around rounded-2xl border px-4 lg:mb-6">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "flex items-center gap-2 px-3 py-4 font-medium focus:outline-none",
                      selected ? "border-b border-primary text-primary" : ""
                    )
                  }
                >
                  <ChevronDoubleRightIcon className="h-5 w-5" />
                  <span className="inline-block">
                    In Progress ({" "}
                    {plans?.filter((i) => i.progress === "INPROGRESS").length})
                  </span>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "flex items-center gap-2 px-3 py-4 font-medium focus:outline-none",
                      selected ? "border-b border-primary text-primary" : ""
                    )
                  }
                >
                  <CheckBadgeIcon className="h-5 w-5" />
                  <span className="inline-block">
                    {" "}
                    Completed (
                    {plans?.filter((i) => i.progress === "COMPLETED").length})
                  </span>
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel
                  className="tab-pane fade show active"
                  id="inprogress"
                >
                  <Spotlight className="group mx-0 flex h-full w-full flex-col gap-5 overflow-y-auto  ">
                    {plans?.map((item, idx) => {
                      const icon = getPlanIcon(item.category);
                      return (
                        <SpotlightCard key={idx}>
                          <PlanCard
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            deletePlan={deletePlan}
                            router={router}
                            name={item.name}
                            icon={icon}
                            date={new Date(item.eventDate ?? "")}
                            id={item.id}
                          />
                        </SpotlightCard>
                      );
                    })}
                  </Spotlight>
                  <div className="mt-10 flex justify-center">
                    <Button
                      onClick={() => setOpenCreateModal(true)}
                      type="button"
                      text={"Napravi novi plan"}
                      className="flex h-fit w-fit items-center justify-center gap-3 rounded-xl border border-primary p-3 text-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
                    >
                      <PlusCircleIcon className="h-10 w-10 " />
                    </Button>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="tab-pane fade" id="completed">
                  <Spotlight className="group mx-0 flex h-full w-full flex-col gap-5 overflow-y-auto  ">
                    {plans?.filter((i) => i.progress === "COMPLETED")
                      ?.length ? (
                      plans
                        .filter((i) => i.progress === "COMPLETED")
                        .map((item, idx) => {
                          const icon = getPlanIcon(item.category);
                          return (
                            <SpotlightCard key={idx}>
                              <PlanCard
                                deletePlan={deletePlan}
                                router={router}
                                name={item.name}
                                icon={icon}
                                date={new Date(item.eventDate ?? "")}
                                id={item.id}
                              />
                            </SpotlightCard>
                          );
                        })
                    ) : (
                      <div className="mt-10 flex justify-center text-lg">
                        No completed plans yet...
                      </div>
                    )}
                  </Spotlight>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <CreatePlanModal
              setPlans={setPlans}
              open={openCreateModal}
              setOpen={setOpenCreateModal}
            />
          </div>
        </li>
      </ul>
    </section>
  );
}

export default MyPlans;
