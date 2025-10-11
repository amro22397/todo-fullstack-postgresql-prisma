export type Task = {
    // _id: string;
    id: string;
    name: string | null;
    priority: string | null;
    status: string | null;
    userId: string;
    taskListId: string;
    createdAt: Date;
    updatedAt: Date;
  };

  export type TaskList = {
    // _id: string;
    id: string;
    name: string | null;
    userId: string | null;
    userEmail: string | null;
    createdAt: Date;
    updatedAt: Date;

  }

  export const allTasks: Task[] = [
    //
  ];
  