"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { TaskList } from "../data/Tasks";
import { useRouter } from "next/navigation";

const TaskListAddDialog = ({
  tasksList,
  email,
  fetchTasksList,
}: {
  tasksList: TaskList[];
  email: string | null | undefined;
  fetchTasksList: () => void;
}) => {
  const router = useRouter();

  console.log(tasksList);

  const [isAddTaskListDialogOpen, setIsAddTaskListDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    userEmail: email || "",
  });

  useEffect(() => {
    setFormData({
      name: "",
      userEmail: email || "",
    });
  }, [isAddTaskListDialogOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post("/api/tasks-list", formData)
      .then(() => {
        setIsAddTaskListDialogOpen(false);
        fetchTasksList();
      })
      .then(() => {
        toast.success("Task Added successfully");
      })
//       .then(() => {
//         window.location.reload()
//     })
      .catch((error) => {
        toast.error(`${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAddTaskListDialogOpen && tasksList.length === 0) {
      router.push("/to-dos");
    }
  }, [isAddTaskListDialogOpen, tasksList.length]);

  console.log(formData);

  return (
    <Dialog
      open={isAddTaskListDialogOpen}
      onOpenChange={() => setIsAddTaskListDialogOpen(!isAddTaskListDialogOpen)}
    >
      <DialogTrigger>
        <span>
          <Plus
            size={20}
            className="hover:text-gray-700 dark:hover:text-gray-300 active:scale-95"
          />
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tasks List</DialogTitle>
          <DialogDescription>
            Add a new task here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label>List Name</Label>
            <Input
              id="name"
              type="name"
              placeholder="Enter the name of the task list"
              defaultValue={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.id]: e.target.value,
                })
              }
            />
          </div>

          <DialogFooter className="mt-11">
            <Button type="submit" className="flex items-center gap-1">
              {loading ? <Loader2 className='animate-spin' /> : <span>Save task</span>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskListAddDialog;
