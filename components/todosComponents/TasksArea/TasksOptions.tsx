"use client";
import { Task } from "@/app/data/Tasks";
// import { useTasksStore } from "@/app/stores/useTasksStore";
// import { useUserStore } from "@/app/stores/useUserStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import ComboboxDemo from "./PriorityCombobox";

// import { toast } from "@/hooks/use-toast";
import { toast } from "sonner"
// import { nanoid } from "nanoid";
import { useState } from "react";
import { SlOptions } from "react-icons/sl";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import TaskForm from "../Dialogs/TaskDialog/TaskForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

// import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { Loader2 } from "lucide-react";

const TasksOptions = ({
  singleTask,
  // id,
  fetchTasks,
}: {
  singleTask: Task;
  // id: string;
  fetchTasks: () => void;
}) => {

  {/*
    const {
    setIsTaskDialogOpened,
    setTaskSelected,
    taskSelected,
    addNewTask,
    setOpenDeleteDialog,
  } = useTasksStore();
    */}

  // const { user } = useUserStore();

  // const [actionClicked, setActionClicked] = useState("");
  const [isTaskDialogOpened, setIsTaskDialogOpened] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [copyLoading, setCopyLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: singleTask?.name || "", priority: singleTask?.priority || "", status: singleTask?.status || "", userId: singleTask?.userId || ""
  });


  // const handleItemClick = (action: string) => {

  // }

  const handleEdit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    axios.put("/api/tasks", { id: singleTask?.id, ...formData })
    .then(() => {
      
      toast.success("Task updated successfully")
    })
    .then(() => {
      setIsTaskDialogOpened(false);
      fetchTasks();
    })
//     .then(() => {
//         window.location.reload()
//     })
    .catch((error) => {

      toast.error(`${error}`)
    })
    .finally(() => {
      setLoading(false)
    })

  }


  const handleCopy = async (e: any) => {
    e.preventDefault();

    // setCopyLoading(true);

    try {
      
      await navigator.clipboard.writeText(singleTask.name);

      // toast({
      //   className: "text-white bg-yellow-500 border-none",
      //   title: "Copied to clipboard"
      // })
      toast.success("Copied to clipboard")

      setIsDropdownOpen(false);

    } catch (error) {
      
      toast.error(`${error}`)
    }

  }

  
  const handleDelete = async (e: any) => {
    e.preventDefault();

    setLoading(true)

    axios.delete(`/api/tasks/${singleTask?.id}`)
    .then(() => {
      setIsDropdownOpen(false);
      setIsAlertDialogOpen(false)
      fetchTasks();
    })
    .then(() => {
     
      toast.success("Task deleted successfully")
    })
//     .then(() => {
//         window.location.reload()
//     })
    .catch((error) => {
      
      toast.error(`${error}`)
    })
    .finally(() => {
      setLoading(false)
    })
  }
  return (
    <>
    <DropdownMenu open={isDropdownOpen} onOpenChange={() => setIsDropdownOpen(!isDropdownOpen)}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <SlOptions />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuGroup>

        <DropdownMenuItem className="md:hidden block">
              <div className="">
                <Badge
                  variant="outline"
                  className="text-[16px] opacity-55 px-0 py-[1px]"
                >
                  {singleTask.status}
                </Badge>
              </div>
            </DropdownMenuItem>

            
            <DropdownMenuItem className="block md:hidden">
              <div className="">
                <ComboboxDemo
                  singleTask={singleTask}
                  fetchTasks={fetchTasks}
                  className="text-center"
                />
              </div>
            </DropdownMenuItem>


          <DropdownMenuItem onClick={() => setIsTaskDialogOpened(true)}>
            Edit
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>
            Copy
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setIsAlertDialogOpen(true)}
          >
            Delete
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>


    <Dialog open={isTaskDialogOpened} onOpenChange={() => setIsTaskDialogOpened(!isTaskDialogOpened)}>
      <DialogTrigger asChild>
      </DialogTrigger>
      {/* Form Provider */}
      
        <DialogContent className="p-7 poppins">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {/* {taskSelected ? "Edit Task" : "Add Task"} */}
            </DialogTitle>
            <DialogDescription>
              {`Edit this task here. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>

          {/* start of form  */}
          <form onSubmit={handleEdit}>
            <TaskForm isTaskDialogOpened={isTaskDialogOpened} formData={formData} setFormData={setFormData}
            singleTask={singleTask} />
            <DialogFooter className="mt-11">
              <Button type="submit" className="flex items-center gap-1">
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



    <AlertDialog open={isAlertDialogOpen} /* onOpenChange={} */ >
  <AlertDialogTrigger></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this task?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete your task..
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>
        {loading ? (
          <Loader2 className='animate-spin' />
        ) : (
          <div className="">Delete</div>
        )}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </>
  )
}


export default TasksOptions
