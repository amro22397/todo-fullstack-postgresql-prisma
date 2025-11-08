// import { useTasksStore } from "@/app/stores/useTasksStore";
"use client"

import { Task } from "@/app/data/Tasks";
import { Separator } from "@/components/ui/separator";
// import { Tasks } from "@/models/tasks";
import mongoose from "mongoose";
import { useEffect, useState } from "react";

type SingleStat = { label: string; unit: string; counter: number };

const Stats = ({tasks} : { tasks: Task[] }) => {

  const getCompletedTasks = tasks.filter(task => task.status === "completed").length;

        const getPendingTasks = tasks.length - getCompletedTasks;
    const getProgressValue = (getCompletedTasks / tasks.length) * 100;

    const [statsArray, setStatsArray] = useState<SingleStat[]>([
        { label: "Completed", unit: "Tasks", counter: getCompletedTasks },
        { label: "Pending", unit: "Tasks", counter: getPendingTasks },
        { label: "Progress", unit: "%", counter: parseInt(getProgressValue.toFixed(2)) || 0 },
      ]);

      
      useEffect(() => { 

    setStatsArray([
      { label: "Completed", unit: getCompletedTasks === 0 ? "" : getCompletedTasks === 1 ? "Task" : "Tasks", counter: getCompletedTasks },
      { label: "Pending", unit: getPendingTasks === 0 ? "" : getPendingTasks === 1 ? "Task" : "Tasks", counter: getPendingTasks },
      {
        label: "Progress",
        unit: "%",
        counter: parseInt(getProgressValue.toFixed(2)) || 0,
      },
    ])
      }, [tasks]);
      
  return (
    <div className="flex sm:flex-row flex-col items-center justify-center gap-5 py-[6px] lg:px-4 px-0">
      {statsArray.map((stat, index) => (
        <div key={index} className="flex w-full     gap-5  ">
          <SingleStatCard stat={stat} key={index} allTasks={tasks.length} />
          {index < statsArray.length - 1 && (
            <Separator orientation="vertical" className="h-auto" />
          )}
        </div>
      ))}

      {/* Separator with correct height and vertical orientation */}
    </div>
  )
}


function SingleStatCard({ stat, allTasks }: { stat: SingleStat, allTasks: number }) {
  return (
    <div className="w-full flex flex-col gap-2 items-center ">
      <div className="flex justify-between items-center">
        <p className="lg:text-xl md:text-sm text-xl font-medium text-gray-500 dark:text-gray-100">{stat.label}</p>
      </div>
      <div className="flex gap-1  items-baseline md:text-xs text-lg ">
        <p className="text-3xl font-bold mt-1 md:text-2xl ">{stat.counter}{stat.label === "Completed" && `/${allTasks}`}</p>
        <p className="text-gray-400 dark:text-gray-200">{stat.label !== "Completed" && stat.unit}</p>
      </div>
    </div>
  );
}

export default Stats
