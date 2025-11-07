"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import TaskForm from "./TaskForm";
import { FaPlus } from "react-icons/fa";
// import { useTasksStore } from "@/app/stores/useTasksStore";
// import { toast } from "@/hooks/use-toast";
import { toast } from "sonner"
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
// import { useUserStore } from "@/app/stores/useUserStore";

const TaskDialog = ({ taskListId, email, 
  fetchTasks
 }: { 
  taskListId?: string, 
  email: string | null | undefined,
  fetchTasks: () => void
 }) => {

    const [formData, setFormData] = useState({
      name: "",
      priority : "",
      status: "",
      userEmail: email || "",
      taskListId: taskListId || "",
      userId: "",
    });

    const [isTaskDialogOpened, setIsTaskDialogOpened] = useState(false);

  
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      setFormData({
        name: "",
      priority : "",
      status: "",
      userEmail: email || "",
      taskListId: taskListId || "",
      userId: "",
      })
    }, [isTaskDialogOpened]);


  const handleSubmit = async (e: any) => {

    e.preventDefault();
    
    setLoading(true);

    axios.post("/api/tasks", formData)
    .then(() => {
      setIsTaskDialogOpened(false);
      fetchTasks();
    })
    .then(() => {
      
      toast.success("Task added successfully")
    })
//     .then(() => {
//         window.location.reload()
//     })
    
    .catch((error) => {
      
      toast.error(`error ${error}`)
    })
    .finally(() => {
      setLoading(false);
    })
  }

  return (
    <Dialog open={isTaskDialogOpened} onOpenChange={() => setIsTaskDialogOpened(!isTaskDialogOpened)}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1 text-white">
          <FaPlus />
          <span>New Task</span>
        </Button>
      </DialogTrigger>
      {/* Form Provider */}
      
        <DialogContent className="p-7 poppins dark:bg-neutral-800">

        {/*
        <IoMdClose onClick={() => {
          setFormData({
            name: "", priority: "", status: "", userId: "",
          })
          setIsTaskDialogOpened(false);
        }}
          className="absolute right-3 top-[11.8px] text-2xl text-gray-600 active:scale-95 z-50 cursor-pointer hidden"/>
        */}
          
          <DialogHeader>
            <DialogTitle className="text-xl">
              {/* {taskSelected ? "Edit Task" : "Add Task"} */}
            </DialogTitle>
            <DialogDescription>
              {`Add a new task here. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>

          {/* start of form  */}
          <form onSubmit={handleSubmit}>
            <TaskForm isTaskDialogOpened={isTaskDialogOpened} formData={formData} setFormData={setFormData} />
            <DialogFooter className="mt-11">
              <Button type="submit" className="flex items-center gap-1 text-white">
                {loading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <div className="flex items-center gap-1">
                    <span>Save task</span>
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      
    </Dialog>
  )
}

export default TaskDialog
