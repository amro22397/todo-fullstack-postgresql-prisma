// import { useTasksStore } from "@/app/stores/useTasksStore";

import { Task } from "@/app/data/Tasks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { BiSolidError } from "react-icons/bi";
import { FaCircle } from "react-icons/fa6";

const TaskForm = ({
  isTaskDialogOpened,
  formData,
  setFormData,
  singleTask,
}: {
  isTaskDialogOpened: boolean;
  formData: any;
  setFormData: any;
  singleTask?: Task;
}) => {
  const session = useSession();
  console.log(session);

  console.log(formData);

  return (
    <div className="flex flex-col gap-6 mt-8">
      <TaskName
        name={singleTask?.name || localStorage.getItem("name")|| formData.name}
        setName={(e: any) => {
          setFormData({
            ...formData,
            name: e.target.value,
          })

          if (!singleTask) {
            localStorage.setItem("name", e.target.value)
          }  
        }
        }
      />
      <div className="grid grid-cols-2 gap-6">
        <TaskPriority
          isTaskDialogOpened={isTaskDialogOpened}
          selected={singleTask?.priority || formData.priority}
          setSelected={(e: any) =>
            setFormData({
              ...formData,
              priority: e,
            })
          }
        />
        <TaskStatus
          isTaskDialogOpened={isTaskDialogOpened}
          selectedStatus={singleTask?.status || formData.status}
          setSelectedStatus={(e: any) =>
            setFormData({
              ...formData,
              status: e,
            })
          }
        />
      </div>
    </div>
  );
};

function TaskName({ name, setName }: { name: string; setName: any }) {
  return (
    <div>
      <Label htmlFor="taskName">Task Name</Label>
      <Input
        id="taskName"
        type="text"
        placeholder="Enter a name of the task"
        className="mt-1"
        defaultValue={name}
        onChange={setName}
      />

      {/* {errors["taskName"] && <ShowError label="taskName" errors={errors} />} */}
    </div>
  );
}

function TaskPriority({
  isTaskDialogOpened,
  selected,
  setSelected,
}: {
  isTaskDialogOpened: boolean;
  selected: string;
  setSelected: any;
}) {
  /* const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext(); */

  // const { isTaskDialogOpened, taskSelected } = useTasksStore();

  //  const selectedPriority = watch("priority") || "low";

  // useEffect(() => {
  //   if (isTaskDialogOpened /* && !taskSelected */) {
  //     // setValue("priority", "low");
  //     // trigger("priority"); // Validate the form if necessary
  //   }
  // }, [isTaskDialogOpened, /*trigger*/]);

  // Handle onValueChange and trigger validation
  const handlePriorityChange = (value: string) => {
    //setValue("priority", value); // Update the value
    //trigger("priority"); // Trigger validation for "priority"
  };

  return (
    <div>
      <Label className="mb-1">Priority</Label>

      <Select defaultValue={selected} onValueChange={setSelected}>
        <SelectTrigger className="w-full mt-1">
          <SelectValue placeholder="Select a priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="low" className="">
              <div className="flex items-center gap-1 ">
                <FaCircle className="text-[12px] text-green-600" />
                <span>Low</span>
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center gap-1 ">
                <FaCircle className="text-[12px] text-yellow-600" />
                <span>Medium</span>
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-1 ">
                <FaCircle className="text-[12px] text-red-600" />
                <span>High</span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* {errors["priority"] && <ShowError label="priority" errors={errors} />} */}
    </div>
  );
}

function TaskStatus({
  isTaskDialogOpened,
  selectedStatus,
  setSelectedStatus,
}: {
  isTaskDialogOpened: boolean;
  selectedStatus: string;
  setSelectedStatus: any;
}) {
  /* const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext(); */

  // const { isTaskDialogOpened, taskSelected } = useTasksStore();

  // const selectedStatus = watch("status") || "in progress";
  // console.log(selectedStatus);
  // Set "in progress" status when the task dialog is opened

  // useEffect(() => {
  //   if (isTaskDialogOpened /* && !taskSelected */) {
  //     // setValue("status", "in progress");
  //     // trigger("status"); // Validate the form if necessary
  //   }
  // }, [isTaskDialogOpened, /* trigger */]); // Dependencies ensure it runs when the dialog opens

  function handleStatusChange(value: string) {
    console.log(value);
    // setValue("status", value);
    // trigger("status"); // Validate status field on change
  }

  return (
    <div>
      <Label className="mb-1">Select Status</Label>
      <Select defaultValue={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="w-full mt-1">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* {errors["status"] && <ShowError label="status" errors={errors} />} */}
    </div>
  );
}

/* function ShowError({
  label,
  errors,
}: {
  errors: FieldErrors<FieldValues>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1 text-red-500 mt-2">
      <BiSolidError className="text-sm" />
      <p className="text-red-500 text-sm">
        <>{errors[label]?.message}</>
      </p>
    </div>
  );
} */

export default TaskForm;
