import axios from 'axios';
import React from 'react'

const SingleTask = ({ singleTask, id, 
  // fetchTasks
 }: { 
  singleTask: Task,
  id: string,
  // fetchTasks: () => void
 }) => {


    const lowerOpacity = singleTask.status === "completed" && "opacity-65"
    
      const [loading, setLoading] = useState(false);
      const handleCheckboxChange = () => {
    
        setLoading(true);
    
        axios.put("/api/tasks/update-status", {
            id: singleTask?.id,
            status: singleTask.status === "completed" ? "in progress" : "completed",
        })
        .then(() => {
            setLoading(false);
            // fetchTasks();
        })
        .catch((error) => {
            console.log(error);
        })
    
      }


  return (
    <div
      className={`flex items-center px-0 my-3 rounded-md w-full justify-between mb-0 ${lowerOpacity}`}
    >
      <div className="flex items-center gap-4">

        <CheckBoxComponent singleTask={singleTask} fetchTasks={fetchTasks} handleCheckboxChange={handleCheckboxChange}
        loading={loading} />

        <div className="flex flex-row gap-[6px] items-center justify-center">
        <label
           /* onClick={() => {
              //setTaskSelected(singleTask);
              //setIsTaskDialogOpened(true);
            }} */
            htmlFor="task"
            className="md:text-md xl:text-lg font-semibold cursor-pointer hover:text-primary
            text-md"
            onClick={handleCheckboxChange}
          >
            {singleTask.name}
          </label>

          <Badge variant="outline" className="text-[10px] opacity-55 md:block hidden">
            {singleTask.status}
          </Badge>

        </div>
      </div>
      <div className="flex md:gap-3 items-center ">
      <ComboboxDemo singleTask={singleTask} fetchTasks={fetchTasks} className="md:block hidden" />
      <TasksOptions singleTask={singleTask} id={id} fetchTasks={fetchTasks} />
      </div>
    </div>
  )
}

export default SingleTask