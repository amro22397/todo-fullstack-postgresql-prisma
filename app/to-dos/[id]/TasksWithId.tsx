'use client'

import Stats from '@/components/todosComponents/Stats/StatsStats'
import TaskHeader from '@/components/todosComponents/TaskHeader/TaskHeader'
import TasksArea from '@/components/todosComponents/TasksArea/TasksArea'
import TasksDialog from "../../../components/todosComponents/Dialogs/TaskDialog/TaskDialog";
import TasksFooter from "../../../components/todosComponents/TaskFooter/TaskFooter";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import CircularProgress from '@mui/material/CircularProgress';


const TasksWithId = ({ id, email,
  // tasks,
  // tasksList,
  // pageTasksList
 }: { id: string, email: string | null | undefined,
  // tasks: Task[],
  // tasksList: TaskList[],
  // pageTasksList: TaskList | null | undefined
  }) => {

    // console.log(pageTasksList)

    const [tasks, setTasks] = useState([]);
    const [tasksList, setTasksList] = useState([]);
    const [pageTasksList, setPageTasksList] = useState([]);


    const fetchTasks = async () => {
        try {
          const res = await axios.get(`/api/tasks-get?taskListId=${id}`);
        console.log(res.data)

        setTasks(res.data.data);
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    



    const fetchTasksList = async () => {
        const res = await axios.get(`/api/tasks-list-get`);
        console.log(res.data)

        setTasksList(res.data.data);
    }

    useEffect(() => {
        fetchTasksList();
    }, []);




    const fetchPageTaskList = async () => {
        const res = await axios.get(`/api/page-task-list-get?paramsId=${id}`);
        console.log(res.data)

        setPageTasksList(res.data.data);
    }

    useEffect(() => {
        fetchPageTaskList();
    }, []);



  return (
    <div className="border flex items-center w-full h-full justify-center poppins lg:min-h-screen max-lg:my-10  ">

      {/* <p>{ JSON.stringify(tasks, null, 2)}</p> */}
      <div
        className="border border-gray-400 flex flex-col gap-6 bg-inherit shadow-md 
      rounded-md py-6 sm:px-8 px-4 w-[98%] sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[60%]
      "
      >
        {/* <CircularProgress size="sm" color="primary" /> */}
        <TaskHeader pagetaskList={pageTasksList} email={email} />
        <Stats tasks={tasks}/>
        <AllTasksHeader taskListId={id} email={email} fetchTasks={fetchTasks}/>
        <TasksArea tasks={tasks} tasksList={tasksList} fetchTasks={fetchTasks}  />
        <TasksFooter tasks={tasks} />
      </div>
    </div>
  )
}

function AllTasksHeader({ taskListId, email, 
  fetchTasks
 }: {
  taskListId: string,
  email: string | null | undefined,
  fetchTasks: () => void
 }) {

  
    return (
      <div className="flex justify-between items-center mt-3 mb-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{`Today's Task`}</h2>
          <p className="text-sm text-gray-400 dark:text-gray-200">{formatDate()}</p>
        </div>
  
        
        <TasksDialog taskListId={taskListId} email={email} 
        fetchTasks={fetchTasks}
         />
        
      </div>
    );
  }
  
  function formatDate(date: Date = new Date()): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric", // Should be 'numeric', not 'string'
      month: "long", // Should be 'long' (for full month name)
      year: "numeric", // Should be 'numeric', not 'string'
    };
    return date.toLocaleDateString("en-GB", options);
  }
  

export default TasksWithId
