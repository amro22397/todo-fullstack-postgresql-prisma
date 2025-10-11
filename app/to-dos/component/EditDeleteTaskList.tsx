'use client'

import { Edit2, Loader2, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
// import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { TaskList } from '@/app/data/Tasks'
import axios from 'axios'
import { toast } from "sonner"

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
import { usePathname } from 'next/navigation'

  

const EditDeleteTaskList = ({ tasklist, tasksList, email, 
  // fetchTasksList
 }: {
  tasklist: TaskList, tasksList: TaskList[],
  email: string | null | undefined,
  // fetchTasksList: () => void,
}) => {

    // const router = useRouter();

    const pathname = usePathname();

    const taskListIconSize = 17;
  const taskListButtonClassName = "cursor-pointer active:scale-95"

  const [openEditDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);


  const [formData, setFormData] = useState({
        name: tasklist.name || "",
        userEmail: email || "",
      });
  
  
      useEffect(() => {
        setFormData({
            name: tasklist.name || "",
            userEmail: email || "",
        })
      }, [openEditDialog]);


  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    axios.put("/api/tasks-list", { id: tasklist.id, ...formData})
    .then(() => {
        setEditDialog(false);
        toast.success("Task List updated successfully")

    })
    .then(() => {
        window.location.reload()
    })
    // .then(() => {
    //   fetchTasksList();
    // })
    .catch((error) => {
        
        toast.error(`${error}`)
    })
    .finally(() => {
        setLoading(false)
    })
    
  }


  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    setDeleteLoading(true);

    axios.delete(`/api/tasks-list/${tasklist.id}`)
    .then(() => {
      setDeleteDialog(false);
        if (pathname.includes(tasklist.id)) {
          const id = tasksList[0].id;
        }
    })
    .then(() => {

      toast.success(`Task List deleted successfully`)
  })
  .then(() => {
        window.location.reload()
    })
  // .then(() => {
  //   fetchTasksList();
  // })
    .catch((error) => {
        
        toast.error(`${error}`)
    })
    .finally(() => {
      setDeleteLoading(false)
    })
  }

  /* useEffect(() => {
        if (tasksList.length === 0) {
          router.push('/to-dos');
        }
      }, [deleteDialog]); */

  console.log(formData)
  return (
    <div className="flex flex-row items-center">
                  <Edit2 size={taskListIconSize} onClick={() => setEditDialog(true)}
                  className={`text-green-700 hover:text-green-800
                  dark:text-green-200 dark:hover:text-green-300 gap
                  ${taskListButtonClassName}`} />
                  <Trash size={taskListIconSize} onClick={() => setDeleteDialog(true)}
                  className={`text-red-600 hover:text-red-700
                  dark:text-red-300 dark:hover:text-red-400 gap
                  ${taskListButtonClassName}`} />




                  <Dialog open={openEditDialog} onOpenChange={() => setEditDialog(!openEditDialog)}  >
  <DialogTrigger></DialogTrigger>


  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Task List</DialogTitle>
      <DialogDescription>
      Edit this task list. Click save when you&apos;re done.
      </DialogDescription>
    </DialogHeader>

    <form className="flex flex-col gap-6 mt-8"
    onSubmit={handleEdit}>

      <div className='flex flex-col gap-2'
      >
      <Label>List Name</Label>
      <Input id="name" type="name" placeholder='Enter the name of the task list'
      defaultValue={formData.name} onChange={(e) => setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })} />
      </div>

      <DialogFooter className="mt-11">
              <Button type="submit" className="flex items-center gap-1">
                {loading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <span>Save task</span>
                )}
              </Button>
            </DialogFooter>
    </form>


  </DialogContent>
</Dialog>




<AlertDialog open={deleteDialog} onOpenChange={() => setDeleteDialog(!deleteDialog)}>
  <AlertDialogTrigger></AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this task list?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone, This will permanently delete your task list..
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setDeleteDialog(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>
        {deleteLoading ? (
          <Loader2 className='animate-spin' />
        ) : 
        "Continue"
        }
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

                </div>
  )
}

export default EditDeleteTaskList
