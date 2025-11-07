// import { useTasksStore } from "@/app/stores/useTasksStore";
// import { useUserStore } from "@/app/stores/useUserStore";
"use client"

import { Task } from "@/app/data/Tasks";
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

import { toast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useState } from "react";

const ClearAllDialog = ({ /* tasks */
  fetchTasks,
  id,
  email
 }: {
   tasks: Task[],
   fetchTasks: () => void,
   id: string,
   email: string
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    // const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    

    const deleteFunction = async (e: React.MouseEvent) => {

      e.preventDefault();

      setIsLoading(true)
      axios.delete(`/api/tasks?taskListId=${id}&email=${email}`)
      .then(() => {
        setOpenDeleteDialog(false)
      })
      .then(() => {
        toast({
          title: "All tasks deleted successfully"
        })
        // window.location.reload();
      })
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        toast({
          title: `${error}`
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
      
    }

  return (
    <AlertDialog open={openDeleteDialog} /* onOpenChange={() => setOpenDeleteDialog(true)} */>
  <AlertDialogTrigger onClick={() => setOpenDeleteDialog(true)} 
  className="cursor-pointer">Clear All</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete all tasks?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your all tasks..
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={deleteFunction}
      className="text-white">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default ClearAllDialog
