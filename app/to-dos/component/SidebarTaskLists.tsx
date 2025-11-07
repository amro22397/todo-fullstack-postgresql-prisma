'use client'

import { TaskList } from '@/app/data/Tasks'
import React from 'react'
import EditDeleteTaskList from './EditDeleteTaskList'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const SidebarTaskLists = ({ 
  tasksList, 
  email, 
  fetchTasksList
 }: {
  tasksList: TaskList[],
  email: string | null | undefined,
  fetchTasksList: () => void
}) => {

  const params = useParams();

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <ul className="flex flex-col gap-[7px] max-md:mb-4 mx-[11px] my-0">

      {/* <pre className="">{JSON.stringify(params, null, 2)}</pre> */}

              {tasksList.map((tasklist, index) => (
                <div key={index} className="flex flex-row justify-between items-center">
                  <Link href={`/to-dos/${tasklist.id}`}
                  className={`cursor-pointer tracking-wider font-semibold text-md hover:text-gray-600
                  dark:hover:text-gray-200 ${tasklist.id === params.id && "underline"}`}>
                    {capitalizeFirstLetter(`${tasklist.name}`)}
                </Link>

                <EditDeleteTaskList tasklist={tasklist} tasksList={tasksList} email={email} fetchTasksList={fetchTasksList} />
                
                </div>
              ))}
            </ul>
  )
}

export default SidebarTaskLists
