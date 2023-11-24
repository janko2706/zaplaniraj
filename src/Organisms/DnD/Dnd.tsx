import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
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
};
const Dnd = ({ isLoading, tasks }: Props) => {
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
          <h3 className="h3 p-3">Prostor </h3>
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
                          className={`z-20 mb-1 flex h-fit rounded-xl bg-white p-6 align-middle shadow-2xl outline  ${
                            draggableSnapshot.isDragging
                              ? "outline-primary"
                              : "outline-none"
                          }`}
                          {...draggableProvided.dragHandleProps}
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                        >
                          <div className="flex items-center">
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
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                            />
                            <label
                              htmlFor="checked-checkbox"
                              className={`ms-2 text-sm font-medium ${
                                task.isCompleted
                                  ? "text-gray-400 line-through"
                                  : "text-black"
                              }`}
                            >
                              {task.content}
                            </label>
                          </div>
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
        <button type="button" className="mt-4 flex w-full justify-center ">
          <div className=" flex w-fit items-center justify-center gap-3 rounded-lg border border-primary px-3 py-1 text-primary transition-all duration-300 ease-in-out hover:bg-primary hover:text-white">
            <PlusCircleIcon className="flex h-6 w-6 " />
          </div>
        </button>
      </div>
    </Accordion>
  );
};

export default Dnd;
