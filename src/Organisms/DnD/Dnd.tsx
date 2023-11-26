import {
  ChevronDownIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  type OnDragEndResponder,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import Accordion from "~/Atoms/Accordion/Accordion";
import LoadingSpinner from "~/Atoms/LoadingSpinner/LoadingSpinner";

resetServerContext();
const swapElements = (
  array: {
    id: number;
    content: string;
    isCompleted: boolean;
  }[],
  index1: number,
  index2: number
) => {
  const newArray = [...array];
  const newItem = newArray.splice(
    index2,
    1,
    newArray[index1] ?? { id: 123, content: "sada", isCompleted: false }
  )[0];
  if (newItem) {
    newArray[index1] = newItem;
    return newArray;
  }
};

type Props = {
  isLoading: boolean;
  tasks: { isCompleted: boolean; content: string; id: number }[];
  title: string;
  onCreate: () => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
  onChangeTask: (index: number, newContent: string) => void;
};
const Dnd = ({
  isLoading,
  tasks,
  title,
  onCreate,
  onDelete,
  onChangeTask,
}: Props) => {
  const [state, setState] = useState(tasks);
  useEffect(() => {
    setState(tasks);
  }, [tasks]);

  const onDragEnd: OnDragEndResponder = (result) => {
    setState((prev) => {
      const newArray = swapElements(
        prev,
        result.source.index,
        result.destination?.index ?? 0
      );
      return newArray ?? [];
    });
  };

  return (
    <Accordion
      buttonContent={(open) => (
        <div className="mt-4 flex items-center justify-between gap-5 rounded-2xl border px-5">
          <h3 className="p-3 text-lg">{title} </h3>
          <ChevronDownIcon
            className={`h-5 w-5 duration-300 sm:h-6 sm:w-6 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      )}
      initialOpen={false}
    >
      <div className="flex flex-col rounded-2xl border p-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="col">
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {!isLoading ? (
                  state.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={`Dragabble${task.id}`}
                      index={index}
                    >
                      {(draggableProvided, draggableSnapshot) => (
                        <div
                          key={index}
                          className={`z-20 mb-1 flex h-fit justify-between rounded-xl bg-white p-6 align-middle shadow-2xl outline  ${
                            draggableSnapshot.isDragging
                              ? "outline-primary"
                              : "outline-none"
                          }`}
                          {...draggableProvided.dragHandleProps}
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                        >
                          <div className="flex w-full items-center ">
                            <input
                              checked={task.isCompleted}
                              id="checked-checkbox"
                              type="checkbox"
                              onChange={() => {
                                const newObj = {
                                  ...task,
                                  isCompleted: !task.isCompleted,
                                };
                                setState((prev) => [
                                  ...prev.filter((e) => e.id !== task.id),
                                  newObj,
                                ]);
                              }}
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <div
                              className={`ml-2 w-full  text-sm font-medium ${
                                task.isCompleted
                                  ? "text-gray-400 line-through"
                                  : "text-black"
                              }`}
                            >
                              <input
                                value={task.content}
                                className="w-full  bg-inherit transition-all duration-200 ease-in-out hover:bg-slate-200 hover:bg-opacity-40"
                                onChange={(e) =>
                                  onChangeTask(task.id, e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            className="text-red-200 transition-all duration-300 ease-in-out hover:text-red-400"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={async () => await onDelete(task.id)}
                          >
                            <TrashIcon className="h-7 w-7 " />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <LoadingSpinner />
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="mt-4 flex w-full justify-center">
          <button
            type="button"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => await onCreate()}
            className=" flex w-fit items-center justify-center gap-3 rounded-lg border border-primary px-3 py-1 text-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
          >
            <PlusCircleIcon className="flex h-6 w-6 " />
          </button>
        </div>
      </div>
    </Accordion>
  );
};

export default Dnd;
