"use client";

import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from '@/app/data/Tasks';
// import { useRouter } from 'next/navigation';


const CheckBoxComponent = ({ singleTask, 
  // fetchTasks, 
  handleCheckboxChange, loading }: { 
  singleTask: Task,
  // fetchTasks: () => void,
  handleCheckboxChange: () => void
  loading: boolean
}) => {
    

    // const router = useRouter();

    
  return (
    <div className='hover:opacity-90'>
      
    {loading ? (
        <CircularProgress size={24} color="primary" />
      ) : (
        <>
        <Checkbox
          id={`task-${singleTask.id}`}
          className="w-5 h-5 cursor-pointer"
          checked={singleTask.status === "completed"}
          onCheckedChange={handleCheckboxChange}
        />
        </>
      )}
    </div>
  )
}

export default CheckBoxComponent
