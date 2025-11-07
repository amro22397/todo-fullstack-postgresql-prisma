// import { useTasksStore } from "@/app/stores/useTasksStore";
'use client'

import { useState } from "react";
import ClearAllDialog from "../Dialogs/ClearAllDialog/ClearAllDialog";
import mongoose from "mongoose";
// import { Tasks } from "@/models/tasks";
import { Task } from "@/app/data/Tasks";


const TaskFooter = ({tasks, fetchTasks, id, email} : {
  tasks: Task[],
  fetchTasks: () => void,
  id: string,
  email: string

}) => {
  // const { tasks } = useTasksStore();

    

  return (
    <div>
      <div className="flex justify-between mt-5 items-center">
        <p className="text-gray-500 dark:text-gray-100 text-sm">{tasks.length} Tasks</p>
        <ClearAllDialog
        tasks={tasks} fetchTasks={fetchTasks} id={id} email={email} />
      </div>
    </div>
  )
}

export default TaskFooter
