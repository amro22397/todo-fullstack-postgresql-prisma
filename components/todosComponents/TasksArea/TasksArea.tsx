'use client'

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ComboboxDemo from "./PriorityCombobox";
import TasksOptions from "./TasksOptions";
// import { useTasksStore } from "@/app/stores/useTasksStore";
import { Task, TaskList } from "@/app/data/Tasks";
import { useState } from "react";
import { FaUmbrellaBeach } from "react-icons/fa6";
import CheckBoxComponent from "./CheckBoxComponent";
import axios from "axios";


// import { useUserStore } from "@/app/stores/useUserStore";


const TasksArea = ({ tasks, tasksList, 
  // fetchTasks
 }: {
  tasks: Task[],
  tasksList?: TaskList[],
  // fetchTasks: () => void
}) => {
 // const { tasks, fetchTasks } = useTasksStore();

 console.log(tasks)


  return (
    <ScrollArea className="h-72 flex flex-col gap-4">
      {tasksList?.length === 0 ? (
        <div className="  h-full w-full flex items-center justify-center  flex-col gap-6">
        <FaUmbrellaBeach className="text-[79px] text-slate-500 dark:text-slate-200 opacity-85" />
        <span className="text-sm text-slate-400 dark:text-slate-100 opacity-85 text-center">
          It looks like there are no tasks lists available. <br /> Click on the sidebar to
          add a new task list
        </span>
      </div>
      ) : tasks.length === 0 ? (
        <div className="  h-full w-full flex items-center justify-center  flex-col gap-6">
          <FaUmbrellaBeach className="text-[79px] text-slate-500 dark:text-slate-200 opacity-85" />
          <span className="text-sm text-slate-400 dark:text-slate-100 opacity-85 text-center">
            It looks like there are no tasks available. <br /> Click above to
            add a new task
          </span>
        </div>
      ) : (
        <>
          {tasks.map((singleTask, index) => {

            console.log(singleTask)
          return (
            <div className="" key={index}>
              <SingleTask key={singleTask.id} singleTask={singleTask} id={singleTask.id} 
              // fetchTasks={fetchTasks}
               />
            </div>
          )})}
        </>
      )}
    </ScrollArea>
  )
}


export function SingleTask({ singleTask, id, 
  // fetchTasks
 }: { 
  singleTask: Task,
  id: string,
  // fetchTasks: () => void
 }) {

  console.log(id);

  console.log(singleTask)
  

//   const [task, setTask] = useState({});
  
//   const fetchTasksByID = async () => {
//     const res = await axios.get(`/api/task-by-id?taskId=${id}`);
//     console.log(res.data)

//     setTask(res.data.data);
// }

// useEffect(() => {
//   fetchTasksByID();
// }, [id]);  


  const lowerOpacity = singleTask.status === "completed" && "opacity-65"

  const [loading, setLoading] = useState(false);
  const handleCheckboxChange = () => {

    setLoading(true);

    axios.put("/api/tasks/update-status", {
        id: singleTask?.id,
        status: singleTask.status === "completed" ? "in progress" : "completed",
    })
    .then(() => {
        setLoading(false);
        // fetchTasks();
    })
    .then(() => {
        window.location.reload()
    })
    .catch((error) => {
        console.log(error);
    })

  }

  return (
    <div
      className={`flex items-center px-0 my-3 rounded-md w-full justify-between mb-0 ${lowerOpacity}`}
    >
      <div className="flex items-center gap-4">

        <CheckBoxComponent singleTask={singleTask} 
        // fetchTasks={fetchTasks} 
        handleCheckboxChange={handleCheckboxChange}
        loading={loading} />

        <div className="flex flex-row gap-[6px] items-center justify-center">
        <label
           /* onClick={() => {
              //setTaskSelected(singleTask);
              //setIsTaskDialogOpened(true);
            }} */
            htmlFor="task"
            className="md:text-md xl:text-lg font-semibold cursor-pointer hover:text-primary
            text-md"
            onClick={handleCheckboxChange}
          >
            {singleTask.name}
          </label>

          <Badge variant="outline" className="text-[10px] opacity-55 md:block hidden">
            {singleTask.status}
          </Badge>

        </div>
      </div>
      <div className="flex md:gap-3 items-center ">
      <ComboboxDemo singleTask={singleTask} 
      // fetchTasks={fetchTasks}
       className="md:block hidden" />
      <TasksOptions singleTask={singleTask} 
      // id={id} 
      // fetchTasks={fetchTasks}
       />
      </div>
    </div>
  )
}

export default TasksArea
