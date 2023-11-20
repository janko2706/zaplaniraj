import moment from "moment";
import { type NextRouter } from "next/router";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/20/solid";
import SmallModal from "~/Atoms/SmallModal/SmallModal";
import { useState } from "react";

type PropsCard = {
  router: NextRouter;
  id: string;
  name: string;
  icon: JSX.Element;
  date: Date;
  deletePlan: (id: string) => void;
};

const PlanCard = ({ name, icon, date, id, router, deletePlan }: PropsCard) => {
  const endDate = moment(date),
    todayDate = moment();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const daysDifference = moment(endDate).diff(todayDate, "days");

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={(evnt) => {
          evnt.stopPropagation();
          evnt.preventDefault();
          void (async () => await router.replace(`/plan/${id}`))();
        }}
      >
        <div className="group flex  overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-dark p-[0.17em] ">
          <div className=" visible absolute  -bottom-40 -top-40 left-10 right-10 animate-spin-slow bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
          <div className=" flex  w-full flex-wrap  items-center justify-between rounded-2xl bg-white p-8">
            <div className="z-50 flex flex-wrap items-center gap-4 space-y-4">
              <div className="grid h-12 w-12 shrink-0 place-content-center rounded-full shadow-xl">
                <div className="grid h-10 w-10 place-content-center rounded-full bg-[var(--primary-light)] text-primary">
                  {icon}
                </div>
              </div>
              <div className="flex-grow">
                <h5 className="mb-1 font-medium">{name}</h5>
                {!Number.isNaN(daysDifference) ?? (
                  <ul className=" flex flex-wrap items-center">
                    <li>
                      <span className="inline-block text-sm">
                        <span className="inline-block text-neutral-500">
                          {daysDifference} days remaining
                        </span>
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenDeleteModal(true);
                }}
                type="button"
                className="z-50"
              >
                <TrashIcon className="w-7transition-all h-7 duration-300 hover:text-red-500 lg:h-5 lg:w-5" />
              </button>
              <Link
                href="#"
                className="btn-outline z-50 shrink-0 font-semibold text-primary"
              >
                Manage Plan
              </Link>
            </div>
          </div>
          <SmallModal
            onConfirm={() => {
              deletePlan(id);
            }}
            title={`Izbrisi ${name}`}
            subText={"Ova akcija se ne moze vratiti!"}
            confirmButtonText={"Izbrisi"}
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
          />
        </div>
      </div>
    </>
  );
};
export default PlanCard;
