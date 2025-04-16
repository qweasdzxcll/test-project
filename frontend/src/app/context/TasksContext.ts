import { createContext } from "react";
import { ITask } from "../../entities/Task";

interface ITasksContext {
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  }
  
  export const TasksContext = createContext<ITasksContext>({
    tasks: [],
    setTasks: () => {},
  });