'use client'

import { AppLogo } from '@/components/AppLogo'
import React from 'react'
import TaskListAddDialog from '../TaskListAddDialog'
import SidebarTaskLists from './SidebarTaskLists'
// import axios from 'axios'
import { TaskList } from '@/app/data/Tasks'

const SideBar = ({ email, tasksList }: {
  email: string | null | undefined,
  tasksList: TaskList[]
}) => {

  
  

//   const [tasksList, setTasksList] = useState([]);

//   const fetchTasksList = async () => {
//     const res = await axios.get(`/api/tasks-list-get`);
//     console.log(res.data)

//     setTasksList(res.data.data); 
// }

// useEffect(() => {
//     fetchTasksList();
// }, []);

// console.log(tasksList);

  // const session = await getSession();
  //   console.log(session);

  // const tasksList = await TasksList.find({userEmail: {$in: [session?.user?.email]}})

  // const jTasklists = JSON.parse(JSON.stringify(tasksList));

  // const taskListIconSize = 17;
  // const taskListButtonClassName = "cursor-pointer active:scale-95"
  

  return (
    <div className="max-md:z-50
    md:w-[400px] w-[100%] mx-auto sm:w-[95%] 
     md:h-screen border-r border-solid px-3 sm:px-14
     dark:bg-zinc-700
    
        border-gray-200 dark:border-zinc-900 md:px-[11px] flex flex-col gap-4">


            <AppLogo className="mt-5"/>

            <div className="flex flex-col gap-3 mx-2">
            <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">Tasks List</h2>

            <TaskListAddDialog tasksList={tasksList} email={email} /* fetchTasksList={fetchTasksList} */ />
            
            </div>

            <SidebarTaskLists tasksList={tasksList} email={email} /* fetchTasksList={fetchTasksList} */ />
            </div>


        </div>
  )
}

export default SideBar
